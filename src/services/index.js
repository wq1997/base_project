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

export const getDtuDetailInfo = (payload) => {
    return axiosInstance.get(`/minsys/dtu/dtuDetailInfo`, { params: payload })
}

export const getBurCmdHistory2 = (payload) => {
    return axiosInstance.get(`/minsys/strategy/getStrategyData`, { params: payload })
}

export const verifyPassword = (payload) => {
    return axiosInstance.get(`/minsys/strategy/verifyPassword`, { params: payload });
}

export const sendPCSSetting = (payload) => {
    return axiosInstance.post(`/minsys/strategy/sendPCSSetting`, payload);
}

export const sendBMSSetting = (payload) => {
    return axiosInstance.post(`/minsys/strategy/sendBMSSetting`, payload);
}

export const sendPCSPower = (payload) => {
    return axiosInstance.post(`/minsys/strategy/sendPCSPower`, payload);
}

export const sendParamSetting = (payload) => {
    return axiosInstance.post(`/minsys/strategy/sendParamSetting`, payload);
}

export const sendStrategySelect = (payload) => {
    return axiosInstance.post(`/minsys/strategy/sendStrategySelect`, payload);
}

export const sendDehumidifier = (payload) => {
    return axiosInstance.post(`/minsys/strategy/sendDehumidifier`, payload);
}

export const sendLiquidCooler = (payload) => {
    return axiosInstance.post(`/minsys/strategy/sendLiquidCooler`, payload);
}

export const switchModes = (payload) => {
    return axiosInstance.post(`/minsys/strategy/switchModes`, payload);
}

export const sendStrategySetting = (payload) => {
    return axiosInstance.post(`/minsys/strategy/sendStrategySetting`, payload);
}

export const updateData = (payload) => {
    return axiosInstance.get(`/minsys/strategy/updateData`, { params: payload })
}