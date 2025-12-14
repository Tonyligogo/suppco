export const createRole = async (formData,axiosAuth) => {
    const response = await axiosAuth.post(`/roles/`, formData);
    return response?.data;
};

export const getRoles = async (axiosAuth) => {
    const response = await axiosAuth.get(`/roles/`);
    return response?.data?.results;
}

export const getPermissions = async (axiosAuth) => {
    const response = await axiosAuth.get(`/permissions/`);
    return response?.data?.results;
}

// admin role
export const createPermission = async (formData,axiosAuth) => {
    const response = await axiosAuth.post(`/permissions/`, formData);
    return response?.data;
};