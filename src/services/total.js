import axiosInstance from "./request";
const path='/total'
export const apiGetAllPlants = ()=>{
    return axiosInstance.get(`${path}/getPlantList`);
  }
  export const apiGetDtuList = (payload)=>{
    return axiosInstance.get(`${path}/getDtuList`,{ params: payload });
  }