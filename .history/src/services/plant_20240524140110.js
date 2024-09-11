import axiosInstance from "./request";
import { jsonToUrlParams} from '@/utils/utils'
const { API_URL_1 } = process.env;

export const getPlantList = payload => {
    const url = `${API_URL_1}/api/v1/plant${jsonToUrlParams(payload)}`;
    return axiosInstance.get(url, payload);
};

export const getPlantType = () => {
    const url = `${API_URL_1}/api/v1/plant/types`;
    return axiosInstance.get(url);
};
