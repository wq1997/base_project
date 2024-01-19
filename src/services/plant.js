import axiosInstance from "./request";
const path = '/total'
// 获取电站列表
export const apigetPlantList = () => {
  return axiosInstance.get(`${path}/getPlantList`);
}

// 新增电站
export const apiInsertPlant = (payload) => {
    return axiosInstance.post(`${path}/insertPlant`, payload);
  }
  


// 编辑电站
export const apiUpdatePlant = (payload) => {
    return axiosInstance.post(`${path}/updatePlant`, payload);
  }


// 根据id查询电站
export const apigetPlantById = (payload) => {
    return axiosInstance.get(`${path}/getPlantById?plantId=${payload.plantId}`);
  }
// 根据id删除电站
export const apideletePlantById = (payload) => {
    return axiosInstance.get(`${path}/deletePlantById?plantId=${payload.plantId}`);
  }
// 获取选项初始值
export const getInsertPlantInitData = () => {
  return axiosInstance.get(`${path}/getInsertPlantInitData`);
}





