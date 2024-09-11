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

// 转办
export const transferWorkOrder = payload => {
    const url = `${API_URL}/work-order/transfer`;
    return axiosInstance.post(url, payload);
};

// 手工工单，其他工单处理
export const processOtherWorkOrder = payload => {
    const url = `${API_URL}/work-order/other-work-order-processing`;
    return axiosInstance.post(url, payload);
};

// 异常工单处理
export const processExceptionWorkOrder = payload => {
    const url = `${API_URL}/work-order/exception-work-order-processing`;
    return axiosInstance.post(url, payload);
};

export const exceptionWorkOrderProcessInitData = id => {
    const url = `${API_URL}/work-order/get-exception-work-order-processing-page-init-data?id=${id}`;
    return axiosInstance.get(url);
};

// 实施工单处理 processDeliveryStageWorkOrder,processDebuggingStageWorkOrder
export const processDeliveryStageWorkOrder = payload => {
    const url = `${API_URL}/work-order/upload-shipping-material`;
    return axiosInstance.post(url, payload);
};

export const processDebuggingStageWorkOrder = payload => {
    const url = `${API_URL}/work-order/upload-testing-material`;
    return axiosInstance.post(url, payload);
};

export const processRunningStageWorkOrder = payload => {
    const url = `${API_URL}/work-order/upload-trial-run-material`;
    return axiosInstance.post(url, payload);
};
