
export const getSignalChart = stringCount => {
    const url = `${API_URL_1}/api/v1/statistics/dailyChart/${stringCount}`;
    return axiosInstance.get(url);
};