export const getCompanyInfo = async (axiosAuth) => {
    const response = await axiosAuth.get(`/companies/my/`);
    return response?.data?.results[0];
  };

export const updateCompanyInfo = async (identity, formData, axiosAuth) => {
    const response = await axiosAuth.patch(`/companies/${identity}/`, formData); 
    return response?.data;
};