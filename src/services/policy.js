import axiosInstance from "./request";
const path = ''
// 策略列表
// export const getStrategyList = (payload) => {
//     return axiosInstance.get(`${path}/strategy/getStrategyList?gridPointId=${payload.gridPointId}`);
// }
// 基础配置
export const sendBasicParams = (payload) => {
    return axiosInstance.post(`${path}/strategy/sendBasicParams`, payload);
}
// 新增策略
export const saveStrategy = (payload) => {
    return axiosInstance.post(`${path}/strategy/saveStrategy`, payload);
}
// 策略列表（选择策略功能 不包含内容）
export const getStrategyNameList = (payload) => {
    return axiosInstance.get(`${path}/strategy/getStrategyNameList?gridPointId=${payload.gridPointId}`);
}
// 删除策略
export const deleteStrategy = (payload) => {
    return axiosInstance.get(`${path}/strategy/deleteStrategy?strategyId=${payload.strategyId}`);
}
// 策略列表
export const getStrategyInfo = (payload) => {
    return axiosInstance.get(`${path}/strategy/getStrategyList?dtuId=${payload.dtuId}`);
}
// 获取日程列表
export const getStrategyPlanList = (payload) => {
    return axiosInstance.get(`${path}/strategy/getStrategyPlanList?gridPointId=${payload.gridPointId}`);
}
// 新增日程
export const saveStrategyPlan = (payload) => {
    return axiosInstance.post(`${path}/strategy/saveStrategyPlan`, payload);
}
// 删除日程
export const deleteStrategyPlan = (payload) => {
    return axiosInstance.get(`${path}/strategy/deleteStrategyPlan?planId=${payload.planId}`);
}
// 获取基础配置
export const getBasicParams = (payload) => {
    return axiosInstance.get(`${path}/strategy/getBasicParams?gridPointId=${payload.gridPointId}`);
}
// 获取单个日程信息
export const getStrategyPlanInfo = (payload) => {
    return axiosInstance.get(`${path}/strategy/getStrategyPlanInfo?gridPointId=${payload.gridPointId}&planId=${payload.planId}`);
}
// 策略列表 (app) 第一条为默认策略 不可修改
export const getDefStrategyList = (payload) => {
    return axiosInstance.get(`${path}/strategy/getDefStrategyList?gridPointId=${payload.gridPointId}`);
}
// 策略曲线 （soc power）
export const getStrategyCurve = (payload) => {
    return axiosInstance.get(`${path}/strategy/getStrategyCurve?strategyId=${payload.strategyId}`);
}
// 并网点列表（全部）
export const getGridPointList = (payload) => {
    return axiosInstance.get(`${path}/getGridPointList?plantId=${payload.plantId}`);
}
// 并获取电价列表
export const getPricePlan = (payload) => {
    return axiosInstance.get(`${path}/price/getPricePlan?plantId=${payload.plantId}`);
}
// 设置电价列表
export const savePricePlan = (payload) => {
    return axiosInstance.post(`${path}/price/savePricePlan`, payload);
}
// 获取运维命令
export const getOMCommands = (payload) => {
    return axiosInstance.get(`${path}/strategy/getOMCommands?plantId=${payload.plantId}`);
}
// 下发运维命令
export const sendOMCommands = (payload) => {
    return axiosInstance.post(`${path}/strategy/sendOMCommands`, payload);
}
