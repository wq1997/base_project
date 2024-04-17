import axiosInstance from "./request";
const { API_URL_1, API_URL_2 } = process.env;

export const getUploadUpdateInitData = id => {
    const url = `${API_URL_1}/scene/get-scene-init-data/${id || ""}`;
    return axiosInstance.post(id ? url+'/${id}');
};

export const save = payload => {
    const url = `/file/upload`;
    return axiosInstance.post(url, payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const login = payload => {
    const url = `${API_URL_1}/user/login`;
    return axiosInstance.post(url, payload);
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
