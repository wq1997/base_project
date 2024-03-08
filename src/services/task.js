import axiosInstance from "./request";

const { API_URL_1, API_URL_2 } = process.env;

export const getTaskist = payload => {
    const url = `${API_URL_2}/invite-task/find-page`;
    return axiosInstance.post(url, payload);
};

export const getSearchInitData = () => {
    const url = `${API_URL_2}/invite-task/get-search-page-init-data`;
    return axiosInstance.get(url);
};

export const getWaitConfirmTasks = () => {
    const url = `${API_URL_2}/invite-task/get-wait-confirm-invite-task-dashboard-vo`;
    return axiosInstance.get(url);
};

export const confirmTask = payload => {
    const url = `${API_URL_2}/invite-task/confirm`;
    return axiosInstance.post(url, payload);
};

export const refuseTask = payload => {
    const url = `${API_URL_2}/invite-task/refuse`;
    return axiosInstance.post(url, payload);
};
