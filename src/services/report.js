import axiosInstance from "./request";
// const path = '/microgrid'
const path = ''

// 获取电量统计 和收益
export const getEnergyFeeByTime = (payload) => {
    return axiosInstance.post(`${path}/getEnergy`, payload);
}
// 获取收益比列图
export const getEarningsDistribution = (payload) => {
    return axiosInstance.post(`${path}/getEarningsDistribution`, payload);
}
// 获取收益比列图
export const getReportList = (payload) => {
    return axiosInstance.post(`${path}/report/getReportList`, payload);
}
// 报表导出接口
// 获取设备报表列表(获取模板)
export const getExportReportList = (payload) => {
    return axiosInstance.get(`${path}/report/getReportList?plantId=${payload.plantId}&type=${payload.type}`);
}
// 获取动态数据
export const getDtuReport = (payload) => {
    return axiosInstance.post(`${path}/report/getDataReport`, payload);
}
// 报表导出
export const exportReport = (payload) => {
    return axiosInstance.get(`${path}/report/exportReport?plantId=${payload.plantId}&date=${payload.date}&type=${payload.type}`, {
        responseType: 'blob'
    });
}
// 修改报表模板
export const updateReportTemplate = (payload) => {
    return axiosInstance.post(`${path}/report/updateReportTemplate`, payload);
}




// 数据对比接口
// 获取数据对比 设备结构
export const getDataComparisonInit = (payload) => {
    return axiosInstance.get(`${path}/dc/getDataComparisonInit?plantId=${payload.plantId}`);
}
// 获取参数列表
export const getDataParams = (payload) => {
    return axiosInstance.get(`${path}/dc/getDataParams?plantId=${payload.plantId}&devId=${payload.devId}`);
}
// 获取数据
export const getCompareData = (payload) => {
    return axiosInstance.post(`${path}/dc/getCompareData`, payload);
}