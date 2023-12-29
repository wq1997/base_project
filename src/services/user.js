import axiosInstance from "./request";

export const login = (payload) => {
   return axiosInstance.post('/login', payload)
}

export const getPublicKey = ()=>{
  return axiosInstance.get("/getPublicKey");
}


export const logout = ()=>{
  return axiosInstance.get("/user/logout");
}