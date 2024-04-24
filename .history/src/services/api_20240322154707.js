import axiosInstance from "./request";

export const save = payload => {
  const url = `${API_URL_1}/file/upload`;
  return axiosInstance.post(url, payload);
};