import { urlActions } from "@/lib/axiosInstance";

// signup either contractor or supplier
export const signUpUser = async (accountType, values) => {
    const endpoint =
    accountType === "contractor"
      ? "/api/v1/auth/signup/contractor/"
      : "/api/v1/auth/signup/supplier/";
    await urlActions?.post(endpoint, values);
  };

  export const verifyAccount = async (uidb, token) => {
    await urlActions?.patch(`/api/v1/auth/verify-email/${uidb}/${token}/`);
  };
  
  export const requestPasswordReset = async (email) => {
    await urlActions?.post(`/api/v1/auth/password/reset/`, email);
  };
  
  export const passwordReset = async (data) => {
    await urlActions?.post(`/api/v1/auth/password/new/`, data);
  };