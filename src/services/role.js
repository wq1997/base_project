import axiosInstance from "./request";
const { API_URL_1 } = process.env;

export const getRoles = () => {
    const url = `${API_URL_1}/api/v1/role`;
    return axiosInstance.get(url);
};

export const getRoleNames   = () => {
    const url = `${API_URL_1}/api/v1/role/names`;
    return axiosInstance.get(url);
};
