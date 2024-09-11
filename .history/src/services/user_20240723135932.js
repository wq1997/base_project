import axiosInstance from "./request";
const { API_URL } = process.env;

export const login = payload => {
    const url = `${API_URL}/open/login`;
    return axiosInstance.post(url, payload);
};

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
    return axiosInstance.post(url,);
};
