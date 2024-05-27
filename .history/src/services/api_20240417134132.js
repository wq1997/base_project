import axiosInstance from "./request";
const { API_URL_1, API_URL_2 } = process.env;

export const login = payload => {
    const url = `${API_URL_1}/user/login`;
    return axiosInstance.post(url, payload);
};

export const getPublicKey = () => {
    return axiosInstance.get(`${API_URL_1}/open/get-pub-key`);
};

export const getUploadFilesInitData = id => {
    const url = `${API_URL_1}/scene/get-scene-init-data`;
    return axiosInstance.get(id ? url + `/${id}` : url);
};

export const getUploadFilesList = payload => {
    const url = `${API_URL_1}/scene/find-page`;
    return axiosInstance.post(url, payload);
};

export const saveUploadFiles = payload => {
    const url = `/scene/upload`;
    return axiosInstance.post(url, payload, {
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
    });
};

 