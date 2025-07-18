import { useRef, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { fetchLabResults, createResult } from "@/api/client";

import { FileUpload } from "@/components/lab-results-analyzer/FileUpload";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    Card,
    CardAction,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const INFO = 'Upload your medical tests to see insights'

function About() {
    const [output, setOutput] = useState(INFO);
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    const abortRef = useRef();

    async function handleSubmit(files) {
        setIsStreaming(false);
        setError(null);
        setOutput('');

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        abortRef.current = new AbortController();

        fetchLabResults(formData, setIsStreaming, setError, setOutput, abortRef);
    }

    function handleAbort() {
        if (abortRef.current) {
            // set error message
            abortRef.current.error = 'Processing was stopped by the User';
            // abort request
            abortRef.current.abort();
        }
    }

    function handleSave() {
        createResult(user.id, setIsLoading, setError, output);
    }

    return (
        <>
            <Card className="@container/card px-4 mb-4">
                <CardTitle>
                    <h1 className="text-primary">Upload your test result</h1>
                </CardTitle>
                <FileUpload handleSubmit={handleSubmit} />
            </Card>
            <Card className="@container/card min-h-100">
                <CardHeader className='flex items-center justify-between'>
                    <CardTitle>
                        <h1 className="text-primary">Test Summery Report</h1>
                    </CardTitle>
                    <CardAction>
                        <Button variant='secondary'
                            className='mr-4'
                            onClick={handleAbort}
                            disabled={!isStreaming}
                        >
                            Stop
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={output === INFO || output === '' || isStreaming}
                        >
                            Save
                        </Button>
                    </CardAction>
                </CardHeader>
                <Separator />

                <CardAction className='px-6'>
                    {output === '' && <h4>Loading...</h4>}
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{output}</ReactMarkdown>
                    {error && <><br /><h2 className="text-red-400">{error}</h2></>}
                </CardAction>
            </Card>
        </>
    );
}

export default About;

