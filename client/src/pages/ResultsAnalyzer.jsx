import { useRef, useState } from "react";
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
import { fetchLabResults } from "@/api/client";

function About() {
    const [output, setOutput] = useState('Upload your medical tests to see insights');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const abortRef = useRef();

    async function handleSubmit(files) {
        setIsLoading(true);
        setError(null);
        setOutput('');

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        abortRef.current = new AbortController();

        fetchLabResults(formData, setIsLoading, setError, setOutput, abortRef);
    }

    function handleAbort() {
        if (abortRef.current) {
            // set error message
            abortRef.current.error = 'Process stopped by user';
            // abort request
            abortRef.current.abort();
        }
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
                        <Button variant='secondary' className='mr-4' onClick={handleAbort}>
                            Stop
                        </Button>
                        <Button>Save</Button>
                    </CardAction>
                </CardHeader>
                <Separator />

                <CardAction className='px-6'>
                    {isLoading && <h4>Loading...</h4>}
                    {error && <h2 className="text-red-400">{error}</h2>}
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{output}</ReactMarkdown>
                </CardAction>
            </Card>
        </>
    );
}

export default About;

