import axios from "axios";
import { getDvaApp } from "umi";
import { message } from "antd";

const getToken = () => localStorage.getItem("Token");
const getCompanyCode = () => localStorage.getItem('currentCompanyCode') || "";
const getPageKey = () => localStorage.getItem('page') || "";

const instance = axios.create({
    timeout: 10000,
    headers: {
        Authorization: getToken(),
        CompanyCode: getCompanyCode()
    },
});

instance.interceptors.request.use(
    config => {
        config.headers.Authorization = 'Bearer ' + getToken();
        config.headers.CompanyCode = getCompanyCode();
        config.headers.OperationKey = getPageKey();
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.status === "FAILED") {
                errorHandle(response.data.status, response.data.msg);
                return Promise.reject(response)
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        const { response } = error;
        if (response) {
            errorHandle(response.status, response.data.msg);
            return Promise.resolve(null);
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

const errorHandle = (status, messageText) => {
    message.error(messageText)
};

const logout = () => {
    getDvaApp()._store.dispatch({
        type: "user/logout",
    });
};

export default instance;
