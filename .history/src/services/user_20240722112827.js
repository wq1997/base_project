import axiosInstance from "./request";
const { API_URL_1, API_URL_2 } = process.env;
export const login = payload => {
    const url = `${API_URL_1}/open/login`
    console.log('url',url)
    return axiosInstance.post(url, payload);
};

export const getPublicKey = ()=>{
    return axiosInstance.get(`${API_URL_1}/open/get-pub-key`);
}