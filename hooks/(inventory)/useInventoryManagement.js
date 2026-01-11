import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "../useAxiosAuth";
import toast from "react-hot-toast";
import { createInventory, createLayer, createSubLayer, createSubLayerItem, getInventories, getLayers, getSubLayerItems, getSubLayers, updateInventory } from "@/app/api/inventory";
import { createProduct, getProducts } from "@/app/api/products";

export const useInventory = () => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: ["inventories"],
    queryFn:()=> getInventories(axiosAuth),
    enabled:!!axiosAuth,
  });
};

export const useCreateInventory = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      // The mutation function receives the variables passed to mutate()
      mutationFn: ({data}) => createInventory(data, axiosAuth),
      
      onSuccess: (updatedData) => {
          // 1. Invalidate the old query cache
          // This forces the useUserInfo hook to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ["inventories"] });
          
          // I am directly setting the new data in the cache (Optimistic Update)
          queryClient.setQueryData(["inventories", updatedData.identity], updatedData);

          toast.success("Inventory created successfully!");
      },
      
      onError: () => {
          toast.error(`Inventory creation failed: 'Server error'`);
      },
  });
};

export const useUpdateInventory = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      // The mutation function receives the variables passed to mutate()
      mutationFn: ({ identity, formData }) => updateInventory(identity, formData, axiosAuth),
      
      onSuccess: (updatedData, variables) => {
          // 1. Invalidate the old query cache
          // This forces the useUserInfo hook to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ["inventories"] });
          
          // I am directly setting the new data in the cache (Optimistic Update)
          queryClient.setQueryData(["inventories", variables.identity], updatedData);

          toast.success("Inventory updated successfully!");
      },
      
      onError: () => {
          toast.error(`Inventory update failed: 'Server error'`);
      },
  });
};
// create layer
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      // The mutation function receives the variables passed to mutate()
      mutationFn: ({data}) => createProduct(data, axiosAuth),
      
      onSuccess: (updatedData) => {
          // 1. Invalidate the old query cache
          // This forces the useUserInfo hook to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ["products"] });
          
          // I am directly setting the new data in the cache (Optimistic Update)
          queryClient.setQueryData(["products", updatedData.identity], updatedData);

          toast.success("Product created successfully!");
      },
      
      onError: () => {
          toast.error(`Product creation failed. Please try again after a while.`);
      },
  });
};
export const useProducts = () => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: ["products"],
    queryFn:()=> getProducts(axiosAuth),
    enabled:!!axiosAuth,
  });
};

// create layer
export const useCreateLayer = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      // The mutation function receives the variables passed to mutate()
      mutationFn: ({data}) => createLayer(data, axiosAuth),
      
      onSuccess: (updatedData) => {
          // 1. Invalidate the old query cache
          // This forces the useUserInfo hook to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ["layers"] });
          
          // I am directly setting the new data in the cache (Optimistic Update)
          queryClient.setQueryData(["layers", updatedData.identity], updatedData);

          toast.success("Layer created successfully!");
      },
      
      onError: () => {
          toast.error(`Layer creation failed. Please try again after a while.`);
      },
  });
};
// layers
export const useLayers = () => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: ["layers"],
    queryFn:()=> getLayers(axiosAuth),
    enabled:!!axiosAuth,
  });
};
// create sublayer
export const useCreateSubLayer = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      // The mutation function receives the variables passed to mutate()
      mutationFn: ({data}) => createSubLayer(data, axiosAuth),
      
      onSuccess: (updatedData) => {
          // 1. Invalidate the old query cache
          // This forces the useUserInfo hook to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ["sublayers"] });
          
          // I am directly setting the new data in the cache (Optimistic Update)
          queryClient.setQueryData(["sublayers", updatedData.identity], updatedData);

          toast.success("SubLayer created successfully!");
      },
      
      onError: () => {
          toast.error(`SubLayer creation failed. Please try again after a while.`);
      },
  });
};
// sublayers
export const useSubLayers = () => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: ["sublayers"],
    queryFn:()=> getSubLayers(axiosAuth),
    enabled:!!axiosAuth,
  });
};
// create sublayer
export const useCreateSubLayerItem = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      // The mutation function receives the variables passed to mutate()
      mutationFn: ({data}) => createSubLayerItem(data, axiosAuth),
      
      onSuccess: (updatedData) => {
          // 1. Invalidate the old query cache
          // This forces the useUserInfo hook to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ["sublayeritems"] });
          
          // I am directly setting the new data in the cache (Optimistic Update)
          queryClient.setQueryData(["sublayeritems", updatedData.identity], updatedData);

          toast.success("Sublayer item created successfully!");
      },
      
      onError: () => {
          toast.error(`Sublayer item creation failed. Please try again after a while.`);
      },
  });
};
// sublayer items
export const useSubLayerItems = () => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: ["sublayeritems"],
    queryFn:()=> getSubLayerItems(axiosAuth),
    enabled:!!axiosAuth,
  });
};