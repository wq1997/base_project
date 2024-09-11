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
    const url = `${API_URL}/work-order/get-edit-page-init-data`;
    return axiosInstance.get(url);
};

export const deleteWorkOrder = payload => {
    const url = `${API_URL}/work-order/delete`;
    return axiosInstance.post(url, {
        ids: payload,
    });
};

export const workOrderInfo = id => {
    const url = `${API_URL}/work-order/get-info?id=${id}`;
    return axiosInstance.get(url);
};

// 手工工单处理
export const workOrderList = payload => {
    const url = `${API_URL}/work-order/other-work-order-processing`;
    return axiosInstance.post(url, payload);
};