import axiosInstance from "./request";
const { API_URL } = process.env;

export const login = payload => {
    const url = `${API_URL}/open/login`;
    return axiosInstance.post(url, payload);
};

// 账号
export const getAccountList = payload => {
    const url = `${API_URL}/user/find-page`;
    return axiosInstance.post(url, payload);
};

export const getAccountSearchIndexData = () => {
    const url = `${API_URL}/user/get-search-page-init-data`;
    return axiosInstance.get(url);
};

export const getAccountUpdateIndexData = id => {
    const url = `${API_URL}/user/get-edit-page-init-data?id=${id}`;
    return axiosInstance.get(url);
};

export const updateAccount = payload => {
    const url = `${API_URL}/user/save-or-update`;
    return axiosInstance.post(url, payload);
};

export const unBindWx = ids => {
    const url = `${API_URL}//web-api/user/unbind`;
    return axiosInstance.post(url, ids);
};

// 角色
export const getRoleList = payload => {
    const url = `${API_URL}/role/find-page`;
    return axiosInstance.post(url, payload);
};

export const updateRole = payload => {
    const url = `${API_URL}/role/save-or-update`;
    return axiosInstance.post(url, payload);
};

export const getRolePerms = () => {
    const url = `${API_URL}/role/get-perm-for-edit`;
    return axiosInstance.get(url);
};

export const deleteRole = ids => {
    const url = `${API_URL}/role/delete`;
    return axiosInstance.post(url, ids);
};
