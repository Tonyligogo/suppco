"use client";

import Register from "../Register";

function SupplierSignUp() {

  return (
    <div className="h-[100vh] max-h-[100vh] flex flex-col justify-between">
      <h1 className="font-bold text-xl p-4 md:p-6">SUPPCO</h1>
      <div className="flex justify-center items-center">
        <Register role="supplier" />
      </div>
      <div className="flex w-full md:my-5 md:w-[90vw] mx-auto md:rounded-lg flex-col space-y-1 md:space-y-0 md:flex-row md:items-center py-6 px-4 md:px-10 bg-blue900 text-white justify-between">
        <h1>SUPPCO</h1>
        <p>© 2024 Supcco. All Rights Reserved.</p>
        <p>Terms Privacy Policy</p>
      </div>
    </div>
  );
}

export default SupplierSignUp;