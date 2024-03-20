import axiosInstance from "./request";

const { API_URL_1, API_URL_2 } = process.env;

export const getPermissionTree = ()=>{
    return axiosInstance.get(`${API_URL_1}/role/get-perm-for-edit`);
}

export const addRole = (payload) => {
    return axiosInstance.post(`${API_URL_1}/role/save-or-update`, payload)
}

export const getRoleList = (payload) => {
    return axiosInstance.post(`${API_URL_1}/role/find-page`, payload)
}

export const deleteRole = (payload) => {
    return axiosInstance.post(`${API_URL_1}/role/delete`, payload)
}

export const getOperationLog = (payload) => {
    return axiosInstance.post(`${API_URL_1}/operation-log/find-page`, payload)
}

export const getNotificationList = (payload) => {
    return axiosInstance.post(`${API_URL_2}/notification/find-page`, payload)
}