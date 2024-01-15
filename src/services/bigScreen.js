import axiosInstance from "./request";

export const getAllDtuRunStatusServe = (params) => {
    return axiosInstance.get(`/dtu/getAllDtuRunStatus`, {
        params
    });
}

export const getAllDtuEfficiencyServe = (params) => {
    return axiosInstance.get(`/dtu/getAllDtuEfficiency`, {
        params
    });
}

export const getDayCarbonServe = (params) => {
    return axiosInstance.get(`/getDayCarbon`, {
        params
    });
}

export const getAllPlantFeeListServe = (params) => {
    return axiosInstance.get(`/getAllPlantFeeList`, {
        params
    });
}

export const getOMInfoServe = (params) => {
    return axiosInstance.get(`/getOMInfo`, {
        params
    });
}

export const getAlmCountServe = (params) => {
    return axiosInstance.get(`/getAlmCount`, {
        params
    });
}

export const getOMOverviewServe = (params) => {
    return axiosInstance.get(`/getOMOverview`, {
        params
    });
}

export const getAllPlantList = (params) => {
    return axiosInstance.get(`/plant/getAllPlantList`, {
        params
    })

}
export const getAlmListServe = (params) => {
    return axiosInstance.get(`/getAlmList`, {
        params
    });
}

export const sysDb = (params) => {
    return axiosInstance.get(`/plant/sysDb`, { params })
}

export const getTotalDayFeeServe = (params) => {
    return axiosInstance.get(`/getTotalDayFee`, {
        params
    });
}

export const getAllDtuIdsServe = (params) => {
    return axiosInstance.get(`/dtu/getAllDtuIds`, {
        params
    });
}

export const getPlantSysDb = (params) => {
    return axiosInstance.get('/plant/sysDb', {
        params
    })
}