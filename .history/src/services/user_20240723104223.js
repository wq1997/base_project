import axiosInstance from "./request";
const { API_URL } = process.env;

export const login = payload => {
    const url = `${API_URL}/open/login`;
    return axiosInstance.post(url, payload);
};


export const getRoleList = payload => {
    const url = `${API_URL}/web-api/role/find-page`;
    return axiosInstance.post(url, payload);
};