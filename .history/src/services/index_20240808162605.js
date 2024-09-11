import axiosInstance from "./request";
const { API_URL } = process.env;

export const login = payload => {
    const url = `${API_URL}/user/login`;
    return axiosInstance.post(url, payload);
};

export const getUserist = payload => {
    const url = `${API_URL}/cpu-registration/find-page`;
    return axiosInstance.post(url, payload);
};

export const approve = payload => {
    const url = `${API_URL}/cpu-registration/approve`;
    return axiosInstance.post(url, payload);
};

export const approve = payload => {
    const url = `${API_URL}/cpu-registration/approve`;
    return axiosInstance.post(url, payload);
};
