const BASE_FILE_URL = "https://mnoapi.sermatec-cloud.com";
const XLSX = require("xlsx");

const analyseExcelToJson = (file) => {
    return new Promise((resolve, reject) => {
        if (file instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const arrayBuffer = reader.result;
                const options = { type: 'array' };
                const workbook = XLSX.read(arrayBuffer, options);
                const sheetName = workbook.SheetNames;
                const sheet = workbook.Sheets[sheetName];
                resolve(XLSX.utils.sheet_to_json(sheet));
            };
            reader.readAsArrayBuffer(file);
        } else {
            reject(new Error('入参不是 File 类型'));
        }
    });
};

function getFileFromUrl(url, fileName) {
    return new Promise((resolve, reject) => {
        var blob = null;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader('Accept', 'image/png');
        xhr.responseType = "blob";
        // 加载时处理
        xhr.onload = () => {
            // 获取返回结果
            blob = xhr.response;
            let file = new File([blob], fileName, { type: 'image/png' });
            // 返回结果
            resolve(file);
        };
        xhr.onerror = (e) => {
            reject(e)
        };
        // 发送
        xhr.send();
    });
}

export const getTranslate = async (type) => {
    let data = {};
    const file = await getFileFromUrl(BASE_FILE_URL + `/translate/翻译.xlsx?${Math.random()}`, '翻译.xlsx');
    const translateList = await analyseExcelToJson(file);
    if(type==="zh-CN"){
        const typeList = translateList?.map(item => item?.[type])
        typeList?.forEach(item => {
            data[item] = item;
        }) 
    }else{
        const keyList = translateList?.map(item => item?.["zh-CN"]);
        const typeList = translateList?.map(item => item?.[type]);
        keyList?.forEach((key, index) => {
            data[key] = typeList[index];
        })
    }
    return data;
}