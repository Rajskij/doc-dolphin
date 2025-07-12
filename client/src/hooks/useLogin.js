import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useLogin() {
    const { dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    async function login(email, password) {
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
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
            setIsLoading(false);
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }

    return { login, error, isLoading };
}
