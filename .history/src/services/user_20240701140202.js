import axiosInstance from "./request";

export const login = payload => {
    const url = `${API_URL_1}/api/v1/user/login`;
    return axiosInstance.post(url, payload);
};
