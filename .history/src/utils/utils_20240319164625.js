import { JSEncrypt } from "jsencrypt";
export const setLocalStorage = (key, value) => localStorage.setItem(key, value);
export const getLocalStorage = key => localStorage.getItem(key);

const toType = obj => {
    if (obj == null) return obj + "";
    let type = typeof obj;
    if (/(object|function)/i.test(type)) {
        type = toString.call(obj);
        const [, res = "object"] = type.match(/^\[object (\w+)\]$/) || [];
        return res.toLowerCase();
    }
    return type;
};

export function getQueryString(name) {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
    let r = window.location.search.substr(1).match(reg);
    let context = "";
    if (r != null) context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}

export function addColorAlpha(colorCode, alpha) {
    if (colorCode.charAt(0) === "#") {
        colorCode = colorCode.slice(1);
        let r = parseInt(colorCode.substring(0, 2), 16),
            g = parseInt(colorCode.substring(2, 4), 16),
            b = parseInt(colorCode.substring(4), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else if (colorCode.slice(0, 4) === "rgb(") {
        let rgb = colorCode.slice(4, -1).split(",");
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
    }
}

export const getEncrypt = (key, str) => {
    const jsencrypt = new JSEncrypt();
    jsencrypt.setPublicKey(key);
    return jsencrypt.encrypt(str);
};

export const jsonToUrlParams = json => {
    if (toType(json) !== "object") return "";
    const paramsArr = Object.entries(json).filter(
        ([key, value]) => value !== undefined && value !== ""
    );
    if (!paramsArr.length) return "";
    let paramsUrl = paramsArr
        .map(([key, value]) => {
            if (typeof value == "string") value = value.trim();
            return `${key}=${encodeURIComponent(value)}`;
        })
        .join("&");
    return "?" + paramsUrl;
};


 
function getUrlParams(url) {
    // 通过 ? 分割获取后面的参数字符串
    let urlStr = url.split('?')[1]
    // 创建空对象存储参数
	let obj = {};
    // 再通过 & 将每一个参数单独分割出来
	let paramsArr = urlStr.split('&')
	for(let i = 0,len = paramsArr.length;i < len;i++){
        // 再通过 = 将每一个参数分割为 key:value 的形式
		let arr = paramsArr[i].split('=')
		obj[arr[0]] = arr[1];
	}
	return obj
}