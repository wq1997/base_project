import axiosInstance from "./request";
const path = '/total'
// 获取电表实时数据
export const getMetersNowData = (payload) => {
    return axiosInstance.post(`${path}/getMetersNowData`, payload);
}

// 获取pcs或bms实时数据信息
export const getBmsOrPcsNowDataById = (payload) => {
    return axiosInstance.get(`${path}/getBmsOrPcsNowDataById?id=${payload.id}&cluster=${payload.cluster||0}`);
}

// 获取pcs实时功率曲线
export const getPcsNowPowerById = (payload) => {
    return axiosInstance.get(`${path}/getPcsNowPowerById?id=${payload.id}`);
}