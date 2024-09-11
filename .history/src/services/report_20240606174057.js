import axiosInstance from "./request";
import { jsonToUrlParams } from "@/utils/utils";
const { API_URL_1 } = process.env;

export const getPlantReport = payload => {
    const url = `${API_URL_1}/api/v1/audit${jsonToUrlParams(payload)}`;
    return axiosInstance.get(url, payload);
};
