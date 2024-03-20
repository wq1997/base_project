import axiosInstance from "./request";
import { jsonToUrlParams } from "@/utils/utils";
const { API_URL_1, API_URL_2 } = process.env;
export const getCompanyList = payload => {
    const url = `${API_URL_1}/company/find-page`;
    return axiosInstance.post(url, payload);
};

export const getUpdateInitData = id => {
    let url = `${API_URL_1}/company/get-edit-page-init-data`;
    if (id) {
        url = `${url}?id=${id}`;
    }
    return axiosInstance.get(url);
};

export const getCityByProvince = province => {
    const url = `${API_URL_1}/other/list-cities-by-province?province=${province}`;
    return axiosInstance.get(url);
};

export const updateCompany = payload => {
    const url = `${API_URL_1}/company/save-or-update`;
    return axiosInstance.post(url, payload);
};

export const deleteCompany = payload => {
    const url = `${API_URL_1}/company/delete`;
    return axiosInstance.post(url, payload);
};

export const getLevelList = data => {
    const url = `${API_URL_1}/company/find-level-detail-page`;
    return axiosInstance.post(url, data);
};

export const getLevelSearchInitData = data => {
    const url = `${API_URL_1}/company/get-level-detail-search-page-init-data`;
    return axiosInstance.get(url, data);
};

export const updateCompanyLevel = payload => {
    const url = `${API_URL_1}/company/update-level`;
    return axiosInstance.post(url, payload);
};

export const getAutoLevelInitData = () => {
    const url = `${API_URL_1}/company/get-level-auto-update-config-page-init-data`;
    return axiosInstance.post(url);
};

export const updateAutoLevel = data => {
    const url = `${API_URL_1}/company/update-level-auto-update-config`;
    return axiosInstance.post(url, data);
};

export const getCompanyBaseLine = payload => {
    const url = `${API_URL_2}/invite/get-company-base-line-dashboard-data${jsonToUrlParams()}`;
    return axiosInstance.post(url, payload);
};
