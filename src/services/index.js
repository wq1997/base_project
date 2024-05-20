import axiosInstance from "./request";

export const getAllDevices = () => {
    return axiosInstance.get('/energy/dtu/getAllDevicesByDtuId');
}

export const getRevenue = (payload) => {
    return axiosInstance.post(`/minsys/revenue/getRevenueByKey`, payload);
}

export const getAllRevenue = (payload) => {
    return axiosInstance.get(`/minsys/revenue/getPlantRevenue`, { params: payload })
}