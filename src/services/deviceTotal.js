import axiosInstance from "./request";
const path = '/total'

// 获取并网点汇充放电量、效率、收益图
export const getChargeDischargeEnergySevenDaysDtuId = (payload) => {
    return axiosInstance.get(`${path}/getChargeDischargeEnergySevenDaysDtuId?dtuId=${payload.dtuId}`);
}
// 获取当前并网点所有在线告警
export const getNowAlarmsByDtu = (payload) => {
    return axiosInstance.get(`${path}/getNowAlarmsByDtu?dtuId=${payload.dtuId}`);
}
// 获取并网点运行指标
export const getRunMetricsj = (payload) => {
    return axiosInstance.get(`${path}/getRunMetricsj?dtuId=${payload.dtuId}`);
}
// 获取并网点获取收益
export const getIncomeByDtuId = (payload) => {
    return axiosInstance.get(`${path}/getIncomeByDtuId?dtuId=${payload.dtuId}`);
}
// 获取设备电量
export const getEnergySummaryByDtu = (payload) => {
    return axiosInstance.get(`${path}/getEnergySummaryByDtu?dtuId=${payload.dtuId}`);
}
// 获取电站下所有设备充放电量、效率、收益图
export const getChargeDischargeEnergySevenDaysByPlantId = (payload) => {
    return axiosInstance.get(`${path}/getChargeDischargeEnergySevenDaysByPlantId?plantId=${payload.plantId}`);
}
// 获取运行指标
export const getRunMetrics = (payload) => {
    return axiosInstance.get(`${path}/getRunMetrics?plantId=${payload.plantId}`);
}
// 获取所有设备充放电量
export const getEnergySummary = (payload) => {
    return axiosInstance.get(`${path}/getEnergySummary?plantId=${payload.plantId}`);
}
// 获取电站下所有设备效率
export const getEfficiencyByPlantId = (payload) => {
    return axiosInstance.get(`${path}/getEfficiencyByPlantId?plantId=${payload.plantId}`);
}
// 获取所有储能设备在线告警
export const getNowAlarmsByEnergy = (payload) => {
    return axiosInstance.get(`${path}/getNowAlarmsByEnergy?plantId=${payload.plantId}`);
}
// 获取收益
export const getIncomeByPlantId = (payload) => {
    return axiosInstance.get(`${path}/getIncomeByPlantId?plantId=${payload.plantId}`);
}
// 获取设备树
export const getDeviceTree = (payload) => {
    return axiosInstance.get(`${path}/getDeviceTree?plantId=${payload.plantId}`);
}


// 获取电表实时数据
export const getMetersNowData = (payload) => {
    return axiosInstance.post(`${path}/getMetersNowData`, payload);
}

// 获取bms实时数据信息
export const getBmsNowData = (payload) => {
    return axiosInstance.get(`${path}/getBmsNowData?id=${payload.id}`);
}
// 获取bmC实时数据信息
export const getBmcNowData = (payload) => {
    return axiosInstance.get(`${path}/getBmcNowData?id=${payload.id}&cluster=${payload.cluster}`);
}
// 获取bmC实时数据信息
export const getPcsNowDataById = (payload) => {
    return axiosInstance.get(`${path}/getPcsNowDataById?id=${payload.id}`);
}
// 获取pcs实时功率曲线
export const getPcsNowPowerById = (payload) => {
    return axiosInstance.get(`${path}/getPcsNowPowerById?id=${payload.id}`);
}

// 获取pcs检测曲线
export const obtainPCSParameterData = (payload) => {
    return axiosInstance.post(`/pcs/mg/obtainPCSParameterData`, payload);
}

// 获取bms检测曲线
export const obtainBMSParameterData = (payload) => {
    return axiosInstance.post(`/bms/obtainBMSParameterData`, payload);
}

// 获取bms监测曲线簇列表
export const obtainBMSClustersList = (payload) => {
    return axiosInstance.get(`${path}/obtainBMSClustersList?id=${payload.id}`);
}



// 微网户外柜 监测曲线
export const obtainMgOcParameterData = (payload) => {
    return axiosInstance.post(`/minsys/obtainMgOcParameterData`, payload);
}


// 获取光伏的运行指标
export const getPvRunMetrics = (payload) => {
    return axiosInstance.get(`${path}/pv/getPvRunMetrics?plantId=${payload.plantId}`);
}

// 获取光伏发电量
export const pvPowerGeneration = (payload) => {
    return axiosInstance.post(`${path}/pv/pvPowerGeneration`, payload);
}

// 获取微网bms高级分析 初始化数据类型
export const getBmsAnalyticsInitData = (payload) => {
    return axiosInstance.get(`/battery/getBmsAnalyticsInitData?id=${payload.id}`);
}
// bms 高级分析 温差压差 曲线
export const analyticsBmsDiffData = (payload) => {
    return axiosInstance.post(`/battery/analyticsBmsDiffData`, payload);
}

//bms 高级分析 温度 电压曲线  
export const analyticsBmsData = (payload) => {
    return axiosInstance.post(`/battery/analyticsBmsData`, payload);
}