export const createSite = async (formData,axiosAuth) => {
    const response = await axiosAuth.post(`/sites/`, formData);
    return response?.data;
};

export const getSites = async (axiosAuth) => {
    const response = await axiosAuth.get(`/sites/`);
    return response?.data?.results;
};

export const updateSiteInfo = async (identity, formData, axiosAuth) => {
    const response = await axiosAuth.patch(`/sites/${identity}/`, formData); 
    return response?.data;
};