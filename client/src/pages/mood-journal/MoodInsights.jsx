import { useRef, useState } from "react"
import { format } from "date-fns"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthContext } from "@/hooks/useAuthContext"
import { fetchMoodInsights } from "@/api/analyzer"
import { Separator } from "@/components/ui/separator";

function MoodInsights() {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(new Date)
    const [output, setOutput] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const { user } = useAuthContext();
    const abortRef = useRef();

    const generateInsights = async () => {
        abortRef.current = new AbortController();
        await fetchMoodInsights(user.token, user.id, startDate, endDate, setIsLoading, setIsStreaming, setOutput, abortRef);
    }

    function handleAbort() {
        if (abortRef.current) {
            abortRef.current.error = 'Processing was stopped by the User';
            abortRef.current.abort();
        }
    }

    return (
        <div className="flex flex-col mx-auto space-y-4 min-h-[calc(100vh-11rem)]">
            {/* Filters Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Filter Your Mood Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">

                    {/* Date Pickers */}
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex flex-col space-y-1">
                            <label className="text-sm font-medium">Start Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-[200px] justify-start text-left">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {startDate ? format(startDate, "PPP") : "Pick a start date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className="text-sm font-medium">End Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-[200px] justify-start text-left">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {endDate ? format(endDate, "PPP") : "Pick an end date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>


                    <Button 
                        onClick={generateInsights} 
                        className='mt-4' 
                        disabled={!startDate || !endDate || isStreaming || isLoading}
                    >
                        Generate Insights
                    </Button>
                </CardContent>
            </Card>

            {/* AI Insights Output */}
            <Card className='flex-1'>
                <CardHeader className='flex items-center justify-between'>
                    <CardTitle>
                        <h1 className="text-primary">Insight Summary</h1>
                    </CardTitle>
                    <CardAction>
                        <Button variant='secondary'
                            className='mr-4'
                            onClick={handleAbort}
                            disabled={!isLoading && !isStreaming}
                        >
                            Stop
                        </Button>
                    </CardAction>
                </CardHeader>
                <Separator />
                <CardContent>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{output}</ReactMarkdown>
                </CardContent>
            </Card>
        </div>
    )
}

export default MoodInsights
