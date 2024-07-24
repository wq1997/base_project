import axiosInstance from "./request";
const { API_URL } = process.env;

export const getDcDashboardData = () => {
    const url = `${API_URL}/dashboard/get-dc-dashboard-data`;
    return axiosInstance.get(url);
};
