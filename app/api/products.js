export const createProduct = async (formData,axiosAuth) => {
    const response = await axiosAuth.post(`/products/`, formData);
    return response?.data;
};

export const getProducts = async (axiosAuth) => {
    const response = await axiosAuth.get(`/products/`);
    return response?.data?.results;
};

export const updateInventory = async (identity, formData, axiosAuth) => {
    const response = await axiosAuth.patch(`/products/${identity}/`, formData); 
    return response?.data;
};