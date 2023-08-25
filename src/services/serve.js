import axiosInstance from "./request";

export const getFirstArea = (payload) => {
   return axiosInstance.get('/district/obtainedFirstLevelDistrictPage', {
      params: payload
   })
}

export const getFirstAreaByName = (payload) => {
   return axiosInstance.get('/district/obtainedFirstLevelDistrictByName', {
      params: payload
   })
}

export const updateArea = (payload) => {
   return axiosInstance.post('/district/updateDistrict', payload)
}

export const addArea = (payload) => {
   return axiosInstance.post('/district/addDistrict', payload)
}

export const deleteArea = (payload) => {
   return axiosInstance.get('/district/delDistrict', {
      params: payload
   })
}

export const getSecondArea = (payload) => {
   return axiosInstance.get('/district/obtainedSecondLevelDistrictPage', {
      params: payload
   })
}

export const getSecondAreaByName = (payload) => {
   return axiosInstance.get('/district/obtainedSecondLevelDistrictByName', {
      params: payload
   })
}

export const getAllFirstArea = () => {
   return axiosInstance.get('/district/obtainedFirstLevelDistrictList')
}

export const getElectricType = (payload) => {
   return axiosInstance.get('/dataType/obtainedElectricTypePage', {
      params: payload
   })
}

export const getElectricTypeByName = (payload) => {
   return axiosInstance.get('/dataType/obtainedElectricTypeByName', {
      params: payload
   })
}

export const updateBaseDataByType = (payload) => {
   return axiosInstance.post('/dataType/updateDataType', payload)
}

export const addElectricType = (payload) => {
   return axiosInstance.post('/dataType/addElectricType', payload)
}

export const deleteBaseData = (payload) => {
   return axiosInstance.get('/dataType/delDataType', {
      params: payload
   })
}

export const getBillingSystem = (payload) => {
   return axiosInstance.get('/dataType/obtainedBillingSystemPage', {
      params: payload
   })
}

export const getBillingSystemByName = (payload) => {
   return axiosInstance.get('/dataType/obtainedBillingSystemByName', {
      params: payload
   })
}

export const addBillingSystem = (payload) => {
   return axiosInstance.post('/dataType/addBillingSystem', payload)
}

export const getVoltageLevel = (payload) => {
   return axiosInstance.get('/dataType/obtainedVoltageLevelPage', {
      params: payload
   })
}

export const getVoltageLevelByName = (payload) => {
   return axiosInstance.get('/dataType/obtainedVoltageLevelByName', {
      params: payload
   })
}

export const addVoltageLevel = (payload) => {
   return axiosInstance.post('/dataType/addVoltageLevel', payload)
}

export const getNotify = (payload) => {
   return axiosInstance.get('/inform/obtainedInformPage', {
      params: payload
   })
}

export const getNotifyByName = (payload) => {
   return axiosInstance.get('/inform/obtainedInformPageByName', {
      params: payload
   })
}

export const addNotify = (payload) => {
   return axiosInstance.post('/inform/addInformType', payload)
}

export const updateNotify = (payload) => {
   return axiosInstance.post('/inform/updateInformType', payload)
}

export const deleteNotify = (payload) => {
   return axiosInstance.get('/inform/delInformType', {
      params: payload
   })
}

export const getNotifyType = (payload) => {
   return axiosInstance.get('/inform/obtainedInformType')
}

export const getUserList = (payload) => {
   return axiosInstance.get('/user/obtainedUserListPage', {
      params: payload
   })
}

export const getUserListByParams = (payload) => {
   return axiosInstance.post('/user/obtainedUserListPageBy', payload)
}

export const updateUserList = (payload) => {
   return axiosInstance.post('/user/updateUser', payload)
}

export const addUserList = (payload) => {
   return axiosInstance.post('/user/addUser', payload)
}

export const deleteUserList = (payload) => {
   return axiosInstance.get('/user/delUser', {
      params: payload
   })
}

export const changePassword = (payload) => {
   return axiosInstance.post('/user/updatePassword', payload)
}

export const getPolicyInformationList = (payload) => {
   return axiosInstance.get('/policy/obtainedPolicyPage', {
      params: payload
   })
}

export const getPolicyInformationListByParams = (payload) => {
   return axiosInstance.get('/policy/obtainedPolicyPageBy', {
      params: payload
   })
}

export const deletePolicyInformation = (payload) => {
   return axiosInstance.get('/policy/delPolicy', {
      params: payload
   })
}

export const addPolicyInformation = (payload) => {
   return axiosInstance.post('/policy/addPolicy', payload)
}

export const updatePolicyInformation = (payload) => {
   return axiosInstance.post('/policy/updatePolicy', payload)
}

export const downloadPolicyTemplate = () => {
   return axiosInstance.get('/policy/downloadPolicyTemplate', {
      responseType: 'blob'
   })
}

export const getInvestmentList = (payload) => {
   return axiosInstance.get('/keyword/obtainedParameterPage', {
      params: payload
   })
}

export const getInvestmentListByName = (payload) => {
   return axiosInstance.get('/keyword/obtainedParameterPageByName', {
      params: payload
   })
}

export const deleteInvestment = (payload) => {
   return axiosInstance.get('/keyword/delParameterPage', {
      params: payload
   })
}

export const addInvestment = (payload) => {
   return axiosInstance.post('/keyword/addParameterPage', payload)
}

export const updateInvestment = (payload) => {
   return axiosInstance.post('/keyword/updateParameterPage', payload)
}