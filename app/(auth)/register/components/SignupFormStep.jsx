import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Logo from "@/public/logo.png";
import supplierImage from "@/public/hero-bg.jpg";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

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

  const heroImage =
    accountType === "contractor" ? contractorImage : supplierImage;
  const accountTypeLabel =
    accountType === "contractor" ? "Contractor" : "Supplier";

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src={heroImage}
          alt={`${accountTypeLabel} image`}
          width={1500}
          height={1500}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-3xl font-bold mb-2">
            Join as a {accountTypeLabel}
          </h2>
          <p className="text-lg opacity-90">
            {accountType === "contractor"
              ? "Connect with reliable suppliers for your projects"
              : "Showcase your services to quality contractors"}
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-10">
          <Image
            src={Logo}
            alt="Suppco"
            width={250}
            height={150}
            className="mx-auto"
          />
          <Card className="shadow-elegant border-border/50">
            <CardHeader className="space-y-2">
              <Button
                variant="ghost"
                onClick={onBack}
                className="w-fit h-auto text-muted-foreground hover:text-black"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <CardTitle className="text-2xl font-bold">
                Create your {accountTypeLabel.toLowerCase()} account
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Fill in your details to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
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
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.doe@example.com"
                            type="email"
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your password"
                            type="password"
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

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
