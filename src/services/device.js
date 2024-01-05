import axiosInstance from "./request";
export const apiGetAllPlants = ()=>{
    return axiosInstance.get("/sermatec-energy/getPlantList");
  }
  // 获取设备舱详情
  export const apiGetAllDevices = ()=>{
    return axiosInstance.get("/energy/getDtusOfPlant");
  }
  // 获取集装箱数据
  export const apiGetContainer = ()=>{
    return axiosInstance.get("/energy/new/getContainer");
  }

    // (bms、户外柜)电芯详情
    export const apiGetContainerAllCell = ()=>{
      return axiosInstance.get("/energy/new/getContainerAllCell");
    }
  
   // 电芯历史数据
   export const apiFetchBatteryClusterHistory = ()=>{
    return axiosInstance.get("/energy/new/fetchBatteryClusterHistory");
  }
   // (bms、pcs)实时数据
   export const apiGetALLContainer = (payload)=>{
    return axiosInstance.get("/energy/new/getALLContainer",{ params: payload });
  }
   // (bms)历史数据
   export const apiFetchNewAllBatteryCVS = (payload)=>{
    return axiosInstance.get("/energy/bat/fetchNewAllBatteryCVS",{ params: payload });
  }
   // (户外柜)实时数据
   export const apiLiveSummary = (payload)=>{
    return axiosInstance.get("/minsys/outdoorCabinet/liveSummary",{ params: payload });
  }
   // 户外柜 历史数据 功率统计(旧 起始日期为同一天)
   export const apiFetchPowerHistoryBetweenTime = (payload)=>{
    return axiosInstance.get("/minsys/fetchPowerHistoryBetweenTime",{ params: payload });
  }  
   // 户外柜 历史数据 电量统计(旧 起始日期为同一天)
  export const apiFetchPvGridEnergyByTime = (payload)=>{
   return axiosInstance.get("/minsys/fetchPvGridEnergyByTime",{ params: payload });
 }

    // 户外柜 历史数据 SOC统计(旧 起始日期为同一天)
    export const apiFetchBatterySocByTime = (payload)=>{
      return axiosInstance.get("/minsys/fetchBatterySocByTime",{ params: payload });
    }    