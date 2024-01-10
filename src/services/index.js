import axiosInstance from "./request";

export const getPermissionTree = ()=>{
    return axiosInstance.get("/role/get-perm-for-edit");
}

export const addRole = (payload) => {
    return axiosInstance.post('/role/save-or-update', payload)
}

export const getRoleList = (payload) => {
    return axiosInstance.post('/role/find-page', payload)
}

export const deleteRole = (payload) => {
    return axiosInstance.post('/role/delete', payload)
}