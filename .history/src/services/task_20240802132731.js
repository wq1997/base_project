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

export const batchRefuseTask = payload => {
    const url = `${API_URL_2}/response-plan/refuse-resource-plan-batch`;
    return axiosInstance.post(url, payload);
};

export const singleConfirmTask = payload => {
    const url = `${API_URL_2}/response-plan/confirm-resource-plan`;
    return axiosInstance.post(url, payload);
};

export const singleRefuseTask = payload => {
    const url = `${API_URL_2}/response-plan/refuse-resource-plan`;
    return axiosInstance.post(url, payload);
};

export const getTaskDetail = id => {
    const url = `${API_URL_2}/response-plan/get-resource-plan-info?id=${id}&code=`;
    return axiosInstance.get(url);
};

export const getTaskDashboardById = parmasUrl => {
    const url = `${API_URL_2}/invite-task/get-invite-task-dashboard-vo?${parmasUrl}`;
    return axiosInstance.get(url);
};

export const getWaitTaskList = () => {
    const url = `${API_URL_2}/response-plan/find-wait-confirm-resource-plan-list`;
    return axiosInstance.get(url);
};
