import axiosInstance from "./request";
const path = ''
// 保加利亚372实时告警信息
export const getNowAlarmsWithPage = (payload) => {
    return axiosInstance.post(`${path}/energy/getBulNowAlarm`, payload);
}
// 保加利亚372历史告警信息
export const getHistoryAlarmsByOptionsWithPage = (payload) => {
    return axiosInstance.post(`${path}/energy/getBulHistoryAlarm`, payload);
}


