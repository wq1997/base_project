import axiosInstance from "./request";
const { API_URL } = process.env;

export const getAlarmScreenList = payload => {
    const url = `${API_URL}/dashboard/find-dc-alarm-page`;
    return axiosInstance.post(url, payload);
};


};
