import { useState, useEffect } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import { SignupForm } from "@/components/SignupForm";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);

    function handleSubmit(e) {
        e.preventDefault();
        signup(email, password);
    }

    return (
        <div className="flex min-h-[calc(100vh-11rem)] flex-col items-center gap-6 p-6 md:p-10">
            <div className="flex items-center w-full max-w-sm flex-col gap-6">
                <SignupForm />
            </div>
        </div>
    );
}

export default Signup;
