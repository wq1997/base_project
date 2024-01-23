import axiosInstance from "./request";

const { API_URL_1, API_URL_2 } = process.env;

export const getInviteList = payload => {
    const url = `${API_URL_1}/invite/find-page`;
    return axiosInstance.post(url, payload);
};

export const getSearchInitData = () => {
    const url = `${API_URL_1}/user/get-search-page-init-data`;
    return axiosInstance.get(url);
};

export const getUpdateInitData = id => {
    let url = `${API_URL_1}/user/get-edit-page-init-data`;
    if (id) {
        url = `${url}?id=${id}`;
    }
    return axiosInstance.get(url);
};

export const updateUser = payload => {
    const url = `${API_URL_1}/user/save-or-update`;
    return axiosInstance.post(url, payload);
};

export const deleteUser = payload => {
    const url = `${API_URL_1}/user/delete`;
    return axiosInstance.post(url, payload);
};
