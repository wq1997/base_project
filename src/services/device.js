import axiosInstance from "./request";
export const apiGetAllPlants = ()=>{
    return axiosInstance.get("/sermatec-energy/getPlantList");
  }
  // 获取设备舱详情
  export const apiGetAllDevices = ()=>{
    return axiosInstance.get("/energy/getDtusOfPlant");
  }
  // 获取集装箱数据
  export const apiGetContainer = ()=>{
    return axiosInstance.get("/energy/new/getContainer");
  }
