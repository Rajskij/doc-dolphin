import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Pen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Card,
    CardAction,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import DropdownSelector from "@/components/results-details/DropdownSelector";
import Pagination from "@/components/results-details/Pagination";
import remarkGfm from "remark-gfm";
import ReactMarkdown from 'react-markdown';

function Results() {
    const [resultDetails, setResultDetails] = useState();
    const [results, setResults] = useState();
    const [totalPages, setTotalPages] = useState(null);
    const [page, setPage] = useState(5);
    const [rows, setRows] = useState(5);
    const { user } = useAuthContext();

    useEffect(() => {
        async function getResults() {
            const response = await fetch(`http://localhost:8000/api/results/${user.id}?page=${page}&limit=${rows}`);
            const json = await response.json();

            console.log(json);
            setResultDetails(json.results[0]?.report);
            setResults(json.results);
            setTotalPages(json.totalPages);
        }
        getResults()
    }, [page, rows]);

    async function handleDelete(result_id) {
        const response = await fetch(`http://localhost:8000/api/results/${result_id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            return;
        }
        setResults(prev => prev.filter(r => r._id != result_id));
    }

    return (
        <div className="flex w-full gap-4 h-[calc(100vh-12rem)]">
            <div className="flex-1 overflow-y-auto no-scrollbar">
                {results && results.map(result => (
                    <Card key={result._id} className="@container/card min-h-50 mb-4">
                        <CardHeader className='flex items-center justify-between'>
                            <CardTitle className='cursor-pointer' onClick={() => setResultDetails(result.report)}>
                                <h1 className="text-primary">Test Summery Report</h1>
                            </CardTitle>
                            <CardAction>
                                <Button onClick={() => handleDelete(result._id)} variant='secondary'>
                                    <Trash2 />
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <p className="truncate px-6">{result.report}</p>
                    </Card>
                ))}
                <div className="flex justify-between">
                    <DropdownSelector rows={rows} setRows={setRows} />
                    <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
                <Card className="@container/card  bg-input">
                    <CardHeader className='flex items-center justify-between'>
                        <CardTitle>
                            <h1 className="text-primary">Test Summery Report</h1>
                        </CardTitle>
                        <CardAction>
                            <Button onClick={() => handleDelete(result._id)} variant='secondary'>
                                <Pen />
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <div className="p-4">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{resultDetails}</ReactMarkdown>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Results;
