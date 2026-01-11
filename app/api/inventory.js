export const createInventory = async (formData,axiosAuth) => {
    const response = await axiosAuth.post(`/inventory/`, formData);
    return response?.data;
};

export const getInventories = async (axiosAuth) => {
    const response = await axiosAuth.get(`/inventory/`);
    return response?.data?.results;
};

export const updateInventory = async (identity, formData, axiosAuth) => {
    const response = await axiosAuth.patch(`/inventory/${identity}/`, formData); 
    return response?.data;
};

// create layer
export const createLayer = async (formData,axiosAuth) => {
    const response = await axiosAuth.post(`/layers/`, formData);
    return response?.data;
};

// create layer
export const createSubLayer = async (formData,axiosAuth) => {
    const response = await axiosAuth.post(`/sublayers/`, formData);
    return response?.data;
};

// layers
export const getLayers = async (axiosAuth) => {
    const response = await axiosAuth.get(`/layers/`);
    return response?.data?.results;
};
// sublayers
export const getSubLayers = async (axiosAuth) => {
    const response = await axiosAuth.get(`/sublayers/`);
    return response?.data?.results;
};

// create layer
export const createSubLayerItem = async (formData,axiosAuth) => {
    const response = await axiosAuth.post(`/sublayeritems/`, formData);
    return response?.data;
};
// sublayer items
export const getSubLayerItems = async (axiosAuth) => {
    const response = await axiosAuth.get(`/sublayeritems/`);
    return response?.data?.results;
};