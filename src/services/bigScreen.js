import axiosInstance from "./request";

export const getAllDtuRunStatusServe = (params)=>{
    return axiosInstance.get(`/dtu/getAllDtuRunStatus`,{
        params
    });
}

export const getAllDtuEfficiencyServe = (params)=>{
    return axiosInstance.get(`/dtu/getAllDtuEfficiency`,{
        params
    });
}

export const getDayCarbonServe = (params)=>{
    return axiosInstance.get(`/getDayCarbon`,{
        params
    });
}

export const getAllPlantFeeListServe = (params)=>{
    return axiosInstance.get(`/getAllPlantFeeList`,{
        params
    });
}