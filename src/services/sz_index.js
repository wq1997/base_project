import axiosInstance from "./request";

const { API_URL_1 } = process.env;

export const getStationList = payload => {
    const url = `${API_URL_1}/load-resource/find-page`;
    return axiosInstance.post(url, payload);
};
 
export const deleteStation = payload => {
    const url = `${API_URL_1}/load-resource/delete`;
    return axiosInstance.post(url, payload);
};

export const getCompanyList = payload => {
    const url = `${API_URL_1}/company/find-page`;
    return axiosInstance.post(url, payload);
};

export const deleteCompany = payload => {
    const url = `${API_URL_1}/company/delete`;
    return axiosInstance.post(url, payload);
};

export const getUpdateInitData = payload => {
    const url = `${API_URL_1}/company/get-edit-page-init-data`;
    return axiosInstance.get(url, { params: payload });
};

export const getStationUpdateInitData = payload => {
    const url = `${API_URL_1}/load-resource/get-edit-page-init-data`;
    return axiosInstance.get(url, { params: payload });
};

export const updateCompany = payload => {
    const url = `${API_URL_1}/company/save-or-update`;
    return axiosInstance.post(url, payload);
};

export const updateStation = payload => {
    const url = `${API_URL_1}/load-resource/save-or-update`;
    return axiosInstance.post(url, payload);
};

export const getEditPageInitData = () => {
    const url = `${API_URL_1}/load-resource/get-search-page-init-data`;
    return axiosInstance.get(url);
}

export const getCityByProvince = (payload) => {
    const url = `${API_URL_1}/other/list-cities-by-province`;
    return axiosInstance.get(url, { params: payload });
}