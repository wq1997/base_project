import axiosInstance from "./request";
const path = '/microgrid'
// 总览 功率曲线
export const getGridPointPower = (payload) => {
  return axiosInstance.get(`${path}/getOverviewPowers?gridPointId=${payload?.gridPointId}`);
}

// 总览 累计充放电 收益
export const getPlantEnergyFee = (payload) => {
    return axiosInstance.get(`${path}/getPlantEnergyFee?plantId=${payload.plantId}`);
  }
  








