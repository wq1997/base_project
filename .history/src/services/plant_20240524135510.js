import axiosInstance from "./request";
const { API_URL_1 } = process.env;

export const getPlantList = payload => {
    const url = `${API_URL_1}/api/v1/plant`;
    return axiosInstance.get(url, payload);
};

export const getPlantType =  => {
    const url = `${API_URL_1}/api/v1/plant/types`;
    return axiosInstance.get(url);
};
