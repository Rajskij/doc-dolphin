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
import { deleteResult, editResult } from "@/api/results";
import { Link, useNavigate } from "react-router-dom";

function Results() {
    const [resultDetails, setResultDetails] = useState();
    const [results, setResults] = useState(null);
    const [resultTitle, setResultTitle] = useState();
    const [totalPages, setTotalPages] = useState(null);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(5);
    const [isEdit, setIsEdit] = useState(false);
    const { user } = useAuthContext();
    const isMobile = useIsMobile()
    const navigate = useNavigate();

    async function getResults() {
        try {
            const response = await fetch(`http://localhost:8000/api/results/user/${user.id}?page=${page}&limit=${rows}`);
            const json = await response.json();

            if (!response.ok) {
                toast.error(json.error || "Failed to fetch results", { position: "top-center" });
                return;
            }
            console.log(json.results)

            setResultDetails(json?.results[0]);
            setResultTitle(json?.results[0]?.title);
            setResults(json?.results);
            setTotalPages(json?.totalPages);
        } catch (err) {
            toast.error(err.message || "An error occurred", { position: "top-center" });
        }
    }

    useEffect(() => {
        getResults()
    }, [page, rows]);

    async function handleEdit(result_id, event) {
        const title = event.target.value;
        await editResult(result_id, title)
        // setResultDetails(response);
        setIsEdit(false);
        getResults();
    }

    async function handleDelete(result_id) {
        deleteResult(result_id);
        // setResults(prev => prev.filter(r => r._id != result_id));
        getResults();
    }

    return (
        <div className="flex w-full gap-4 h-[calc(100vh-11rem)]">
            {/* {error && <h1 className="w-full m-auto text-center text-red-400 text-2xl">{error}</h1>} */}
            <div className="flex flex-1 flex-col justify-between overflow-y-auto no-scrollbar">
                <div>
                    {results && results.map(result => (
                        <Card key={result._id} className="@container/card min-h-50 mb-4 ">
                            <CardHeader className='flex items-center justify-between'>
                                <CardTitle className='cursor-pointer' onClick={() => {
                                    if (isMobile) {
                                        navigate(`/result/${result._id}`);
                                        return;
                                    }
                                    setResultDetails(result);
                                    setResultTitle(result.title);
                                    setIsEdit(false);
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
                <Card className="@container/card  bg-input group">
                    <CardHeader className='flex items-center justify-between'>
                        <CardTitle>
                            {isEdit && <Input
                                autoFocus
                                className='w-[26rem]'
                                value={resultTitle}
                                onChange={(e) => setResultTitle(e.target.value)}
                                onBlur={(e) => handleEdit(resultDetails._id, e)} />}
                            {!isEdit && <Link to={`/result/${resultDetails._id}`}><h1 className="text-primary">{resultTitle}</h1></Link>}
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
                    <div className="p-4">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{resultDetails.report}</ReactMarkdown>
                    </div>
                </Card>
            </div>}
        </div>
    );
}

export default Results;
