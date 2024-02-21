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