import axiosInstance from "./request";

export const getUserList = payload => {
    const url = `/auth/user/find-page`;
    return axiosInstance.post(url, payload);
};

export const getSearchInitData = () => {
    const url = "/user/get-search-page-init-data";
    return axiosInstance.get(url);
};

export const getUpdateInitData = id => {
    let url = "/user/get-edit-page-init-data";
    if (id) {
        url = `${url}?id=${id}`;
    }
    return axiosInstance.get(url);
};

export const updateUser = payload => {
    const url = `/user/save-or-update`;
    return axiosInstance.post(url, payload);
};

export const deleteUser = payload => {
    const url = `/user/delete`;
    return axiosInstance.post(url, payload);
};
