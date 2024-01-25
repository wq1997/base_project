import axiosInstance from "./request";

const { API_URL_1, API_URL_2 } = process.env;

export const getInviteList = payload => {
    const url = `${API_URL_2}/invite/find-page`;
    return axiosInstance.post(url, payload);
};

export const getSearchInitData = () => {
    const url = `${API_URL_2}/invite/get-search-page-init-data`;
    return axiosInstance.get(url);
};

export const saveEnterRecord = payload => {
    const url = `${API_URL_2}/invite/save`;
    return axiosInstance.post(url, payload);
};

export const deleteInvite = payload => {
    const url = `${API_URL_2}/invite/delete`;
    return axiosInstance.post(url, payload);
};

export const invalidInvite = payload => {
    const url = `${API_URL_2}/invite/invalid`;
    return axiosInstance.post(url, payload);
};
