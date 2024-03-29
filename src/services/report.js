import axiosInstance from "./request";
const path = '/microgrid'

// 获取电量统计 和收益
export const getEnergyFeeByTime = (payload) => {
    return axiosInstance.post(`${path}/getEnergyFeeByTime`, payload);
}
// 获取收益比列图
export const getEarningsDistribution = (payload) => {
    return axiosInstance.post(`${path}/getEarningsDistribution`, payload);
}
// 获取收益比列图
export const getReportList = (payload) => {
    return axiosInstance.post(`${path}/report/getReportList`, payload);
}