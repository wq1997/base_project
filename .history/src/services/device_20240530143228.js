import axiosInstance from "./request";
import { jsonToUrlParams } from "@/utils/utils";
const { API_URL_1 } = process.env;

export const getDeviceList = payload => {
    const url = `${API_URL_1}/api/v1/device${jsonToUrlParams(payload)}`;
    return axiosInstance.get(url, payload);
};

export const getCommunicationStatus = () => {
    const url = `${API_URL_1}/api/v1/device/communicate-status`;
    return axiosInstance.get(url);
};

export const getDeviceType = () => {
    const url = `${API_URL_1}/api/v1/device/types`;
    return axiosInstance.get(url);
};

export const getPlantInfoById = id => {
    const url = `${API_URL_1}/api/v1/plant/${id}`;
    return axiosInstance.get(url);
};