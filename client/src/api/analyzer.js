import { useAuthContext } from "@/hooks/useAuthContext";
import toast from "@/lib/toast";

const BASE_URL = import.meta.env.VITE_API_URL;

async function fetchLabResults(token, formData, setIsLoading, setIsStreaming, setError, setOutput, abortRef) {
    let isFirstChunk = true;
    toast.loading("Loading report...");
    try {
        const start = Date.now();
        const response = await fetch(`${BASE_URL}/api/results/analyze`, {
            method: 'POST',
            body: formData,
            signal: abortRef.current.signal,
            headers: {
                'Authorization': `Bearer ${token}`,
                // Reminder: Headers are automatically set by the browser when using FormData
            },
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

            const jsonData = JSON.parse(value);
            if (jsonData.error) {
                setError(jsonData.error);
                toast.error(jsonData.error || "Failed to fetch results");
                break;
            }
            setOutput(prev => prev + jsonData.message?.content);
        }
    } catch (err) {
        toast.dismiss();
        if (err.name === 'AbortError') {
            setError(abortRef.current.error);
            toast.error(abortRef.current.error || "Aborted by User");
        } else {
            setError(err.message);
            toast.error(err.message || "An error occurred");
        }
    } finally {
        setIsStreaming(false);
        setIsLoading(false);
    }
}

async function saveResult(user, data) {
    try {
        toast.loading("Saving report...");
        const jsonPayload = {
            report: data,
        };

        const response = await fetch(`${BASE_URL}/api/results/user/${user.id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonPayload)
        });
        const json = await response.json();

        if (!response.ok) {
            toast.error(json.error || "Failed to fetch results");
            return false;
        }
        toast.dismiss();
        toast.success("Result saved successfully");
        return true;
    } catch (err) {
        toast.dismiss();
        toast.error(err.message || "An error occurred");
        return false;
    }
}

async function fetchMoodInsights(
    token,
    userId,
    startDate,
    endDate,
    setIsLoading,
    setIsStreaming,
    setOutput,
    abortRef,
) {
    setOutput('');
    setIsLoading(true);
    let isFirstChunk = true;
    toast.loading("Generating insights...");

    try {
        const start = Date.now();
        const response = await fetch(`${BASE_URL}/api/mood-journal/analyze/${userId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            signal: abortRef.current.signal,
            body: JSON.stringify({
                user_id: userId,
                startDate,
                endDate,
            }),
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "Failed to fetch insights.");
        }

        const reader = response.body
            .pipeThrough(new TextDecoderStream())
            .getReader();

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            if (isFirstChunk) {
                toast.dismiss();
                setIsLoading(false);
                setIsStreaming(true);
                const duration = (Date.now() - start) / 1000;
                console.log(`Request took ${duration} seconds`);
                isFirstChunk = false;
            }

            try {
                const jsonChunk = JSON.parse(value);
                if (jsonChunk.error || !jsonChunk.message) {
                    toast.error(jsonChunk.error || "Insight generation failed");
                    break;
                }
                setOutput(prev => prev + jsonChunk.message.content);
            } catch (parseErr) {
                setOutput(prev => prev + value);
            }
        }
    } catch (err) {
        toast.dismiss();
        if (err.name === "AbortError") {
            toast.error(abortRef.current.error || "Request aborted");
        } else {
            toast.error(err.message || "An error occurred");
        }
        console.error('Error: ', err)
    } finally {
        setIsStreaming(false);
        setIsLoading(false);
    }
}

export { fetchLabResults, saveResult, fetchMoodInsights };
