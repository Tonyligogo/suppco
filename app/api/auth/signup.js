import { urlActions } from "@/lib/axiosInstance";

// signup either contractor or supplier
export const signUpUser = async (accountType, values) => {
    const endpoint =
    accountType === "contractor"
      ? "/api/v1/auth/signup/contractor/"
      : "/api/v1/auth/signup/supplier/";
    await urlActions?.post(endpoint, values);
  };
