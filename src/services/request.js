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
    timeout: 30*1000,
    headers: {
        Authorization: getToken()
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
        if (data.msg) {
            if(data.code&&data.code!=='ok'){
                message.error(data.msg);
                if(data.msg==="Please login！"){
                    logout();
                }
                return
            }
            if((data.code==="ok"||data.msg==="ok")&&data.msg&&data.msg!=="ok"){
                message.success(data.msg);
                return Promise.resolve(response);
            }
            if(data.msg==="Please login！"){
                logout();
                return
            }
        }
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, error => {
    const { config, code, request, response, isAxiosError, toJSON } = error;
    if (response) {
        errorHandle(response.status, response.data.error);
    }else {
        if(error.message.includes('timeout')){
            console.log('请求超时')
        }
        if (!window.navigator.onLine) {
            console.log('断网了...')
        }
    }
});

const errorHandle = (status,msg) => {
    message.error(msg);
    // switch (status) {
    //     case 400:
    //         console.log("请求错误");
    //         break;
    //     case 401:
    //         logout();
    //         break;
    //     case 403:
    //         console.log("权限不足，拒绝访问")
    //         break;
    //     case 404:
    //         console.log("请求的资源不存在或请求地址出错")
    //         break;
    //     // 500: 服务器错误
    //     case 500:
    //         console.log("服务器错误")
    //         break;
    //     case 1000001:
    //         console.log("token 异常，请联系管理员")
    //         break;
    //     default:
    //         console.log(message);
    // }
}

const logout = () => {
    getDvaApp()._store.dispatch({
        type: 'user/logout'
    })
}

export default instance;