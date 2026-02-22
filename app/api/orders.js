export const createOrder = async (data,axiosAuth) => {
    const response = await axiosAuth.post(`/orders/checkout/`, data);
    return response?.data;
};

export const getOrders = async (axiosAuth) => {
    const response = await axiosAuth.get(`/orders/`);
    return response?.data?.results;
};

export const createCart = async (data,axiosAuth) => {
    const response = await axiosAuth.post(`/cartitems/`, data);
    return response?.data;
};

export const getCart = async (axiosAuth) => {
    const response = await axiosAuth.get(`/cart/`);
    return response?.data;
};

// supplier orders
export const getSupplierOrders = async (axiosAuth) => {
    const response = await axiosAuth.get(`/supplierorders/`);
    return response?.data?.results;
};