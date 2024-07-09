import axios from "axios";
import { getDvaApp,history } from "umi";
import {  message } from 'antd';

export const getBaseUrl = () => {
    const { API_URL = '' } = process.env;
    return API_URL;
};
const getToken = () => localStorage.getItem("Token");
const instance = axios.create({
    baseURL: getBaseUrl(),
    timeout: 10000,
    headers: {
        Authorization: getToken(),
    }
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + getToken();
    config.headers.Token =  getToken();
    return config;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    if (response.status === 200) {
        let {data}=response;
        if (data.code===1001) {
            message.error(data.msg);
            logout();
            // history.push('/login')
        }
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, error => {
    const { config, code, request, response, isAxiosError, toJSON } = error;
    if (response) {
        errorHandle(response.status, response.data.message);
        return Promise.reject(response);
    }else {
        if(error.message.includes('timeout')){
            console.log('请求超时')
            return Promise.reject(error);
        }

        if (!window.navigator.onLine) {
            console.log('断网了...')
        } else {
            return Promise.reject(error);
        }
    }
});

const errorHandle = (status,message) => {
    switch (status) {
        case 400:
            console.log("请求错误");
            break;
        case 401:
            logout();
            break;
        case 403:
            console.log("权限不足，拒绝访问")
            break;
        case 404:
            console.log("请求的资源不存在或请求地址出错")
            break;
        // 500: 服务器错误
        case 500:
            console.log("服务器错误")
            break;
        case 1000001:
            console.log("token 异常，请联系管理员")
            break;
        default:
            console.log(message);
    }
}

const logout = () => {
    getDvaApp()._store.dispatch({
        type: 'user/logout'
    })
}

export default instance;