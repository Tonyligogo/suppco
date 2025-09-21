import { signIn } from "@/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
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
          <form
            action={async (formData) => {
              "use server";
              await signIn("credentials", formData);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="font-normal text-lg">
                Email
              </Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-normal text-lg">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <Link
              href="/forgot-password"
              className="block text-right text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot your password?
            </Link>

            <Button className="w-full">Sign In</Button>
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
