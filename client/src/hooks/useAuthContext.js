import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('authContext must be used inside and AuthContextProvider');
    }

    return context;
}
