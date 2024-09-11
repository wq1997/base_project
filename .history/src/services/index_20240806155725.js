import axiosInstance from "./request";
const { API_URL } = process.env;

export const login = (payload) => {
   return new Promise((resolve) => {
      setTimeout(()=>{
        resolve({
          userName: 'wangqing',
          age: 20
        })
      }, 2000)
   })
   //  axiosInstance.post('/login', payload)
}

export const getTaskist = payload => {
  const url = `${apiUrl}/invite-task/find-page`;
  return axiosInstance.post(url, payload);
};

export const getSearchInitData = () => {
  const url = `${apiUrl}/invite-task/get-search-page-init-data`;
  return axiosInstance.get(url);
};

export const getWaitConfirmTasks = () => {
  const url = `${apiUrl}/invite-task/get-wait-confirm-invite-task-dashboard-vo`;
  return axiosInstance.get(url);
};

export const confirmTask = payload => {
  const url = `${apiUrl}/invite-task/confirm`;
  return axiosInstance.post(url, payload);
};