import axiosInstance from "./request";
// 获取电站列表 (设备页)
export const getFetchPlantList = () => {
    return axiosInstance.get(`/energy/fetchPlantList`);
}
export const deleteDtu = (payload) => {
    return axiosInstance.get(`/energy/deleteDtu?dtuId=${payload.id}`);
}

export const updateDtus = (payload) => {
    return axiosInstance.post(`/energy/updateDtus`,payload);
}
// 设备总览界面
export const getBurOverview2 = (payload) => {
    return axiosInstance.get(`/minsys/getBurOverview2?dtuId=${payload.id}`);
}

// 设备总览界面
export const getBurDeviceDetailInfo2 = (payload) => {
    return axiosInstance.get(`/minsys/getBurDeviceDetailInfo2?dtuId=${payload.id}`);
}

// 监测曲线初始化信息
export const getMonitorTypeInitData2 = () => {
    return axiosInstance.get(`/minsys/getMonitorTypeInitData2`);
}

// 监测曲线
export const monitorDataWithTime2 = (payload) => {
    return axiosInstance.post(`/minsys/monitorDataWithTime2`,payload);
}

// pack详情初始化筛选信息
export const getBurPackDetailInitData2 = (payload) => {
    return axiosInstance.get(`/minsys/getBurPackDetailInitData2?dtuId=${payload.dtuId}`);
}

// pack详情
export const getBurPackDetailInfo2 = (payload) => {
    return axiosInstance.post(`/minsys/getBurPackDetailInfo2`,payload);
}