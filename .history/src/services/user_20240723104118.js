import axiosInstance from "./request";
const { API_URL } = process.env;

export const login = payload => {
    const url = `${API_URL}/web-api/open/login`;
    return axiosInstance.post(url, payload);
};



export const login = payload => {
    const url = `${API_URL}/web-api/open/login`;
    return axiosInstance.post(url, payload);
};