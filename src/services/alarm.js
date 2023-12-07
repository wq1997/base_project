import axiosInstance from "./request";
// 集装箱实时告警
export const getNowAlarmsByContainerIdWithPage = (payload) => {
   return axiosInstance.get('/getNowAlarmsByContainerIdWithPage', payload)
}
// 首页 电站所有实时告警
export const getNowAlarmsByPlantIdWithPage = ()=>{
  return axiosInstance.get("/getNowAlarmsByPlantIdWithPage");
}


export const getHistoryAlarmsByPlantIdWithPage = ()=>{
  return axiosInstance.post("/getHistoryAlarmsByPlantIdWithPage");
}