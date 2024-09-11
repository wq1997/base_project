import axiosInstance from "./request";
const { API_URL } = process.env;

export const alarm = payload => {
    const url = `${API_URL}/web-api/open/login`;
    return axiosInstance.post(url, payload);
};
