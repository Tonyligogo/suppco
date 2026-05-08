import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "../useAxiosAuth";
import { createPaymentOption, getPaymentOptions, updatePaymentOption } from "@/app/api/payment";
import { createCart, createOrder, getCart, getOrders, getSupplierOrders } from "@/app/api/orders";
import toast from "react-hot-toast";

export function useCreatePaymentOption() {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();

  return useMutation({
    mutationFn: (data) => createPaymentOption(data, axiosAuth),
    onSuccess: () => {
      queryClient.invalidateQueries(['paymentoptions']);
    },
  });
}

export const useUpdatePaymentOption = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();

  return useMutation({
    mutationFn: ({productRef, ...data}) =>
      updatePaymentOption(data, axiosAuth),

    onSuccess: (updatedOption, variables) => {
      if (variables.productRef) {
        queryClient.invalidateQueries({
          queryKey: ["products", variables.productRef],
        });
      }
    },

    onError: () => {
      toast.error("Failed to update payment option. Please try again later!");
    },
  });
};

export const usePaymentOptions = () => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: ["paymentoptions"],
    queryFn:()=> getPaymentOptions(axiosAuth),
    enabled:!!axiosAuth,
  });
};

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();

  return useMutation({
    mutationFn: (data) => createOrder(data, axiosAuth),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
  });
}

export const useOrders = () => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: ["orders"],
    queryFn:()=> getOrders(axiosAuth),
    enabled:!!axiosAuth,
  });
};

// cart related hooks
export function useCreateCart() {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();

  return useMutation({
    mutationFn: (data) => createCart(data, axiosAuth),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      queryClient.setQueryData(["cart", updatedData.reference], updatedData);
    },
  });
}

export const useGetCart = () => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: ["cart"],
    queryFn:()=> getCart(axiosAuth),
    enabled:!!axiosAuth,
  });
};

// supplier orders
export const useSupplierOrders = () => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: ["supplier-orders"],
    queryFn:()=> getSupplierOrders(axiosAuth),
    enabled:!!axiosAuth,
  });
};