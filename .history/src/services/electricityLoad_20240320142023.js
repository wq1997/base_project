import axiosInstance from "./request";
const { API_URL_3 } = process.env;

export const getCompanyBaseLine = payload => {
    const url = `${API_URL_3}/invite/get-company-base-line-dashboard-data`;
    return axiosInstance.post(url, payload);
};
