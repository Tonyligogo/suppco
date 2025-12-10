import { urlActions } from "@/lib/axiosInstance";

// signup either contractor or supplier
export const signUpUser = async (accountType, values) => {
    const endpoint =
    accountType === "contractor"
      ? "/auth/signup/contractor/"
      : "/auth/signup/supplier/";
    await urlActions?.post(endpoint, values);
  };

  export const verifyAccount = async (uidb, token) => {
    await urlActions?.patch(`/auth/verify-email/${uidb}/${token}/`);
  };
  
  export const requestPasswordReset = async (email) => {
    await urlActions?.post(`/auth/password/reset/`, email);
  };
  
  export const passwordReset = async (data) => {
    await urlActions?.post(`/auth/password/new/`, data);
  };

  export const getUserInfo = async (id, axiosAuth) => {
    const response = await axiosAuth.get(`/auth/${id}`);
    return response?.data;
  }

  export const updateUserInfo = async (id, formData, axiosAuth) => {
    const response = await axiosAuth.patch(`/auth/${id}/`, formData); 
    return response?.data;
};