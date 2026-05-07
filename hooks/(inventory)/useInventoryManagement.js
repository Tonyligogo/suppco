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
      mutationFn: ({ data }) => createInventory(data, axiosAuth),

    onSuccess: (newInventory) => {
      // Add the new item directly into the list cache — instant UI update
      queryClient.setQueryData(
        ["inventories"],
        (prev) => {
          return prev ? [...prev, newInventory] : [newInventory];
        }
      );
      // Pre-populate the detail query so navigating to it is instant
      queryClient.setQueryData(["inventories", newInventory.id], newInventory);

      toast.success("Inventory created successfully!");
    },

    onError: (error) => {
      const message = error?.response?.data?.message ?? "Server error";
      toast.error(`Inventory creation failed: ${message}`);
    },
  });
};

export const useUpdateInventory = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
    
  return useMutation({
      mutationFn: ({ id, formData }) => updateInventory(id, formData, axiosAuth),

      onSuccess: (updatedItem) => {
      // Update the item inside the list cache without a refetch
      queryClient.setQueryData(
        ["inventories"],
        (prev) =>
          prev?.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
      // Update the detail cache too
      queryClient.setQueryData(["inventories", updatedItem.id], updatedItem);

      toast.success("Inventory updated successfully!");
    },

    onError: (error) => {
      const message = error?.response?.data?.message ?? "Server error";
      toast.error(`Update failed: ${message}`);
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
      
      onSuccess: (newLayer) => {
      // Add the new item directly into the list cache — instant UI update
      queryClient.setQueryData(
        ["layers"],
        (prev) => {
          return prev ? [...prev, newLayer] : [newLayer];
        }
      );
      // Pre-populate the detail query so navigating to it is instant
      queryClient.setQueryData(["layers", newLayer.id], newLayer);
      toast.success("Layer created successfully!");
    },

    onError: (error) => {
      const message = error?.response?.data?.message ?? "Server error";
      toast.error(`Layer creation failed: ${message}`);
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
      
      onSuccess: (newSubLayer) => {
      // Add the new item directly into the list cache — instant UI update
      queryClient.setQueryData(
        ["sublayers"],
        (prev) => {
          return prev ? [...prev, newSubLayer] : [newSubLayer];
        }
      );
      // Pre-populate the detail query so navigating to it is instant
      queryClient.setQueryData(["sublayers", newSubLayer.id], newSubLayer);
      toast.success("Sublayer created successfully!");
    },

    onError: (error) => {
      const message = error?.response?.data?.message ?? "Server error";
      toast.error(`Sublayer creation failed: ${message}`);
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
      
      onSuccess: (newSublayerItem) => {
      // Add the new item directly into the list cache — instant UI update
      queryClient.setQueryData(
        ["sublayeritems"],
        (prev) => {
          return prev ? [...prev, newSublayerItem] : [newSublayerItem];
        }
      );
      // Pre-populate the detail query so navigating to it is instant
      queryClient.setQueryData(["sublayeritems", newSublayerItem.id], newSublayerItem);
      toast.success("Sublayer item created successfully!");
    },

    onError: (error) => {
      const message = error?.response?.data?.message ?? "Server error";
      toast.error(`Sublayer item creation failed: ${message}`);
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