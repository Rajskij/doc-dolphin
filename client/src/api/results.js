import toast from "@/lib/toast";

const BASE_URL = import.meta.env.VITE_API_URL;

async function editResult(token, result_id, title) {
    try {
        const response = await fetch(`${BASE_URL}/api/results/${result_id}`, {
            method: 'PATCH',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ title })
        })

        const json = await response.json();
        if (!response.ok) {
            toast.error(json.error || "Failed to fetch results");
            return;
        }
        toast.success("Title edited successfully");
        return json;
    } catch (err) {
        toast.error(err.message || "An error occurred");
    }
}

async function deleteResult(token, result_id) {
    try {
        const response = await fetch(`${BASE_URL}/api/results/${result_id}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        })

        if (!response.ok) {
            const json = await response.json();
            toast.error(json.error || "Failed to fetch results");
            return;
        }
        toast.success("Result removed successfully");
    } catch (err) {
        toast.error(err.message || "An error occurred");
    }
}

export { editResult, deleteResult };
