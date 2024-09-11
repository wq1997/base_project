import axiosInstance from "./request";
const { API_URL_1 } = process.env;

export const login = payload => {
    const url = `${API_URL_1}/user/login`;
    return axiosInstance.post(url, payload);
};

export const changePassword = payload => {
    const url = `${API_URL_1}/api/v1/user/modify/password`;
    return axiosInstance.put(url, payload);
};

export const changeUserInfo = payload => {
    const url = `${API_URL_1}/api/v1/user/modify/info`;
    return axiosInstance.put(url, payload);
};

export const getUserInfo = () => {
    const url = `${API_URL_1}/api/v1/user/current`;
    return axiosInstance.get(url);
};
