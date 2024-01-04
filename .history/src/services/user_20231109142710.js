import axiosInstance from "./request";

export const login = payload => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                userName: "wangqing",
                age: 20,
            });
        }, 2000);
    });
    //  axiosInstance.post('/login', payload)
};
