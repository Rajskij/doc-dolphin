import { deleteResult, editResult } from "@/api/results";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "@/lib/toast";
import remarkGfm from "remark-gfm";
import ReactMarkdown from 'react-markdown';

import ResultSummary from "@/components/results-details/ResultSummary";
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/hooks/useAuthContext";

const BASE_URL = import.meta.env.VITE_API_URL;

function ResultDetails() {
    const [resultDetails, setResultDetails] = useState();
    const [resultTitle, setResultTitle] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const { user } = useAuthContext();
    const { result_id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchResult(id) {
            const response = await fetch(`${BASE_URL}/api/results/${id}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });

            const json = await response.json();

            if (!response.ok) {
                toast.error(json.error || "Failed to fetch results");
                return false;
            }

            setResultDetails(json.results);
            setResultTitle(json.results?.title);
        }
        fetchResult(result_id);
    }, [])

    async function handleEdit(result_id, event) {
        const title = event.target.value;
        await editResult(user.token, result_id, title)
        setIsEdit(false);
    }

    async function handleDelete(result_id) {
        deleteResult(user.token, result_id);
        navigate('/results')
    }

    const props = { isEdit, resultTitle, resultDetails, setResultTitle, handleEdit, setIsEdit, handleDelete };

    return (
        <Card className="@container/card group">
            <CardHeader className='flex items-center justify-between'>
                <CardTitle className='flex flex-1'>
                    {isEdit && <Input
                        autoFocus
                        value={resultTitle}
                        onChange={(e) => setResultTitle(e.target.value)}
                        onBlur={(e) => handleEdit(resultDetails._id, e)} />}
                    {!isEdit && <h1 className="text-primary">{resultTitle}</h1>}
                </CardTitle>
                <ResultSummary {...props} />
            </CardHeader>
            <div className="relative">
                <div className="overflow-x-auto no-scrollbar">
                    <div className="p-4 min-w-[800px]">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{resultDetails?.report}</ReactMarkdown>
                    </div>
                </div>
                {/* gradient overlays */}
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent pointer-events-none" />
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-card to-transparent pointer-events-none" />
            </div>
        </Card>
    );
}

export default ResultDetails;