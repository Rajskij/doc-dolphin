import { useAuthContext } from "@/hooks/useAuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import DropdownSelector from "@/components/results-details/DropdownSelector";
import Pagination from "@/components/results-details/Pagination";
import remarkGfm from "remark-gfm";
import ReactMarkdown from 'react-markdown';
import toast from "@/lib/toast";
import { Input } from "@/components/ui/input";
import { deleteResult, editResult } from "@/api/results";
import ResultSummary from "@/components/results-details/ResultSummary";

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
            const response = await fetch(`http://localhost:8000/api/results/user/${user.id}?page=${page}&limit=${rows}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const json = await response.json();

            if (!response.ok) {
                toast.error(json.error || "Failed to fetch results");
                return;
            }
            console.log(json.results)

            setResultDetails(json?.results[0]);
            setResultTitle(json?.results[0]?.title);
            setResults(json?.results);
            setTotalPages(json?.totalPages);
        } catch (err) {
            toast.error(err.message || "An error occurred");
        }
    }

    useEffect(() => {
        getResults()
    }, [page, rows]);

    async function handleEdit(result_id, event) {
        const title = event.target.value;
        await editResult(user.token, result_id, title)
        setIsEdit(false);
        getResults();
    }

    async function handleDelete(result_id) {
        deleteResult(user.token, result_id);
        getResults();
    }
    const props = { isEdit, resultTitle, resultDetails, setResultTitle, handleEdit, setIsEdit, handleDelete };

    return (
        <div className="flex w-full gap-4 h-[calc(100vh-11rem)]">
            <div className="flex flex-1 flex-col justify-between overflow-y-auto no-scrollbar">
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    {results && results.map(result => (
                        <Card key={result._id} className="@container/card min-h-50">
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
                                    <h1 className="text-bold">{result.title || 'Test Summery Report'}</h1>
                                </CardTitle>
                            </CardHeader>
                            <CardDescription className='ml-6'>{new Date(result.createdAt).toDateString()}</CardDescription>
                            <p className="truncate text-muted-foreground px-6">{result.report}</p>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-between my-4">
                    <DropdownSelector rows={rows} setRows={setRows} />
                    {totalPages > 1 && <Pagination page={page} setPage={setPage} totalPages={totalPages} />}
                </div>
            </div>
            {!resultDetails &&
                <h1 className="w-full m-auto text-center text-primary text-2xl">
                    No test results found. Submit your lab tests for analysis to generate insights.
                </h1>
            }
            {resultDetails && !isMobile && <div className="flex-1 overflow-y-auto no-scrollbar">
                <Card className="@container/card group">
                    <CardHeader className='flex items-center justify-between'>
                        <CardTitle>
                            {isEdit && <Input
                                autoFocus
                                className='w-[26rem]'
                                value={resultTitle}
                                onChange={(e) => setResultTitle(e.target.value)}
                                onBlur={(e) => handleEdit(resultDetails._id, e)} />}
                            {!isEdit && resultDetails && <Link to={`/result/${resultDetails._id}`}><h1 className="text-primary">{resultTitle}</h1></Link>}
                        </CardTitle>
                        <ResultSummary {...props} />
                    </CardHeader>
                    <div className="p-4 overflow-hidden">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{resultDetails.report}</ReactMarkdown>
                    </div>
                </Card>
            </div>}
        </div>
    );
}

export default Results;
