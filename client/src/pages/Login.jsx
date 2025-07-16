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
        <div className="flex min-h-vh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex items-center w-full max-w-sm flex-col gap-6">
                <LoginForm />
            </div>
        </div>
        //  <a href="#" className="flex items-center gap-2 self-center font-medium">
        //     <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
        //         <GalleryVerticalEnd className="size-4" />
        //     </div>
        //     Acme Inc.
        // </a>
        // <div className="flex justify-center items-center h-200vh">
        //     <div className="w-150 p-10 bg-green border">
        //         <h1 className="text-2xl font-bold">Welcome back</h1>
        //         <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
        //             <input
        //                 className="h-10 border mb-3"
        //                 type="email"
        //                 placeholder="Enter your email"
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 value={email}
        //             />
        //             <input
        //                 className="h-10 border mb-3"
        //                 type="password"
        //                 placeholder="Enter your password"
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 value={password}
        //             />
        //             <a href="#" className="forgot-password">Forgot password?</a>
        //             <button className="border h-10" disabled={isLoading}>Sign in</button>
        //             <div className="error">{error}</div>
        //         </form>
        //         <p className="signup-text">
        //             Don't have an account? <Link to='/signup'>Sign up</Link>
        //         </p>
        //         <div className="or-divider">
        //             <span>OR</span>
        //         </div>
        //         <div className="flex items-center border h-10">
        //             <img className="h-5 m-3" src="https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png" alt="" />
        //             <a href="https://app.docus.ai/auth/google">
        //                 Login with Google
        //             </a>
        //         </div>
        //     </div>
        // </div>
    );
}

export default Login;
