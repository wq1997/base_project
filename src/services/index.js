import axiosInstance from "./request";
const { API_URL } = process.env;

export const getDcDashboardData = isHaiwai => {
    const url = `${API_URL}/dashboard/get-dc-dashboard-data?isHaiwai=${isHaiwai}`;
    return axiosInstance.get(url);
};

export const getBasInspectionItem = payload => {
    return axiosInstance.post(`/bas-inspection-item/find-page`, payload);
}

export const basInspectionItemSaveOrUpdate = payload => {
    return axiosInstance.post(`/bas-inspection-item/save-or-update`, payload);
}

export const basInspectionItemSaveOrUpdateInitData = payload => {
    return axiosInstance.get(`/bas-inspection-item/get-search-page-init-data`);
}

export const basInspectionItemDelete = payload => {
    return axiosInstance.post(`/bas-inspection-item/delete`, payload);
}

export const getBasAlarmTypeIntData = payload => {
    return axiosInstance.get(`/bas-alarm-type/get-search-page-init-data`);
}

export const getBasAlarmList = payload => {
    return axiosInstance.post(`/bas-alarm-type/find-page`, payload);
}

export const updateAlarmType = payload => {
    return axiosInstance.post(`/bas-alarm-type/update`, payload);
}

export const downloadAlarmTypeTemplate = payload => {
    return axiosInstance.get(`/bas-alarm-type/download-import-template`, {
        responseType: 'blob',
        params: payload
    })
}