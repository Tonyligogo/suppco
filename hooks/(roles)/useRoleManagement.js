import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "../useAxiosAuth";
import { createPermission, createRole, getPermissions, getRoles } from "@/app/api/roles";
import toast from "react-hot-toast";

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      // The mutation function receives the variables passed to mutate()
      mutationFn: (data) => createRole(data, axiosAuth),
      
      onSuccess: (updatedData) => {
          // 1. Invalidate the old query cache
          // This forces the useUserInfo hook to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ["roles"] });
          
          // I am directly setting the new data in the cache (Optimistic Update)
          queryClient.setQueryData(["roles", updatedData.id], updatedData);
          toast.success("Role created successfully!");
      },
      
      onError: () => {
          toast.error(`Role creation failed: 'Server error'`);
      },
  });
};

export const useCreatePermission = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      // The mutation function receives the variables passed to mutate()
      mutationFn: (data) => createPermission(data, axiosAuth),
      
      onSuccess: (updatedData) => {
          // 1. Invalidate the old query cache
          // This forces the useUserInfo hook to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ["permissions"] });
          
          // I am directly setting the new data in the cache (Optimistic Update)
          queryClient.setQueryData(["permissions", updatedData.id], updatedData);

          toast.success("Permission created successfully!");
      },
      
      onError: () => {
          toast.error(`Permission creation failed: 'Server error'`);
      },
  });
};

export const useAllRoles = () => {
    const axiosAuth = useAxiosAuth();
      return useQuery({
        queryKey: ["roles"],
        queryFn:()=> getRoles(axiosAuth),
        enabled:!!axiosAuth,
      });
}

export const useAllPermissions = () => {
    const axiosAuth = useAxiosAuth();
      return useQuery({
        queryKey: ["permissions"],
        queryFn:()=> getPermissions(axiosAuth),
        enabled:!!axiosAuth,
      });
}