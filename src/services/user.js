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
export const apiGetAllUserAndInfos = ()=>{
  return axiosInstance.get(`/user/getAllUserAndInfos` );
}

