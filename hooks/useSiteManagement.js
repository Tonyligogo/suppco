import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createSite, getSites, updateSiteInfo } from "@/app/api/site";
import { useAxiosAuth } from "./useAxiosAuth";

export const useCompanySites = () => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: ["sites"],
    queryFn:()=> getSites(axiosAuth),
    enabled:!!axiosAuth,
  });
};

export const useCreateSite = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      // The mutation function receives the variables passed to mutate()
      mutationFn: ({ formData }) => createSite(formData, axiosAuth),
      
      onSuccess: (updatedData) => {
          // 1. Invalidate the old query cache
          // This forces the useUserInfo hook to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ["sites"] });
          
          // I am directly setting the new data in the cache (Optimistic Update)
          queryClient.setQueryData(["sites", updatedData.identity], updatedData);

          toast.success("Site created successfully!");
      },
      
      onError: () => {
          toast.error(`Site creation failed`);
      },
  });
};

export const useUpdateSite = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      // The mutation function receives the variables passed to mutate()
      mutationFn: ({ identity, formData }) => updateSiteInfo(identity, formData, axiosAuth),
      
      onSuccess: (updatedData, variables) => {
          // 1. Invalidate the old query cache
          // This forces the useUserInfo hook to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ["sites"] });
          
          // I am directly setting the new data in the cache (Optimistic Update)
          queryClient.setQueryData(["sites", variables.identity], updatedData);

          toast.success("Site updated successfully!");
      },
      
      onError: () => {
          toast.error(`Site update failed`);
      },
  });
};