const domain = ".sermatec-cloud.com";
const serve = 1; // 1 国内 0 国外

export default apiUrl = {
    test: 'http://192.168.6.9/api',
    prod: `https://${serve ? "api" : "api1"}${domain}`
}