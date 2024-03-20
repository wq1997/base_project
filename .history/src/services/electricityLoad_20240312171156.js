import axiosInstance from "./request";
import { jsonToUrlParams } from "@/utils/utils";
const { API_URL_1, API_URL_2 } = process.env;

export const getCompanyList = payload => {
    const url = `${API_URL_2}/company/find-page`;
    return axiosInstance.post(url, payload);
};

 