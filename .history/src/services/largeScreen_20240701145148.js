import axiosInstance from "./request";
const { API_URL } = process.env;

export const alarmList = payload => {
    const url = `${API_URL}/web-api/dashboard/find-dc-alarm-page`;
    return axiosInstance.post(url, payload);
};
