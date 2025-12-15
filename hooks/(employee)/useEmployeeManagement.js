import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "../useAxiosAuth";
import toast from "react-hot-toast";
import { updateBranchInfo } from "@/app/api/branch";
import { createEmployee, getEmployees } from "@/app/api/employee";

export const useAllEmployees = () => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: ["employees"],
    queryFn:()=> getEmployees(axiosAuth),
    enabled:!!axiosAuth,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      // The mutation function receives the variables passed to mutate()
      mutationFn: ({ data }) => createEmployee(data, axiosAuth),
      
      onSuccess: (updatedData) => {
          // 1. Invalidate the old query cache
          // This forces the useUserInfo hook to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ["employees"] });
          
          // I am directly setting the new data in the cache (Optimistic Update)
          queryClient.setQueryData(["employees", updatedData.id], updatedData);

          toast.success("Employee invite sent successfully!");
      },
      
      onError: () => {
          toast.error(`Employee creation failed: 'Server error'`);
      },
  });
};

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      // The mutation function receives the variables passed to mutate()
      mutationFn: ({ identity, formData }) => updateBranchInfo(identity, formData, axiosAuth),
      
      onSuccess: (updatedData, variables) => {
          // 1. Invalidate the old query cache
          // This forces the useUserInfo hook to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ["branches"] });
          
          // I am directly setting the new data in the cache (Optimistic Update)
          queryClient.setQueryData(["branches", variables.identity], updatedData);

          toast.success("Branch updated successfully!");
      },
      
      onError: () => {
          toast.error(`Update failed: 'Server error'`);
      },
  });
};