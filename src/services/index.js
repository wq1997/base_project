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

export const getAllElectricExcel = (payload) => {
    return axiosInstance.post(`/minsys/revenue/exportElectricity`, payload, {responseType: 'blob'})
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

export const getFetchPlantList2 = (payload) => {
    return axiosInstance.post(`/energy/plant/getPlantList`, payload)
}

export const showDataByTable = (payload) => {
    return axiosInstance.post(`/minsys/revenue/showDataByTable`, payload)
}

export const getCurveType = (payload) => {
    return axiosInstance.get(`/minsys/curve/getCurveType`);
}

export const monitorCurve = (payload) => {
    return axiosInstance.post(`/minsys/curve/monitorCurve`, payload)
}

export const getUserInfo = () => {
    return axiosInstance.get(`minsys/all/getUserInfo`);
}

export const getAnalyticsInitData = (payload) => {
    return axiosInstance.get(`/minsys/analysis/getAnalyticsInitData`, { params: payload });
}

export const analyticsData = (payload) => {
    return axiosInstance.post(`/minsys/analysis/analyticsData`, payload)
}

export const get215HistoryAlarm = (payload) => {
    return axiosInstance.post(`/energy/get215HistoryAlarm`, payload);
}

export const get215NowAlarm = (payload) => {
    return axiosInstance.post(`/energy/get215NowAlarm`, payload);
}

export const exportCurve = (payload) => {
    return axiosInstance.post(`/minsys/curve/exportCurve`, payload, {responseType: 'blob'})
}

export const exportAnalytics = (payload) => {
    return axiosInstance.post(`/minsys/analysis/exportAnalytics`, payload, {responseType: 'blob'})
}