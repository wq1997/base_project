import axiosInstance from "./request";

export const login = payload => {
    const url = `/open/login?username=${payload?.username}&password=${payload?.password}`
    return axiosInstance.post(url);
};

export const getPublicKey = ()=>{
    return axiosInstance.get("/open/get-pub-key");
  }