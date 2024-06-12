import axiosInstance from "./request";
import { jsonToUrlParams } from "@/utils/utils";
const { API_URL_1 } = process.env;

export const getSignalChart = payload => {
    const url = `${API_URL_1}/api/v1/statistics/dailyChart`;
    return axiosInstance.post(url, payload);
};