import axiosInstance from "./request";

const { API_URL_1, API_URL_2 } = process.env;

export const getTaskIncomeList = payload => {
    const url = `${API_URL_2}/invite-task/find-profit-page`;
    return axiosInstance.post(url, payload);
};

export const getInvitationIncomeList = payload => {
    const url = `${API_URL_2}/invite/find-profit-page`;
    return axiosInstance.post(url, payload);
};