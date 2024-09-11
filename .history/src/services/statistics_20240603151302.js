import axiosInstance from "./request";
import { jsonToUrlParams } from "@/utils/utils";
const { API_URL_1 } = process.env;

export const getSignalChart = stringCount => {
    const url = `${API_URL_1}/api/v1/statistics/dailyChart/${stringCount}`;
    return axiosInstance.get(url);
};

export const getSignalChart = payload => {
    const url = `${API_URL_1}/api/v1/statistics/dailyChart${payload?.id}`;
    return axiosInstance.get(url, payload);
};
