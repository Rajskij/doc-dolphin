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
        console.log('Submit was clicked')
        e.preventDefault();
        signup(email, password);
    }

    return (
        <div className="flex min-h-vh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex items-center w-full max-w-sm flex-col gap-6">
                <SignupForm />
            </div>
        </div>
        // <div className="flex justify-center items-center h-200vh">
        //     <div className="w-150 p-10 bg-green border">
        //         <h1>Create your account</h1>
        //         <form className="flex flex-col" onSubmit={handleSubmit}>
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
        //             <button className="border h-10 mb-3" disabled={isLoading}>Sign up</button>
        //             <div className="error">{error}</div>
        //         </form>
        //         <p className="signup-text">
        //             Already have an account? <Link to='/login'>Sign in</Link>
        //         </p>
        //         <p style={{ color: "grey" }}>By signing up you agree to the Terms of Use, Privacy Policy and Cookie Policy</p>
        //     </div>
        // </div>
    );
}

export default Signup;
