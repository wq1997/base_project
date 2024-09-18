import axiosInstance from "./request";
const { API_URL } = process.env;

export const getDcDashboardData = isHaiwai => {
    const url = `${API_URL}/dashboard/get-dc-dashboard-data?isHaiwai=${isHaiwai}`;
    return axiosInstance.get(url);
};

export const getBasInspectionItem = payload => {
    return axiosInstance.post(`/bas-inspection-item/find-page`, payload);
};

export const basInspectionItemSaveOrUpdate = payload => {
    return axiosInstance.post(`/bas-inspection-item/save-or-update`, payload);
};

export const basInspectionItemSaveOrUpdateInitData = payload => {
    return axiosInstance.get(`/bas-inspection-item/get-search-page-init-data`);
};

export const basInspectionItemDelete = payload => {
    return axiosInstance.post(`/bas-inspection-item/delete`, payload);
};

export const getBasAlarmTypeIntData = payload => {
    return axiosInstance.get(`/bas-alarm-type/get-search-page-init-data`);
};

export const getBasAlarmList = payload => {
    return axiosInstance.post(`/bas-alarm-type/find-page`, payload);
};

export const updateAlarmType = payload => {
    return axiosInstance.post(`/bas-alarm-type/update`, payload);
};

export const downloadAlarmTypeTemplate = payload => {
    return axiosInstance.get(`/bas-alarm-type/download-import-template`, {
        responseType: "blob",
        params: payload,
    });
};

export const getBasProjectInitData = payload => {
    return axiosInstance.get(`/bas-project/get-search-page-init-data`);
};

export const getBaseProjectList = payload => {
    return axiosInstance.post(`/bas-project/find-page`, payload);
};

export const getSupplierInitData = payload => {
    return axiosInstance.get(`/bas-supplier/get-search-page-init-data`);
};

export const basProjectPart1SaveOrUpdate = payload => {
    return axiosInstance.post(`/bas-project/part1-save-or-update`, payload);
};

export const basProjectPart2SaveOrUpdate = payload => {
    return axiosInstance.post(`/bas-project/part2-update`, payload);
};

export const basProjectPart3SaveOrUpdate = payload => {
    return axiosInstance.post(`/bas-project/part3-update`, payload);
};

export const basProjectPart4SaveOrUpdate = payload => {
    return axiosInstance.post(`/bas-project/part4-update`, payload);
};

export const basProjectDelete = payload => {
    return axiosInstance.post(`/bas-project/delete`, payload);
};

export const basSupplierList = payload => {
    return axiosInstance.post(`/bas-supplier/find-list`, payload || {});
};

export const basSupplierModifyAll = payload => {
    return axiosInstance.post(`/bas-supplier/modify-all`, payload || {});
};

export const getBasProjectEditInitData = payload => {
    return axiosInstance.get(`/bas-project/get-edit-page-init-data`);
};

export const getWorkOrderTimeExceptionTypeStatistics = payload => {
    return axiosInstance.post(`/work-order/time-exception-partsOrSupplier-statistics`, payload);
};

export const workOrderFindExceptionStatisticsPage = payload => {
    return axiosInstance.post(`/work-order/find-exception-statistics-page`, payload);
};

export const workOrderGetExceptionStatisticsPageInitData = payload => {
    return axiosInstance.get(`/work-order/get-exception-statistics-page-init-data`, {
        params: payload,
    });
};

export const workbenchGetManagerWorkbenchData = payload => {
    return axiosInstance.get(`/workbench/get-manager-workbench-data`);
};

export const workbenchListTimeCompleteWorkOrderCount = payload => {
    return axiosInstance.get(`/workbench/list-time-complete-work-order-count`, {
        params: payload,
    });
};

export const workbenchListOperatorCompleteWorkOrderCount = payload => {
    return axiosInstance.post(`/workbench/list-operator-complete-work-order-count`, payload || {});
};

export const workbenchGetExecutorWorkbenchData = () => {
    return axiosInstance.get(`/workbench/get-executor-workbench-data`);
};

export const workbenchGetProjectSummery = payload => {
    return axiosInstance.post(`/workbench/get-project-summery`, payload);
};

export const workOrderGetTimeExceptionPartsOrSupplierStatisticsPageInitData = () => {
    return axiosInstance.get(
        `/work-order/get-time-exception-parts-or-supplier-statistics-page-init-data`
    );
};

export const basProjectPart4Submit = payload => {
    return axiosInstance.post(`/bas-project/part4-submit`, payload);
};

export const alarmStatisticsChartsPageInitData = () => {
    return axiosInstance.get(`/se-alarm/get-time-type-statistics-page-init-data`);
};

export const alarmStatisticsCharts = payload => {
    return axiosInstance.post(`/se-alarm/time-type-statistics`, payload);
};

export const alarmStatisticsTablePageInitData = payload => {
    return axiosInstance.get(`/se-alarm/get-search-page-init-data`, {
        params: payload,
    });
};

export const alarmStatisticsTable = payload => {
    return axiosInstance.post(`/se-alarm/find-page`, payload);
};

export const homeGetMainPageData = payload => {
    return axiosInstance.get(`/home/get-main-page-data`)
}

export const sparePartsInitData = () => {
    return axiosInstance.get(`/spare-parts/get-search-page-init-data`);
}

export const sparePartsFindPage = (payload) => {
    return axiosInstance.post(`/spare-parts/find-page`, payload);
}

export const newAddSpareParts = (payload) => {
    return axiosInstance.post(`/spare-parts/new-add`, payload)
}

export const sparePartsOutput = (payload) => {
    return axiosInstance.post(`/spare-parts/output`, payload);
}

export const operatorInitData = () => {
    return axiosInstance.get(`/spare-parts/get-operate-page-init-data`);
}

export const sparePartsInput = (payload) => {
    return axiosInstance.post(`/spare-parts/input`, payload);
}

export const sparePartsFindInOutPage = (payload) => {
    return axiosInstance.post(`/spare-parts/find-in-out-page`, payload);
}

export const sparePartsDelete = (payload) => {
    return axiosInstance.post(`/spare-parts/delete`, payload);
}

export const getHumanResourceInventoryPageInitData = () => {
    return axiosInstance.get(`/work-order/get-human-resource-inventory-page-init-data`)
}

export const findHumanResourceInventory = payload => {
    return axiosInstance.post(`/work-order/find-human-resource-inventory-data-page`, payload)
}

export const humanProjectInvntoryData = (payload) => {
    return axiosInstance.get(`/work-order/get-human-project-inventory-data`, {params: payload})
}

export const humanWorkOrderInvntoryData = (payload) => {
    return axiosInstance.get(`/work-order/get-human-work-order-inventory-data`, {params: payload})
}

export const knowledgeInitData = () => {
    return axiosInstance.get(`/knowledge-base/get-search-page-init-data`);
}

export const knowledgeFindPage = (payload) => {
    return axiosInstance.post(`/knowledge-base/find-page`, payload);
}

export const knowledgeEditInitData = (payload) => {
    return axiosInstance.get(`/knowledge-base/get-edit-page-init-data`, {params: payload})
}

export const knowledgeSaveOrUpdate = (payload) => {
    return axiosInstance.post(`/knowledge-base/save-or-update`, payload);
}

export const knowledgeAudit = (payload) => {
    return axiosInstance.post(`/knowledge-base/audit`, payload);
}

export const knowledgeDelete = (payload) => {
    return axiosInstance.post(`/knowledge-base/delete`, payload)
}

export const knowledgeSubmit = (payload) => {
    return axiosInstance.post(`/knowledge-base/submit`, payload);
}