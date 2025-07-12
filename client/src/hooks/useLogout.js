import { useAuthContext } from "./useAuthContext";

export function useLogout() {
    const { dispatch } = useAuthContext();

    function logout() {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT', payload: null });
    }

    return { logout };
} 
