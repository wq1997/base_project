import axiosInstance from "./request";
import { jsonToUrlParams } from "@/utils/utils";

export const getCompanyList = payload => {
    const url = `/company/find-page`;
    return axiosInstance.post(url, payload);
};

export const getUpdateInitData = id => {
    let url = "/company/get-edit-page-init-data";
    if (id) {
        url = jsonToUrlParams({
            id,
        });
    }
    return axiosInstance.get(url);
};

export const getCityByProvince = province => {
    const url = `/other/list-cities-by-province?province=${province}`;
    return axiosInstance.get(url);
};

export const updateCompany = payload => {
    const url = `/company/save-or-update`;
    return axiosInstance.post(url, payload);
};
