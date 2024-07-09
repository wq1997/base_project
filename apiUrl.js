const domain = ".sermatec-cloud.com";
const serve = 1; // 1 国内 0 国外

export default apiUrl = {
    test: 'http://47.111.104.162:40009/api/',
    // test: 'http://192.168.1.42:9799',
    prod: `https://${serve ? "api" : "api1"}${domain}`
}   