"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

export function useAxiosAuth() {
  const { data: session, status } = useSession();
  // Using useMemo to prevent creating a new axios instance on every render if the token hasn't changed 
  const axiosAuth = useMemo(() => {
      const token = session?.user?.token;
      
      if (status !== 'authenticated' || !token) {
          return null; // Return null if session is loading or not authenticated
      }

      return axios.create({
          baseURL: BASE_URL,
          headers: {
              "Authorization": `Token ${token}`, 
          }
      });
  }, [session, status]); // Re-create when session or status changes

  return axiosAuth;
}
