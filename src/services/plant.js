import axiosInstance from "./request";
const path = '/total'
// 获取电站列表
export const apigetPlantList = (payload) => {
  return axiosInstance.post(`/energy/fetchPlantListByRoot`,payload);
}


// 新增电站
export const apiInsertPlant = (payload) => {
    return axiosInstance.post(`${path}/insertPlant`, payload);
  }
  


// 编辑电站
export const apiUpdatePlant = (payload) => {
    return axiosInstance.post(`/energy/updatePlant`, payload);
  }


// 根据id查询电站
export const apigetPlantById = (payload) => {
    return axiosInstance.get(`${path}/getPlantById?plantId=${payload.plantId}`);
  }
// 根据id删除电站
export const apideletePlantById = (payload) => {
    return axiosInstance.get(`/energy/deletePlant?plantId=${payload.plantId}`);
  }
// 获取选项初始值
export const getInsertPlantInitData = () => {
  return axiosInstance.get(`/energy/fetchPlantInitData`);
}

// 根据电站id获取设备列表
export const getDtusOfPlant = (payload) => {
  return axiosInstance.get(`/energy/getDtusOfPlant?plantId=${payload.plantId}`);
}


// 电量统计
export const getBurEnergyStats2 = (payload) => {
  return axiosInstance.get(`/minsys/getBurEnergyStats2?plantId=${payload.plantId}`);
}

// 设备统计
export const getDeviceStats = (payload) => {
  return axiosInstance.get(`/energy/getDeviceStats?plantId=${payload.plantId}`);
}



