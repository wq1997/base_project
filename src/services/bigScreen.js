import axiosInstance from "./request";         

const path = '/microgrid'

export const getEnergyPowerStatisticsServe = (payload) => {
    return axiosInstance.get(`${path}/getEnergyPowerStatistics`, {params: payload});
}

export const getEnergyWeeklyChargeDisChargeServe = (payload) => {
    return axiosInstance.get(`${path}/getEnergyWeeklyChargeDisCharge`, {params: payload});
}

export const getLatestAlarmsServe = (payload) => {
    return axiosInstance.get(`${path}/getLatestAlarms`, {params: payload});
}

export const getDtuStatisticsServe = (payload) => {
    return axiosInstance.get(`${path}/getDtuStatistics`, {params: payload});
}

export const getGccPowerStatisticsServe = (payload) => {
    return axiosInstance.get(`${path}/getGccPowerStatistics`, {params: payload});
}

export const getGccWeeklyPowerStatisticsServe = (payload) => {
    return axiosInstance.get(`${path}/getGccWeeklyPowerStatistics`, {params: payload});
}

export const getGccWeeklyProfitServe = (payload) => {
    return axiosInstance.get(`${path}/getGccWeeklyProfit`, {params: payload});
}