import axiosInstance from "./request";
const path = '/total'

// 获取操作日志
export const apiListLogWithPage = (payload) => {
  return axiosInstance.post(`/minsys/getBurOperationLog215`, payload);
}

// 根据id删除
export const apiDeleteUserById = (payload) => {
  return axiosInstance.get(`${path}/deleteUserById?userId=${payload.userId}`,);
}
