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

export const getDeviceTypeByDtuId = (payload) => {
    return axiosInstance.get(`/minsys/dtu/getDeviceTypeByDtuId`, { params: payload })
}

export const getDtuOverViews = (payload) => {
    return axiosInstance.get(`/minsys/dtu/dtuOverView`, { params: payload })
}

export const getAllRevenueExcel = (payload) => {
    return axiosInstance.post(`/minsys/revenue/exportRevenue`, payload, {responseType: 'blob'})
}