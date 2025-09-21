import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowLeft } from "lucide-react";
import contractorImage from "@/public/hero-bg-2.jpg";
import supplierImage from "@/public/hero-bg.jpg";
import toast from "react-hot-toast";
import Link from "next/link";

const signupFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signupUser = async (data) => {
  const endpoint =
    data.accountType === "contractor"
      ? "/api/auth/signup/contractor"
      : "/api/auth/signup/supplier";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create account");
  }

  return response.json();
};

export const SignupFormStep = ({ accountType, onBack, onSuccess }) => {
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data) => signupUser({ ...data, accountType }),
    onSuccess: () => {
      onSuccess(form.getValues("email"));
    },
    onError: () => {
      toast.error("Registration failed. Please try again!");
    },
  });

  const onSubmit = (data) => {
    signupMutation.mutate(data);
  };

  const accountTypeLabel =
    accountType === "contractor" ? "Contractor" : "Supplier";

  return (
     <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
              <div className="flex w-full max-w-lg flex-col gap-6">
                <div className="flex flex-col items-center ">
                  <a href="/" className="font-bold text-3xl">
                    Suppco
                  </a>
                  <p className="mt-3 text-xl font-semibold text-muted-foreground">
                    Welcome To Suppco
                  </p>
                  <p className="text-muted-foreground">Please sign up to continue</p>
                </div>
                <div className="border rounded-lg p-6">
                  <button
                  onClick={onBack}
                  className="flex items-center w-fit h-auto text-muted-foreground hover:text-black"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </button>
                <p className="text-2xl font-bold text-center">Create your {accountTypeLabel.toLowerCase()} account</p>
                <div className="mt-6">
                <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-lg font-normal'>First name</FormLabel>
                          <FormControl>
                            <Input placeholder='First name' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-lg font-normal'>Last name</FormLabel>
                          <FormControl>
                            <Input placeholder='Last name' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-lg font-normal'>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder='example@gmail.com'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-lg font-normal'>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder='********'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className={`w-full ${
                      accountType === "contractor"
                        ? "bg-secondary"
                        : "bg-primary"
                    } `}
                    disabled={signupMutation.isPending}
                  >
                    {signupMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </Form>

              <div className="text-center text-sm mt-3 text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </div>
                </div>
                </div>
              </div>
            </div>
  );
};
