import axiosInstance from "./request";
const { API_URL_1 } = process.env;

export const login = payload => {
    const url = `${API_URL_1}/user/login`;
    return axiosInstance.post(url, payload);
};
