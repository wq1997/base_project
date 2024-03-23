import axiosInstance from "./request";

export const save = payload => {
  const url = `${API_URL_1}/user/find-page`;
  return axiosInstance.post(url, payload);
};