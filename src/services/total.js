import axiosInstance from "./request";
const path='/total'
export const apiGetAllPlants = ()=>{
    return axiosInstance.get(`${path}/getPlantList`);
  }
  export const apiGetDtuList = (payload)=>{
    return axiosInstance.get(`${path}/getDtuList`,{ params: payload });
  }
// 获取操作日志
  export const apiListLogWithPage = (payload)=>{
    return axiosInstance.post(`${path}/listLogWithPage`, payload );
  }


