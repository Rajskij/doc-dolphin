import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const BASE_URL = import.meta.env.VITE_API_URL;

export function useSignup() {
    const { dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    async function signup(fullName, email, password) {
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/api/users/signup`, {
                method: 'POST',
                body: JSON.stringify({ fullName, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const json = await response.json();

            if (response.ok) {
                // set local storage
                localStorage.setItem('user', JSON.stringify(json));
                // set context
                dispatch({ type: 'LOGIN', payload: json });
            } else {
                setError(json.error);
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);            
        }
    }

    return { signup, error, isLoading };
}
