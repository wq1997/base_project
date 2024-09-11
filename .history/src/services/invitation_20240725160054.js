import axiosInstance from "./request";

const { API_URL_1, API_URL_2 } = process.env;

export const getInviteList = payload => {
    const url = `${API_URL_2}/invitation/find-page`;
    return axiosInstance.post(url, payload);
};

export const getSearchInitData = () => {
    const url = `${API_URL_2}/invitation/get-search-page-init-data`;
    return axiosInstance.get(url);
};

export const saveEnterRecord = payload => {
    const url = `${API_URL_2}/invitation/save`;
    return axiosInstance.post(url, payload);
};

export const sureInvite = payload => {
    const url = `${API_URL_2}/invitation/confirm`;
    return axiosInstance.post(url, payload);
};

export const deleteInvite = payload => {
    const url = `${API_URL_2}/invitation/delete`;
    return axiosInstance.post(url, payload);
};

export const invalidInvite = payload => {
    const url = `${API_URL_2}/invitation/invalid`;
    return axiosInstance.post(url, payload);
};

export const getSplitInviteInitData = id => {
    const url = `${API_URL_2}/invitation/get-split-page-init-data?invitationId=${encodeURIComponent(id)}`;
    return axiosInstance.get(url);
};

export const intellectSplitInvite = id => {
    const url = `${API_URL_2}/invitation/get-split-suggest?id=${id}`;
    return axiosInstance.get(url);
};

export const getInviteDetail = id => {
    const url = `${API_URL_2}/invitation/get-info?id=${id}`;
    return axiosInstance.get(url);
};

export const saveSplitInvite = payload => {
    const url = `${API_URL_2}/invitation/save-split-result`;
    return axiosInstance.post(url, payload);
};
