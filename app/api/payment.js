export const createPaymentOption = async (data,axiosAuth) => {
    const response = await axiosAuth.post(`/paymentoptions/`, data);
    return response?.data;
};

export const getPaymentOptions = async (axiosAuth) => {
    const response = await axiosAuth.get(`/paymentoptions/`);
    return response?.data?.results;
};