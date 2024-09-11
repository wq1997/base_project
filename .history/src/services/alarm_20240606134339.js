import axiosInstance from "./request";
import { jsonToUrlParams } from "@/utils/utils";
const { API_URL_1 } = process.env;

export const getAlarmList = payload => {
    const url = `${API_URL_1}/api/v1/alarm/event${jsonToUrlParams(payload)}`;
    return axiosInstance.get(url, payload);
};

export const getDeviceType = () => {
    const url = `${API_URL_1}/api/v1/device/types`;
    return axiosInstance.get(url);
};

 