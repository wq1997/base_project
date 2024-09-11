import axiosInstance from "./request";
const { API_URL } = process.env;

export const workOrderList = payload => {
    const url = `${API_URL}/work-order/find-page`;
    return axiosInstance.post(url, payload);
};

export const workOrderListInitData = () => {
    const url = `${API_URL}/work-order/get-search-page-init-data`;
    return axiosInstance.get(url);
};

export const updateWorkOrder = payload => {
    const url = `${API_URL}/work-order/save-or-update`;
    return axiosInstance.post(url, payload);
};

export const updateWorkOrderInitData = () => {
    const url = `${API_URL}/web-api/work-order/get-edit-page-init-data`;
    return axiosInstance.get(url);
};