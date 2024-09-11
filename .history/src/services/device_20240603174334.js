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

export const getDeviceModel = () => {
    const url = `${API_URL_1}/api/v1/device/model`;
    return axiosInstance.get(url);
};

export const x = id => {
    const url = `${API_URL_1}/api/v1/device/${id}`;
    return axiosInstance.get(url);
};

export const saveDevice = payload => {
    const url = `${API_URL_1}/api/v1/device/add`;
    return axiosInstance.post(url, payload);
};

export const updateDevice = payload => {
    const url = `${API_URL_1}/api/v1/device/${payload?.id}`;
    return axiosInstance.put(url, payload);
};

export const deleteDevice = id => {
    const url = `${API_URL_1}/api/v1/device/${id}`;
    return axiosInstance.delete(url);
};

export const getSignalPoint = stringCount => {
    const url = `${API_URL_1}/api/v1/device/signalPoint/types${stringCount}`;
    return axiosInstance.get(url);
};
