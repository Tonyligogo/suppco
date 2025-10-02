import { urlActions } from "@/lib/axiosInstance";

export const verifyAccount = async (uidb, token) => {
  await urlActions?.patch(`/api/v1/auth/verify-email/${uidb}/${token}/`);
};