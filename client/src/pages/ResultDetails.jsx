import { deleteResult, editResult } from "@/api/results";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import remarkGfm from "remark-gfm";
import ReactMarkdown from 'react-markdown';

import {
    Card,
    CardAction,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Pen, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";

function ResultDetails() {
    const [resultDetails, setResultDetails] = useState();
    const [resultTitle, setResultTitle] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const isMobile = useIsMobile()
    const { result_id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchResult(id) {
            const response = await fetch(`http://localhost:8000/api/results/${id}`);

            const json = await response.json();

            if (!response.ok) {
                toast.error(json.error || "Failed to fetch results", { position: "top-center" });
                return false;
            }

            console.log(json.results)
            setResultDetails(json.results);
            setResultTitle(json.results?.title);
        }
        fetchResult(result_id);
    }, [])

    async function handleEdit(result_id, event) {
        const title = event.target.value;
        await editResult(result_id, title)
        // setResultDetails(response);
        setIsEdit(false);
    }

    async function handleDelete(result_id) {
        deleteResult(result_id);
        // setResults(prev => prev.filter(r => r._id != result_id));
        navigate('/results')
    }

    return (
        <div>
            <Link to='/results' className="flex gap-2 mb-2">
                <ArrowLeft />
                <p className="overflow-hidden">Back to Results</p>
            </Link>
            <Card className="@container/card  bg-input group">
                <CardHeader className='flex items-center justify-between'>
                    <CardTitle>
                        {isEdit && <Input
                            autoFocus
                            className='w-[26rem]'
                            value={resultTitle}
                            onChange={(e) => setResultTitle(e.target.value)}
                            onBlur={(e) => handleEdit(resultDetails._id, e)} />}
                        {!isEdit && <h1 className="text-primary">{resultTitle}</h1>}
                    </CardTitle>
                    <CardAction>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="p-1 opacity-0 group-hover:opacity-100 rounded-sm hover:bg-accent data-[state=open]:opacity-100 ">
                                    <Ellipsis />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-24 rounded-lg"
                                align={isMobile ? "end" : "start"}>
                                <DropdownMenuItem onClick={() => setIsEdit(true)}>
                                    <Pen />
                                    <span>Edit Title</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive" onClick={() => handleDelete(resultDetails._id)}>
                                    <Trash2 />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardAction>
                </CardHeader>
                <div className="p-4 overflow-hidden">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{resultDetails?.report}</ReactMarkdown>
                </div>
            </Card>
        </div>
    );
}

export default ResultDetails;