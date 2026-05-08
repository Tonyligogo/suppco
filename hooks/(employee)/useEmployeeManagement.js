import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "../useAxiosAuth";
import toast from "react-hot-toast";
import { updateBranchInfo } from "@/app/api/branch";
import { assignEmployeeToBranch, createEmployee, getEmployees, unassignEmployee } from "@/app/api/employee";

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

export const useAssignEmployeeToBranch = () => {
  const queryClient = useQueryClient()
  const axiosAuth = useAxiosAuth()

  return useMutation({
    mutationFn: (formData) => assignEmployeeToBranch(axiosAuth, formData),

    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['branch', variables.branch, 'members'] })

      const msg = response?.is_head
        ? `${response?.employee_username} assigned as branch head.`
        : `${response?.employee_username} assigned successfully.`
      toast.success(msg)
    },

    onError: (error) => {
      const message =
        error?.response?.data?.non_field_errors?.[0] ??
        error?.response?.data?.message ??
        'Assignment failed'
      toast.error(message)
    },
  })
}

export const useUnassignEmployee = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();

  return useMutation({
    mutationFn: (data) =>
      unassignEmployee(axiosAuth, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success(`${variables.employee_username} has been unassigned.`);
    },

    onError: (error) => {
      const message =
        error?.response?.data?.employee_username?.[0] ??
        error?.response?.data?.message ??
        "Unassignment failed";
      toast.error(message);
    },
  });
};