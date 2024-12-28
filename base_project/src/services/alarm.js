import axiosInstance from "./request";
// const path = '/microgrid'
const path = ''

// 根据电站id分页查询实时告警
export const getNowAlarmsWithPage = (payload) => {
    return axiosInstance.post(`${path}/alarm/getNowAlarmsOptionsWithPage`, payload);
}
// 获取当前用户所有设备的历史告警(条件搜索)
export const getHistoryAlarmsByOptionsWithPage = (payload) => {
    return axiosInstance.post(`${path}/alarm/getHistoryAlarmsByOptionsWithPage`, payload);
}


// 根据电站和设备类型分页查询实时告警
export const getNowAlarmsByDeviceTypeWithPage = (payload) => {
    return axiosInstance.post(`${path}/alarm/getNowAlarmsByDeviceTypeWithPage`, payload);

}

// 获取某个电站的告警规则
export const apigetAlarmRulesByPlantId = (payload) => {
    return axiosInstance.get(`${path}/getAlarmRulesByPlantId?plantId=${payload.plantId}`);
}

// 新增告警规则
export const getInsertAlarmRule = (payload) => {
    return axiosInstance.post(`${path}/insertAlarmRule`, payload);
}
// 编辑告警规则
export const getUpdateAlarmRule = (payload) => {
    return axiosInstance.post(`${path}/updateAlarmRule`, payload);
}
// 删除告警规则
export const getDeleteAlarmRuleById = (payload) => {
    return axiosInstance.get(`${path}/deleteAlarmRuleById?id=${payload.id}`);
}

