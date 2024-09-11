import axiosInstance from "./request";
const { API_URL } = process.env;

export const workOrderList = payload => {
    const url = `${API_URL}/work-order/find-page`;
    return axiosInstance.post(url, payload);
};

export const workOrderList = payload => {
    const url = `${API_URL}/work-order/find-page`;
    return axiosInstance.post(url, payload);
};