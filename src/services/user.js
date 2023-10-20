import axiosInstance from "./request";

export const login = (payload) => {
   return axiosInstance.post('/open/pcLogin', payload)
}

export const getPublicKey = ()=>{
  return axiosInstance.get("/open/getPublicKey");
}

export const logout = ()=>{
  return axiosInstance.get("/user/logout");
}