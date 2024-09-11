import axiosInstance from "./request";
const { API_URL } = process.env;

export const getAlarmScreenList = payload => {
    const url = `${API_URL}/web-api/dashboard/find-dc-alarm-page`;
    return axiosInstance.post(url, payload);
};

export const getAlarmScreenData = () => {
    const url = `${API_URL}/web-api/dashboard/get-dc-alarms-dashboard-data`;
    return axiosInstance.get(url);
};

export const getNetScreenData = () => {
    const url = `${API_URL}/web-api/dashboard/get-ywc-dashboard-data`;
    return axiosInstance.get(url);
};

export const getPlantAxxessInfo = () => {
    const url = `${API_URL}/web-api/dashboard/get-ywc-dashboard-data`;
    return axiosInstance.get(url);
};

