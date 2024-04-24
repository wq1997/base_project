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
    return axiosInstance.post(url, payload);
};

export const getAnalysisResultsList = payload => {
    const url = `${API_URL_1}/scene/find-parse-result-page`;
    return axiosInstance.post(url, payload);
};

export const getAnalysisResultsInfo = id => {
    const url = `${API_URL_1}/scene/get-exception-info/${id}`;
    return axiosInstance.get(url);
};

export const getExceptionData = id => {
    const url = `${API_URL_1}/exception-scene/get-info/${id}`;
    return axiosInstance.get(url);
};
// export const save = ({ brandCode, project, file }) =>
//     axiosInstance.request({
//         url: `/file/upload`,
//         method: "post",
//         data: file,
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//     });

export const sceneGetTotalRecord = payload => {
    const url = `${API_URL_1}/scene/get-total-record`;
    return axiosInstance.post(url, payload);
};
