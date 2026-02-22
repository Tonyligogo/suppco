import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "../useAxiosAuth";
import { createPaymentOption, getPaymentOptions } from "@/app/api/payment";
import { createCart, createOrder, getCart, getOrders, getSupplierOrders } from "@/app/api/orders";

export function useCreatePaymentOption() {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();

  return useMutation({
    mutationFn: (data) => createPaymentOption(data, axiosAuth),
    onSuccess: () => {
      queryClient.invalidateQueries(['payment-options']);
    },
  });
}

export const usePaymentOptions = () => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: ["payment-options"],
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