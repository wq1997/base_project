import axiosInstance from "./request";
const path = ''
// 获取电站列表
export const apigetPlantList = () => {
  return axiosInstance.get(`${path}/getPlantList`);
}
// 获取并网点列表
export const getGridPointList = (payload) => {
  return axiosInstance.get(`${path}/getGridPointList?plantId=${payload.plantId}`);
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

// 根据并网点获取首页实时数据
export const getOverviewLiveData = (payload) => {
  return axiosInstance.get(`${path}/getOverviewLiveData?gridPointId=${payload.gridPointId}`);
}





