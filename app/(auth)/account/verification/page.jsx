import Image from "next/image";
import React from "react";

function Verification() {
  return (
    <div className="h-svh relative place-content-center">
      <h1 className="absolute top-4 left-4 font-bold text-xl">SUPPCO</h1>
      <div className="flex justify-center items-center">
        <section className="flex flex-col items-center justify-center ">
          <Image src="/mailbox.svg" alt="logo" width={200} height={200} />
          <h1 className="text-2xl mt-5 font-semibold">Account Verification</h1>
          <p className="my-3 text-lg text-center">
            Your account has been created successfully.
          </p>
          <p className="text-center">
          Please check your email for verification. 
          </p>
        </section>
      </div>
    </div>
  );
}

export default Verification;