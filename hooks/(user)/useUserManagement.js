import { getUserInfo, updateUserInfo } from "@/app/api/auth/accounts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "../useAxiosAuth";
import toast from "react-hot-toast";

export const useUserInfo = (id) => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: ["profile"],
    queryFn:()=> getUserInfo(id, axiosAuth),
    enabled: !!id && !!axiosAuth,
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      // The mutation function receives the variables passed to mutate()
      mutationFn: ({ id, formData }) => updateUserInfo(id, formData, axiosAuth),
      
      onSuccess: (updatedData, variables) => {
          // 1. Invalidate the old query cache
          // This forces the useUserInfo hook to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ["profile", variables.id] });
          
          // I am directly setting the new data in the cache (Optimistic Update)
          queryClient.setQueryData(["profile", variables.id], updatedData);

          toast.success("Profile updated successfully!");
      },
      
      onError: (error) => {
          console.error("Profile update failed:", error);
          toast.error(`Update failed: 'Server error'`);
      },
  });
};