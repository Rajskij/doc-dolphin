const BASE_URL = 'http://localhost:8000';

async function fetchLabResults(formData, setIsLoading, setIsStreaming, setError, setOutput, abortRef) {
    let isFirstChunk = true;
    setIsLoading(true);

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
                break;
            }
            setOutput(prev => prev + jsonData.message?.content);
        }
    } catch (err) {
        if (err.name === 'AbortError') {
            setError(abortRef.current.error);
        } else {
            setError(err.message);
        }
    } finally {
        setIsStreaming(false);
        setIsLoading(false);
    }
}

async function createResult(userId, setError, data) {
    try {
        // setIsLoading(true);
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
            setError(json.error);
        }
    } catch (error) {
        setError(error.message);
    } finally {
        // setIsLoading(false);
    }
}

export { fetchLabResults, createResult };
