"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

const axiosAuth = axios.create({
  baseURL: BASE_URL
});

const useAuthorizationHeader = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        // If the session exists and has an access token, add it
        if (!config.headers["Authorization"] && session?.user?.token) {
          config.headers["Authorization"] = `Bearer ${session?.user?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Cleanup: Eject the interceptor when the hook unmounts or session changes
    // to prevent memory leaks or duplicate interceptors
    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
    };
  }, [session]);

  return axiosAuth;
};

export default useAuthorizationHeader;