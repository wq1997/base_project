import axiosInstance from "./request";
// 获取电站列表
export const apiGetPlantList = ()=>{
    return axiosInstance.get("/getPlantList");
}
// 获取电站列表(管理员)
export const apiGetAllPlant = ()=>{
    return axiosInstance.get("/getAllPlant");
}

// 获取大屏告警比列
export const apiGetPlantAlarmDistribution = ()=>{
    return axiosInstance.get("/alarm/getPlantAlarmDistribution");
}
// 获取大屏告警比列(管理员)
export const apiGetAllPlantAlarmDistribution = ()=>{
    return axiosInstance.get("/alarm/getAllPlantAlarmDistribution");
}

// 获取电站功率曲线
export const apiGetPlantPowerCurves = (payload)=>{
    return axiosInstance.get(`/largeScreen/getPlantPowerCurves?date=${payload?.date}`);
}
// 获取电站功率曲线(管理员)
export const apiGetAllPlantPowerCurves = (payload)=>{
    return axiosInstance.get(`/largeScreen/getAllPlantPowerCurves?date=${payload?.date}`);
}

// 获取每天的充放电量
export const apiGetPlantEnergyByDay = ()=>{
    return axiosInstance.get("/largeScreen/getPlantEnergyByDay");
}
// 获取每天的充放电量(管理员)
export const apiGetAllPlantEnergyByDay = ()=>{
    return axiosInstance.get("/largeScreen/getAllPlantEnergyByDay");
}

// 获取电站电量效益等
export const apiGetPlantEnergy = ()=>{
    return axiosInstance.get("/largeScreen/getPlantEnergy");
}
// 获取电站电量效益等(管理员)
export const apiGetAllPlantEnergy = ()=>{
    return axiosInstance.get("/largeScreen/getAllPlantEnergy");
}