import axiosInstance from "./request";
const path = '/total'
export const apiGetAllPlants = () => {
  return axiosInstance.get(`${path}/getPlantList`);
}

export const apiGetDtuList = (payload) => {
  return axiosInstance.get(`${path}/getDtuList`, { params: payload });
}





// 获取操作日志
export const apiListLogWithPage = (payload) => {
  return axiosInstance.post(`${path}/listLogWithPage`, payload);
}







// 获取用户信息列表
export const apiSaveOrUpdateUser = (payload) => {
  return axiosInstance.post(`${path}/saveOrUpdateUser`, payload);
}
// 根据id删除
export const apiDeleteUserById = (payload) => {
  return axiosInstance.get(`${path}/deleteUserById?userId=${payload.userId}`,);
}
// 修改密码
export const apiUpdatePassword = (payload) => {
  return axiosInstance.post(`${path}/updatePassword`, payload);
}
// 分页查询用户列表
export const apiListUserWithOptions = (payload) => {
  return axiosInstance.post(`${path}/listUserWithOptions`, payload);
}

// 重置密码
export const apiResetPassword = (payload) => {
  return axiosInstance.get(`${path}/resetPassword?userId=${payload.userId}`);
}