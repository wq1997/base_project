import axiosInstance from "./request";
import { jsonToUrlParams } from "@/utils/utils";
const { API_URL_1, API_URL_3 } = process.env;

export const getCompanyBaseLine = payload => {
    const url = `${API_URL_3}/electrical-load/get-company-base-line-dashboard-data`;
    return axiosInstance.post(url, payload);
};

 