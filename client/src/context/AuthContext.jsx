import { createContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext();

export function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
}

export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, { user: null });
    const [authIsReady, setAuthIsReady] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }

        setAuthIsReady(true);
    }, []);

    console.log("🚀 ~ AuthContextProvider ~ state:", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch, authIsReady }}>
            {children}
        </AuthContext.Provider>
    )
}
