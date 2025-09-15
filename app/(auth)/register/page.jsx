'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignupFormStep } from "./components/SignupFormStep";
import { AccountTypeStep } from "./components/AccountTypeStep";
import Logo from '@/public/logo.png'
import Image from "next/image";
import supplierImage from "@/public/hero-bg.jpg";


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
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative">
              <Image
                src={supplierImage}
                alt='welcome image'
                width={1500}
                height={1500}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  Join Suppco and get the best experience yet!
                </h2>
                <p className="text-lg opacity-90">
                  Whether you are a supplier that wants to showcase their services, or a contractor that wants to connect with reliable suppliers, we got you covered. Register now!
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md space-y-10">

      <Image src={Logo} alt='Suppco' width={250} height={150} className="mx-auto"/>
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