import axiosInstance from "./request";         

const path = '/total'

export const getEnergyPowerStatisticsServe = () => {
    return axiosInstance.get(`${path}/getEnergyPowerStatistics`);
}

export const getEnergyWeeklyChargeDisChargeServe = () => {
    return axiosInstance.get(`${path}/getEnergyWeeklyChargeDisCharge`);
}

export const getLatestAlarmsServe = () => {
    return axiosInstance.get(`${path}/getLatestAlarms`);
}

export const getDtuStatisticsServe = () => {
    return axiosInstance.get(`${path}/getDtuStatistics`);
}

export const getGccPowerStatisticsServe = () => {
    return axiosInstance.get(`${path}/getGccPowerStatistics`);
}

export const getGccWeeklyPowerStatisticsServe = () => {
    return axiosInstance.get(`${path}/getGccWeeklyPowerStatistics`);
}

export const getGccWeeklyProfitServe = () => {
    return axiosInstance.get(`${path}/getGccWeeklyProfit`);
}