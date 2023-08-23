import axiosInstance from "./request";

export const login = (payload) => {
   return axiosInstance.post('/open/login', payload)
}

export const getPublicKey = ()=>{
  return axiosInstance.get("/open/getPublicKey");
}

export const logout = ()=>{
  return axiosInstance.get("/user/logout");
}