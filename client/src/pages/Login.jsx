import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/LoginForm"

function Login() {
    const { user, authIsReady } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);

    if (!authIsReady) {
        return null; // add loading spinner if you have time
    }

    return (
        <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center  gap-6 p-6 md:p-10">
            <div className="flex items-center w-full max-w-sm flex-col gap-6">
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;
