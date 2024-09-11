import axiosInstance from "./request";

export const login = payload => {
    const url = `${API_URL_1}//web-api/open/login`;
    return axiosInstance.post(url, payload);
};
