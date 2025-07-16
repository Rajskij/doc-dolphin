import { useState } from "react";
import { FileUpload } from "@/components/lab-results-analyzer/FileUpload";
import {
    Card,
    CardTitle,
} from "@/components/ui/card"

function About() {
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(file) {
        setIsLoading(true);
        setOutput('');

        const formData = new FormData();
        formData.append('file', file)

        const response = await fetch('http://localhost:8000/documents', {
            method: 'POST',
            body: formData,
            // Headers are automatically set by the browser when using FormData
        });

        const reader = response.body
            .pipeThrough(new TextDecoderStream())
            .getReader();

        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                break;
            }
            console.log('Received value: ', value);
            const jsonData = JSON.parse(value);
            setOutput(prev => prev + jsonData.message.content); // Stream text directly
        }
    }

    return (
        <>
            <Card className="@container/card px-4 mb-4">
                <CardTitle>
                    <h1>Upload your test result</h1>
                </CardTitle>
                <FileUpload handleSubmit={handleSubmit} />
            </Card>
            <Card className="@container/card px-4 mb-4">
                <h1>Test Data</h1>
                <p>{output}</p>
            </Card>
        </>
    );
}

export default About;

