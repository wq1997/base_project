import axios from "axios";
import { getDvaApp } from "umi";

export const getBaseUrl = () => {
    const { API_URL1 = "" } = process.env;
    console.log("API_URL", API_URL1);
    return API_URL1;
};
const getToken = () => localStorage.getItem("Token");

const instance = axios.create({
    baseURL: "/api",
    timeout: 50000,
    headers: {
        Authorization: getToken(),
    },
});

instance.interceptors.request.use(
    config => {
        config.headers.Authorization =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsiaWQiOjIsInVzZXJuYW1lIjoiemhhbmdzYW4ifSwiZXhwIjoxNzExMTQ1ODA5fQ.OktStkDzYPvWAVgXKAa9BAdl06r24J7BJLYyutrwQUU";
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        console.dir("err", error);
        const { config, code, request, response, isAxiosError, toJSON } = error;
        if (response) {
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            if (error.message.includes("timeout")) {
                console.log("请求超时");
                return Promise.reject(error);
            }

            if (!window.navigator.onLine) {
                console.log("断网了...");
            } else {
                return Promise.reject(error);
            }
        }
    }
);

const errorHandle = (status, message) => {
    switch (status) {
        case 400:
            console.log("请求错误");
            break;
        case 401:
            logout();
            break;
        case 403:
            console.log("权限不足，拒绝访问");
            break;
        case 404:
            console.log("请求的资源不存在或请求地址出错");
            break;
        // 500: 服务器错误
        case 500:
            console.log("服务器错误");
            break;
        case 1000001:
            console.log("token 异常，请联系管理员");
            break;
        default:
            console.log(message);
    }
};

const logout = () => {
    getDvaApp()._store.dispatch({
        type: "user/logout",
    });
};

export default instance;
