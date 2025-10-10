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
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUpUser } from "@/app/api/auth/accounts";

const signupFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const invalidPasswordRegex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;
  function isPasswordValid(password) {
    return !invalidPasswordRegex.test(password); // invert the check
  }

const signUp = async (data) => {
  const finalData = {
    firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
  }
  try {
    const res = await signUpUser(data.accountType, finalData);
    return res;
  } catch (error) {
    throw error;
  }
};

export const SignupFormStep = ({ accountType, onBack }) => {
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const [invalidPassword, setInvalidPassword] = useState('');
  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: (data) => signUp({ ...data, accountType }),
    onSuccess: () => {
      toast.success("Account created successfully! Please verify your email.");
      router.push("/account/verification");
    },
    onError: (error) => {
      console.log(error);
      const errorMessage = error?.response?.data?.message || "An error occurred during signup.";
    toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    if (!isPasswordValid(data.password)) {
      setInvalidPassword('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
      setTimeout(() => {
        setInvalidPassword('');
      }, 5000);
      return;
    }
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
                {invalidPassword && <p className="text-sm text-red-500 mb-2">{invalidPassword}</p>}


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
