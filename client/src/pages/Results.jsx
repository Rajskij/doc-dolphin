import { useAuthContext } from "@/hooks/useAuthContext";
import { Ellipsis, Pen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import DropdownSelector from "@/components/results-details/DropdownSelector";
import Pagination from "@/components/results-details/Pagination";
import remarkGfm from "remark-gfm";
import ReactMarkdown from 'react-markdown';
import { toast } from "sonner";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";

function Results() {
    const [resultDetails, setResultDetails] = useState();
    const [results, setResults] = useState(null);
    const [resultTitle, setResultTitle] = useState();
    const [totalPages, setTotalPages] = useState(null);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(5);
    const [error, setError] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const { user } = useAuthContext();
    const isMobile = useIsMobile()

    async function getResults() {
        try {
            const response = await fetch(`http://localhost:8000/api/results/${user.id}?page=${page}&limit=${rows}`);
            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
                return;
            }
            console.log(json.results)

            setResultDetails(json.results[0]);
            setResults(json.results);
            setTotalPages(json.totalPages);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        getResults()
    }, [page, rows]);

    async function handleEdit(event) {
        const title = event.target.value;
        console.log(title)
        setIsEdit(false);
    }

    async function handleDelete(result_id) {
        try {
            const response = await fetch(`http://localhost:8000/api/results/${result_id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                const json = response.json();
                setError(json.error);
                toast.error(json.error || "Failed to fetch results", { position: "top-center" });
                return;
            }
            toast.success("Result removed successfully", { position: "top-center" });
            setResults(prev => prev.filter(r => r._id != result_id));
            getResults();
        } catch (err) {
            setError(err.message);
            console.error(err.message)
            toast.error(err.message || "An error occurred", { position: "top-center" });
        }
    }

    return (
        <div className="flex w-full gap-4 h-[calc(100vh-11rem)]">
            {error && <h1 className="w-full m-auto text-center text-red-400 text-2xl">{error}</h1>}
            <div className="flex flex-1 flex-col justify-between overflow-y-auto no-scrollbar">
                <div>
                    {results && results.map(result => (
                        <Card key={result._id} className="@container/card min-h-50 mb-4 ">
                            <CardHeader className='flex items-center justify-between'>
                                <CardTitle className='cursor-pointer' onClick={() => {
                                    setResultDetails(result)
                                    setResultTitle(result.title)
                                 }}>
                                    <h1 className="text-primary">{result.title || 'Test Summery Report'}</h1>
                                </CardTitle>
                            </CardHeader>
                            <CardDescription className='ml-6'>{new Date(result.createdAt).toDateString()}</CardDescription>
                            <p className="truncate px-6">{result.report}</p>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-between">
                    <DropdownSelector rows={rows} setRows={setRows} />
                    {totalPages > 1 && <Pagination page={page} setPage={setPage} totalPages={totalPages} />}
                </div>
            </div>
            {results && !isMobile && <div className="flex-1 overflow-y-auto no-scrollbar">
                <Card className="@container/card  bg-input">
                    <CardHeader className='flex items-center justify-between group'>
                        <CardTitle>
                            {isEdit && <Input 
                                className='w-[26rem]'
                                value={resultTitle} 
                                onChange={(e) => setResultTitle(e.target.value)} 
                                onBlur={(e) => handleEdit(e)}/>}
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
                                    <DropdownMenuItem variant="destructive" onClick={() => handleDelete(resultDetails)}>
                                        <Trash2 />
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardAction>
                    </CardHeader>
                    <div className="p-4">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{resultDetails.report}</ReactMarkdown>
                    </div>
                </Card>
            </div>}
        </div>
    );
}

export default Results;
