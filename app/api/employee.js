export const createEmployee = async (formData,axiosAuth) => {
    const response = await axiosAuth.post(`/auth/add/employee/`, formData);
    return response?.data;
};

export const getEmployees = async (axiosAuth) => {
    const response = await axiosAuth.get(`/employees/`);
    return response?.data?.results;
};

export const updateBranchInfo = async (identity, formData, axiosAuth) => {
    const response = await axiosAuth.patch(`/branches/${identity}/`, formData); 
    return response?.data;
};