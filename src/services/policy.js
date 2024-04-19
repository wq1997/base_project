import axiosInstance from "./request";

//命令下发
export const sendBurCmd2 = (payload) => {
    return axiosInstance.post('/minsys/sendBurCmd2', payload)
 }
//获取命令下发初始化信息
 export const getBurDtuDevInfo2 = (payload)=>{
    return axiosInstance.get(`/minsys/getBurDtuDevInfo2?dtuId=${payload.dtuId}`);
  }
  
  //策略数据回显
 export const getBurCmdHistory2 = (payload)=>{
    return axiosInstance.get(`/minsys/getBurCmdHistory2?dtuId=${payload.dtuId}`);
  }
  