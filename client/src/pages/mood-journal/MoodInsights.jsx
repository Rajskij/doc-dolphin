import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function MoodInsights() {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [insights, setInsights] = useState(null)

    const generateInsights = async () => {
        setInsights(`Between ${format(startDate, "PPP")} and ${format(endDate, "PPP")} you mostly felt good. AI insight: Remember to stay hydrated and take breaks.`)
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


                    <Button onClick={generateInsights}>Generate Insights</Button>
                </CardContent>
            </Card>

            {/* AI Insights Output */}
            <Card className='flex-1'>
                <CardHeader>
                    <CardTitle>Insight Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea value={insights} readOnly className="min-h-[150px]" />
                </CardContent>
            </Card>
        </div>
    )
}

export default MoodInsights
