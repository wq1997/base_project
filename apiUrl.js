const domain = ".sermatec-cloud.com";
const serve = 1; // 1 国内 0 国外

export default apiUrl = {
    test: 'http://192.168.1.42/api',
    prod: `https://${serve ? "api" : "api1"}${domain}`,
    socketURL:'http://192.168.1.42:9999'
}