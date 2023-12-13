import axiosInstance from "./request";
const path='/total'
// 根据电站id分页查询实时告警
export const getNowAlarmsByPlantIdWithPage = (payload) => {
    return axiosInstance.post(`${path}/alarm/getNowAlarmsByPlantIdWithPage`, payload );
}
// 根据电站分页查询历史告警
export const getHistoryAlarmsByPlantIdWithPage = (payload)=>{
    return axiosInstance.post(`${path}/alarm/getHistoryAlarmsByPlantIdWithPage`, payload );

}

// 根据电站和设备类型分页查询实时告警
export const getNowAlarmsByDeviceTypeWithPage = (payload)=>{
    return axiosInstance.post(`${path}/alarm/getNowAlarmsByDeviceTypeWithPage`, payload );

}