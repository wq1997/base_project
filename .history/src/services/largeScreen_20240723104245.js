import axiosInstance from "./request";
const { API_URL } = process.env;

export const getAlarmScreenList = payload => {
    const url = `${API_URL}/dashboard/find-dc-alarm-page`;
    return axiosInstance.post(url, payload);
};

export const getAlarmScreenData = () => {
    const url = `${API_URL}/dashboard/get-dc-alarms-dashboard-data`;
    return axiosInstance.get(url);
};

export const getNetScreenData = () => {
    const url = `${API_URL}/dashboard/get-ywc-dashboard-data`;
    return axiosInstance.get(url);
};

export const getPlantAccessInfo = plantId => {
    const url = `${API_URL}/web-api/dashboard/get-plant-access-info?plantId=${plantId}`;
    return axiosInstance.get(url);
};

export const jumpLogin = payload => {
    const url = `${payload?.url}`;
    return axiosInstance.post(url, payload);
};
