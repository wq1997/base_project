import axiosInstance from "./request";
const { API_URL } = process.env;

export const getDcDashboardData = () => {
    const url = `${API_URL}/web-api/dashboard/get-dc-dashboard-data`;
    return axiosInstance.get(url);
};
