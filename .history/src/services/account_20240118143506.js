import axiosInstance from "./request";

export const getUserList = payload => {
    const url = `/user/find-page`;
    return axiosInstance.post(url, payload);
};

export const getSearchInitData = id => {
    const url = "/user/get-search-page-init-data";
    return axiosInstance.get(url);
};

export const getUpdateInitData = id => {
    let url = "/company/get-edit-page-init-data";
    if (id) {
        url = `${url}?id=${id}`;
    }
    return axiosInstance.get(url);
};

export const getCityByProvince = province => {
    const url = `/other/list-cities-by-province?province=${province}`;
    return axiosInstance.get(url);
};

export const updateCompany = payload => {
    const url = `/company/save-or-update`;
    return axiosInstance.post(url, payload);
};

export const deleteUser = payload => {
    const url = `/user/delete`;
    return axiosInstance.post(url, payload);
};
