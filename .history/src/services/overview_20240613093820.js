import axiosInstance from "./request";
import { jsonToUrlParams } from "@/utils/utils";
const { API_URL_1 } = process.env;

export const getPlanStatistics = plantId => {
    const url = `${API_URL_1}/api/v1/statistics/all/${plantId}`;
    return axiosInstance.get(url);
};

export const getPowerGeneration = payload => {
    const url = `${API_URL_1}/api/v1/device${jsonToUrlParams(payload)}`;
    return axiosInstance.get(url, payload);
};