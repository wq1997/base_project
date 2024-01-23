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
    const url = `/company/delete`;
    return axiosInstance.post(url, payload);
};

export const updateCompanyLevel = payload => {
    const url = `/company/update-level`;
    return axiosInstance.post(url, payload);
};

export const getAutoLevelInitData = () => {
    const url = "/company/get-level-auto-update-config-page-init-data";
    return axiosInstance.post(url);
};

export const updateAutoLevel = data => {
    const url = "/company/update-level-auto-update-config";
    return axiosInstance.post(url, data);
};
