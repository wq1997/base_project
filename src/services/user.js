import axiosInstance from "./request";

export const login = (payload) => {
   return axiosInstance.post('/user/loginWithCode', payload)
}

export const getPublicKey = ()=>{
  return axiosInstance.get("/user/getPublicKey");
}


export const logout = ()=>{
  return axiosInstance.get("/user/logout");
}

// 获取用户信息列表
export const fetchAllUsersList = ()=>{
  return axiosInstance.get(`/user/fetchAllUsersList` );
}

// 获取用户列表 ( 用户中心 普通用户 超级用户使用)
export const getAllUserByAdmin = ()=>{
  return axiosInstance.get(`/user/getAllUserByAdmin` );
}
// 获取用户列表 (root)
export const getAllUserRoot = (payload)=>{
  return axiosInstance.get(`/user/getAllUserRoot?roleId=${payload.roleId}`);
}
// 密码修改
export const changePassword = (payload) => {
  return axiosInstance.post('/user/changePassword', payload)
}

// admin密码修改
export const oc372ChangePassword = (payload) => {
  return axiosInstance.post('/user/oc372ChangePassword', payload)
}
// 获取所有超级用户 和 root用户
export const getBurUserWithRole2 = (payload)=>{
  return axiosInstance.get(`/user/getBurUserWithRole2`);
}

// 新增或更新用户信息
export const updateUserAndInfos = (payload) => {
  return axiosInstance.post('/user/updateUserAndInfos', payload)
}

// 根据id删除
export const apiDeleteUserById = (payload) => {
  return axiosInstance.get(`/user/deleteUser?userId=${payload.userId}`,);
}
