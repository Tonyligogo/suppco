'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignupFormStep } from "./components/SignupFormStep";
import { AccountTypeStep } from "./components/AccountTypeStep";


const Signup = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("account-type");
  const [selectedAccountType, setSelectedAccountType] = useState('');

  const handleAccountTypeNext = () => {
    if (selectedAccountType) {
      setCurrentStep("form");
    }
  };

  const handleBack = () => {
    setCurrentStep("account-type");
  };

  const handleSignupSuccess = () => {
    router.push("/verification");
  };

  if (currentStep === "form" && selectedAccountType) {
    return (
      <SignupFormStep
        accountType={selectedAccountType}
        onBack={handleBack}
        onSuccess={handleSignupSuccess}
      />
    );
  }

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
              <AccountTypeStep
                selectedType={selectedAccountType}
                onTypeChange={setSelectedAccountType}
                onNext={handleAccountTypeNext}
              />
            </div>
          </div>
        </div>
  );
};

export default Signup;