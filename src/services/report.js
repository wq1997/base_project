import axiosInstance from "./request";
const path = '/total'

// 获取电量统计 和收益
export const getEnergyFeeByTime = (payload) => {
    return axiosInstance.post(`${path}/getEnergyFeeByTime`, payload);
}