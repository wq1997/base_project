import axiosInstance from "./request";
const { API_URL } = process.env;

export const getWorkOrderList = payload => {
    const url = `${API_URL}/web-api/work-order/find-page`;
    return axiosInstance.post(url, payload);
};

