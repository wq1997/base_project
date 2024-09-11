import axiosInstance from "./request";
import { jsonToUrlParams } from "@/utils/utils";
const { API_URL_1 } = process.env;

export const getDeviceList = payload => {
    const url = `${API_URL_1}/api/v1/plant${jsonToUrlParams(payload)}`;
    return axiosInstance.get(url, payload);
};

export const getcommunicateStatus = () => {
    const url = `${API_URL_1}/api/v1/device/communicate-status`;
    return axiosInstance.get(url);
};
 
