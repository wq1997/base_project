import axiosInstance from "./request";
const { API_URL } = process.env;

export const getDcDashboardData = (isHaiwai) => {
    const url = `${API_URL}/dashboard/get-dc-dashboard-data?isHaiwai=${isHaiwai}`;
    return axiosInstance.get(url);
};
