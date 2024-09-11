import axiosInstance from "./request";
import { jsonToUrlParams } from "@/utils/utils";
const { API_URL_1 } = process.env;

export const getPlantReportList = payload => {
    const url = `${API_URL_1}/api/v1/statistics/all/${ }`;
    return axiosInstance.get(url, payload);
};

