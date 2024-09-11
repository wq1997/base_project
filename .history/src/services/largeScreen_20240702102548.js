import axiosInstance from "./request";
const { API_URL } = process.env;

export const getAlarmScreenList = payload => {
    const url = `${API_URL}/web-api/dashboard/find-dc-alarm-page`;
    return axiosInstance.post(url, payload);
};

export const getAlarmScreenInitData = () => {
    const url = `${API_URL}/web-api/dashboard/get-dc-alarms-dashboard-data`;
    return axiosInstance.get(url);
};

export const getNetScreenInitData = () => {
    const url = `${API_URL}/web-api/dashboard/get-dc-alarms-dashboard-data`;
    return axiosInstance.get(url);
};