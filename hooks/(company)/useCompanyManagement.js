import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "../useAxiosAuth";
import { getCompanyInfo, updateCompanyInfo } from "@/app/api/company";
import toast from "react-hot-toast";

export const useCompanyInfo = () => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: ["company"],
    queryFn:()=> getCompanyInfo(axiosAuth),
    enabled:!!axiosAuth,
  });
};

export const useUpdateCompanyInfo = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      // The mutation function receives the variables passed to mutate()
      mutationFn: ({ identity, formData }) => updateCompanyInfo(identity, formData, axiosAuth),
      
      onSuccess: (updatedData, variables) => {
          // 1. Invalidate the old query cache
          // This forces the useUserInfo hook to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ["company", variables.identity] });
          
          // I am directly setting the new data in the cache (Optimistic Update)
          queryClient.setQueryData(["company", variables.identity], updatedData);

          toast.success("Company updated successfully!");
      },
      
      onError: () => {
          toast.error(`Update failed: 'Server error'`);
      },
  });
};