'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import LoadingComponent from "@/components/custom/loading-component";
import { signInUser } from "@/actions/authActions";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!email || !password) {
    return toast.error("Please fill in all fields");
  }

  setLoading(true);

  try {
    const response = await signInUser({ email, password });

    if (response.error) {
      const message = response.error === 'CredentialsSignin' 
        ? "Invalid email or password" 
        : "An unexpected error occurred";
      
      return toast.error(message);
    }

    toast.success("Login successful");
    setEmail("");
    setPassword("");
    
    router.replace('/dashboard');
    
  } catch {
    toast.error("Something went wrong. Please try again later.");
  } finally {
    setLoading(false);
  }
};
 
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center ">
          <a href="/" className="font-bold text-3xl">
            Suppco
          </a>
          <p className="mt-3 text-xl font-semibold text-muted-foreground">
            Welcome Back
          </p>
          <p className="text-muted-foreground">Please sign in to continue</p>
        </div>
        <div className="border rounded-lg p-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-normal text-lg">
                Email
              </Label>
              <Input id="email" type="email" placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password" className="font-normal text-lg">
                Password
              </Label>
              <Input
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={()=>setIsPasswordVisible(prev=>!prev)} type='button' className="absolute right-2 top-1/2 translate-y-1/4 text-muted-foreground">
                {isPasswordVisible ? <EyeOff/> : <Eye/>}              
              </button>
            </div>

            <Link
              href="/forgot-password"
              className="block text-right text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot your password?
            </Link>

<Button
            type="submit"
            className="bg-primary/80 hover:bg-primary cursor-pointer w-full rounded-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
                      <>
                        <LoadingComponent/>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
          </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
