import axiosInstance from "./request";
const { API_URL } = process.env;
const URL = API_URL == "http://47.110.124.86:8765" ? `${API_URL}/bdt` : API_URL;

export const login = payload => {
    const url = `${URL}/user/login`;
    return axiosInstance.post(url, payload);
};

export const register = payload => {
    const url = `${URL}/cpu-registration/register`;
    return axiosInstance.post(url, payload);
};

export const getUserist = payload => {
    const url = `${URL}/cpu-registration/find-page`;
    return axiosInstance.post(url, payload);
};

export const handleApprove = payload => {
    const url = `${URL}/cpu-registration/approve`;
    return axiosInstance.post(url, payload);
};

export const handleDelete = id => {
    const url = `${URL}/cpu-registration/delete/${id}`;
    return axiosInstance.delete(url);
};
