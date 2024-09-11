import axiosInstance from "./request";
const { API_URL_1 } = process.env;

export const getOperateLog = () => {
    const url = `${API_URL_1}/api/v1/audit`;
    return axiosInstance.post(url);
};
