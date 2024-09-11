import axiosInstance from "./request";

const { API_URL_1, API_URL_2 } = process.env;

export const getTaskist = payload => {
    const url = `${API_URL_2}/response-plan/find-resource-plan-page`;
    return axiosInstance.post(url, payload);
};

export const getSearchInitData = () => {
    const url = `${API_URL_2}/response-plan/get-search-page-init-data`;
    return axiosInstance.get(url);
};

export const getWaitConfirmTasks = () => {
    const url = `${API_URL_2}/invite-task/get-wait-confirm-invite-task-dashboard-vo`;
    return axiosInstance.get(url);
};

export const batchConfirmTask = payload => {
    const url = `${API_URL_2}/response-plan/confirm-resource-plan-batch`;
    return axiosInstance.post(url, payload);
};

export const refuseTask = payload => {
    const url = `${API_URL_2}/response-plan/refuse-resource-plan-batch`;
    return axiosInstance.post(url, payload);
};

export const getTaskDetail = id => {
    const url = `${API_URL_2}/response-plan/get-resource-plan-info?${id}`;
    return axiosInstance.get(url);
};

export const getTaskDashboardById = parmasUrl => {
    const url = `${API_URL_2}/invite-task/get-invite-task-dashboard-vo?${parmasUrl}`;
    return axiosInstance.get(url);
};

export const getWaitTaskDashboard = () => {
    const url = `${API_URL_2}/invite-task/get-wait-confirm-invite-task-dashboard-vo`;
    return axiosInstance.get(url);
};
