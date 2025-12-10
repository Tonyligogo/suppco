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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const data = { email, password };
    try {
      const response = await signInUser(data);
      if(!!response.error){
        toast.error("Invalid email or password");
      }
      if(response.success){
        setEmail("");
        setPassword("");
        toast.success("Login successful");
        router.replace('/dashboard')
      }
      
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }finally{
      setLoading(false);
    }

  }
 
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

            <div className="space-y-2">
              <Label htmlFor="password" className="font-normal text-lg">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
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
