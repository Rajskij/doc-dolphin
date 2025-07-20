import { toast } from "sonner";

const BASE_URL = 'http://localhost:8000';

async function fetchLabResults(formData, setIsLoading, setIsStreaming, setError, setOutput, abortRef) {
    let isFirstChunk = true;
    toast.loading("Loading report...", { position: "bottom-center" });
    try {
        const start = Date.now();
        const response = await fetch(`${BASE_URL}/api/results`, {
            method: 'POST',
            body: formData,
            signal: abortRef.current.signal
            // Reminder: Headers are automatically set by the browser when using FormData
        });

        const reader = response.body
            .pipeThrough(new TextDecoderStream())
            .getReader();

        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                break;
            }
            if (isFirstChunk) {
                toast.dismiss();
                setIsLoading(false);
                setIsStreaming(true);
                isFirstChunk = !isFirstChunk;
                const duration = Date.now() - start;
                console.log(`Request took ${duration / 1000}seconds`);
            }

            // console.log('Received value: ', value);
            const jsonData = JSON.parse(value);
            if (jsonData.error) {
                setError(jsonData.error);
                toast.error(jsonData.error || "Failed to fetch results", { position: "top-center" });
                break;
            }
            setOutput(prev => prev + jsonData.message?.content);
        }
    } catch (err) {
        if (err.name === 'AbortError') {
            setError(abortRef.current.error);
            toast.error(abortRef.current.error || "Aborted by User", { position: "top-center" });
        } else {
            setError(err.message);
            toast.error(err.message || "An error occurred", { position: "top-center" });
        }
    } finally {
        setIsStreaming(false);
        setIsLoading(false);
        toast.dismiss();
    }
}

async function saveResult(userId, data) {
    try {
        toast.loading("Saving report...", { position: "bottom-center" });
        const jsonPayload = {
            report: data,
        };

        const response = await fetch(`${BASE_URL}/api/results/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonPayload)
        });
        const json = await response.json();

        console.log(json)
        if (!response.ok) {
            toast.error(json.error || "Failed to fetch results", { position: "top-center" });
            return false;
        }
        toast.dismiss();
        toast.success("Result saved successfully", { position: "top-center" });
        return true;
    } catch (err) {
        toast.error(err.message || "An error occurred", { position: "top-center" });
        return false;
    } finally {
        toast.dismiss();
    }
}

export { fetchLabResults, saveResult };
