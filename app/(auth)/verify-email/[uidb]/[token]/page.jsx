"use client";

import { verifyAccount } from "@/app/api/auth/accounts";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function VerifyAccount() {
  const {uidb, token} = useParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleVerification = async () => {
    setLoading(true);
    try {
      await verifyAccount(uidb, token);
      toast.success("Account verified successfully");
      setLoading(false);
      router.replace("/login");
    } catch (error) {
      toast.error("Failed to verify account");
      setLoading(false);
    }
  };
  return (
    <div className="h-svh relative place-content-center">
      <h1 className="absolute top-4 left-4 font-bold text-xl">SUPPCO</h1>
      <div className="flex justify-center items-center">
      <section className="flex flex-col space-y-3 items-center justify-center ">
          <Image src="/email.svg" alt="logo" width={200} height={200} />
          <div className="text-center">
          <h1>One last step</h1>
          <p>Click the button below to verify your account</p>
          </div>
          <Button
            disabled={loading}
            onClick={handleVerification}
            className="bg-primary/80 hover:bg-primary"
          >
            {loading ? (
                <span className="visually-hidden">Loading...</span>
            ) : (
              "Verify Account"
            )}
          </Button>
        </section>
      </div>
    </div>
    
  );
}

export default VerifyAccount;