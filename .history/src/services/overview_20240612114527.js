import axiosInstance from "./request";
import { jsonToUrlParams } from "@/utils/utils";
const { API_URL_1 } = process.env;

export const getPlantReportList = plantId => {
    const url = `${API_URL_1}/api/v1/statistics/all/${plantId}`;
    return axiosInstance.get(url);
};
