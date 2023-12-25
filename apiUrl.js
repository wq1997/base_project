const domain = ".sermatec-cloud.com";
const serve = 1; // 1 国内 0 国外

export default apiUrl = {
    test: 'http://192.168.2.165:8080',
    prod: `https://${serve ? "api" : "api1"}${domain}`
}