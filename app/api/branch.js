export const createBranch = async (formData,axiosAuth) => {
    const response = await axiosAuth.post(`/branches/`, formData);
    return response?.data;
};

export const getBranches = async (axiosAuth) => {
    const response = await axiosAuth.get(`/branches/`);
    return response?.data?.results;
};

export const updateBranchInfo = async (identity, formData, axiosAuth) => {
    const response = await axiosAuth.patch(`/branches/${identity}/`, formData); 
    return response?.data;
};