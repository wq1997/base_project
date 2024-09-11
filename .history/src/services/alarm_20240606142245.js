import axiosInstance from "./request";
import { jsonToUrlParams } from "@/utils/utils";
const { API_URL_1 } = process.env;

export const getAlarmList = payload => {
    const url = `${API_URL_1}/api/v1/alarm/event${jsonToUrlParams(payload)}`;
    return axiosInstance.get(url, payload);
};

export const getAlarmLevel = () => {
    const url = `${API_URL_1}/api/v1/alarm/levels`;
    return axiosInstance.get(url);
};

export const getAlarmInfo = id => {
    const url = `${API_URL_1}/api/v1/alarm/event/${id}`;
    return axiosInstance.get(url);
};

export const getAlarmInfo = id => {
    const url = `${API_URL_1}/api/v1/alarm/event/${id}`;
    return axiosInstance.get(url);
};
