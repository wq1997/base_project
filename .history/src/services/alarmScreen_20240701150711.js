import axiosInstance from "./request";
const { API_URL } = process.env;

export const getAlarmList = payload => {
    const url = `${API_URL}/web-api/dashboard/find-dc-alarm-page`;
    return axiosInstance.post(url, payload);
};


export const getAlarmInitData = () => {
    const url = `${API_URL}/web-api/dashboard/get-dc-alarms-dashboard-data`;
    return axiosInstance.get(url);
};
