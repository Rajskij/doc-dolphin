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

function ResultDetails() {
    const [resultDetails, setResultDetails] = useState();
    const [resultTitle, setResultTitle] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const { user } = useAuthContext();
    const { result_id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchResult(id) {
            const response = await fetch(`http://localhost:8000/api/results/${id}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });

            const json = await response.json();

            if (!response.ok) {
                toast.error(json.error || "Failed to fetch results");
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
                <CardTitle>
                    {isEdit && <Input
                        autoFocus
                        className='w-[26rem]'
                        value={resultTitle}
                        onChange={(e) => setResultTitle(e.target.value)}
                        onBlur={(e) => handleEdit(resultDetails._id, e)} />}
                    {!isEdit && <h1 className="text-primary">{resultTitle}</h1>}
                </CardTitle>
                <ResultSummary {...props} />
            </CardHeader>
            <div className="p-4 overflow-hidden">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{resultDetails?.report}</ReactMarkdown>
            </div>
        </Card>
    );
}

export default ResultDetails;