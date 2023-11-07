import axiosInstance from "./request";
export const apiGetAllPlants = ()=>{
    return axiosInstance.get("/sermatec-energy/getPlantList");
  }