import axiosInstance from "./request";

export const getUserList = payload => {
    const url = `/user/find-page`;
    return axiosInstance.post(url, payload);
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

export const deleteCompany = payload => {
    const url = `/company/delete`;
    return axiosInstance.post(url, payload);
};
