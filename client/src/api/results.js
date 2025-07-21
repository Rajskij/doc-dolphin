import { toast } from "sonner";

async function editResult(result_id, title) {
    try {
        const response = await fetch(`http://localhost:8000/api/results/${result_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        })

        const json = await response.json();
        if (!response.ok) {
            toast.error(json.error || "Failed to fetch results", { position: "top-center" });
            return;
        }
        toast.success("Title edited successfully", { position: "top-center" });
        return json;
    } catch (err) {
        toast.error(err.message || "An error occurred", { position: "top-center" });
    }
}

async function deleteResult(result_id) {
    try {
        const response = await fetch(`http://localhost:8000/api/results/${result_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) {
            const json = await response.json();
            toast.error(json.error || "Failed to fetch results", { position: "top-center" });
            return;
        }
        toast.success("Result removed successfully", { position: "top-center" });
    } catch (err) {
        toast.error(err.message || "An error occurred", { position: "top-center" });
    }
}

export { editResult, deleteResult };
