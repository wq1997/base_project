import axios from "axios";
import { getDvaApp } from "umi";
import { getLocalStorage } from "@/utils/utils";
import { message } from "antd";

const getToken = () => getLocalStorage("Token");

export const getBaseUrl = () => {
    let API_BASE_URL = '';
    if (process.env.NODE_ENV == 'production') {
    //   API_BASE_URL = 'http://47.99.206.26:8484/api';
      API_BASE_URL = 'https://energy.sermatec-cloud.com/api';
    } else {
      API_BASE_URL = 'https://energy.sermatec-cloud.com/api';
    }
    return API_BASE_URL;
};

const instance = axios.create({
    baseURL: getBaseUrl(),
    timeout: 10000,
    headers: {
        token: getToken()
    }
})

instance.interceptors.request.use(config => {
    config.headers.token = getToken();
    return config;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    if (response.status === 200) {
        // 如果后端返回了code，但是code不是200那就将错误返回到page
        if(response?.data?.code&&response?.data?.code!==200){
            if(response?.data?.code===403){
                logout();
                return;
            }
            errorHandle(response.status, response.data?.msg || response.data?.message);
            return Promise.reject(response);
        }
        return Promise.resolve(response?.data);
    } else {
        errorHandle(response.status, response.data?.msg || response.data?.message);
        return Promise.reject(response);
    }
}, error => {
    const { response } = error;
    if (response) {
        errorHandle(response.status, response.data?.msg || response.data?.message);
        return Promise.reject(response);
    }else {
        if(error.code==="ERR_NETWORK"){
            errorHandle(502, '服务器错误');
        }
    }
});

const errorHandle = (status,info) => {
    switch (status) {
        case 400:
            info = "请求错误"
            break;
        case 401:
            logout();
            break;
        case 403:
            info = "权限不足，拒绝访问";
            break;
        case 404:
            info = "请求的资源不存在或请求地址出错";
            break;
        case 500:
            info = "服务器错误"
            break;
        case 1000001:
            info = "token 异常，请联系管理员";
            break;
    }
    message.error(info);
}

const logout = () => {
    getDvaApp()._store.dispatch({
        type: 'user/logout'
    })
}

export default instance;