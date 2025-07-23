import { useRef, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { fetchLabResults, saveResult } from "@/api/analyzer";

import { FileUpload } from "@/components/results-analyzer/FileUpload";
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
import { Skeleton } from "@/components/ui/skeleton";

const INFO = 'Upload your medical tests to see insights'

function About() {
    const [output, setOutput] = useState(INFO);
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    const abortRef = useRef();

    async function handleSubmit(files) {
        setIsStreaming(false);
        setError(null);
        setOutput('');
        setIsSaved(false);
        setIsLoading(true);

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        abortRef.current = new AbortController();

        await fetchLabResults(user.token, formData, setIsLoading, setIsStreaming, setError, setOutput, abortRef);
    }

    function handleAbort() {
        if (abortRef.current) {
            // set error message
            abortRef.current.error = 'Processing was stopped by the User';
            // abort request
            abortRef.current.abort();
        }
    }

    async function handleSave() {
        const result = await saveResult(user, output);
        setIsSaved(result);
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-11rem)]">
            <Card className="@container/card px-4 mb-4">
                <CardTitle>
                    <h1 className="text-primary">Upload your test result</h1>
                </CardTitle>
                <FileUpload handleSubmit={handleSubmit} isLoading={isLoading} isStreaming={isStreaming} />
            </Card>
            <Card className="@container/card flex-1">
                <CardHeader className='flex items-center justify-between'>
                    <CardTitle>
                        <h1 className="text-primary">Test Summery Report</h1>
                    </CardTitle>
                    <CardAction>
                        <Button variant='secondary'
                            className='mr-4'
                            onClick={handleAbort}
                            disabled={!isLoading && !isStreaming}
                        >
                            Stop
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={output === '' || output === INFO || isLoading || isStreaming || isSaved}
                        >
                            Save
                        </Button>
                    </CardAction>
                </CardHeader>
                <Separator />

                {isLoading && <div className="flex flex-col mx-6 space-y-3">
                    <Skeleton className='h-4' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-[90%]' />
                </div>}
                <CardAction className='px-6'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{output}</ReactMarkdown>
                    {/* <p>{output}</p> */}
                    {/* {error && <><br /><h2 className="text-red-400">{error}</h2></>} */}
                </CardAction>
            </Card>
        </div>
    );
}

export default About;

