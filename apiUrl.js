const domain = ".sermatec-cloud.com";

/**
 * test/prod : 代表本地开发(测试)环境 还是 生产环境
 * in/out : 代表的是国内还是国外
 */
export default apiUrl = {
    "test": 'http://192.168.1.42/api',
    "test-in": 'http://192.168.1.42/api',
    "test-out": 'http://192.168.1.42/api',
    "prod-in": `https://api${domain}`,
    "prod-out": `https://api1${domain}`,
    socketURL:'http://192.168.1.42:9999'
}