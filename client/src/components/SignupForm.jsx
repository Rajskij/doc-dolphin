
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useAuthContext } from "@/hooks/useAuthContext";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSignup } from "@/hooks/useSignup";

export function SignupForm({ className, ...props }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();
  const { authIsReady } = useAuthContext();
  const navigate = useNavigate();

  if (!authIsReady) {
    return null; // add loading spinner if you have time
  }

  function handleSubmit(e) {
    console.log('Submit was clicked')
    e.preventDefault();
    signup(fullName, email, password);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {error && <div className="text-center text-red-300 text-xl">{error}</div>}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Seconds to sign up!</CardTitle>
          <CardDescription>
            Continue with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor" />
                  </svg>
                  Continue with Google
                </Button>
              </div>
              <div
                className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  OR
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" onChange={(e) => setFullName(e.target.value)} value={fullName} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link to="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  Sign Up
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <Link to="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}

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