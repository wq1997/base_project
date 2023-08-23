import { JSEncrypt } from "jsencrypt";

export const setLocalStorage = (key, value) => localStorage.setItem(key, value);
export const getLocalStorage = key => localStorage.getItem(key);
export const removeLocalStorage = key => localStorage.removeItem(key);


export const getEncrypt = (key, str) => {
    const jsencrypt = new JSEncrypt();
    jsencrypt.setPublicKey(key);
    return jsencrypt.encrypt(str);
};

export const splitString = (value, length) => {
    if(value.length<length) return value;
    return `${value.slice(0, length)}...`
}

export const downloadFile = (data) => {
      const link = document.createElement('a');
      link.style.display = 'none'
      const blob = new Blob([data.content]);
      link.href = URL.createObjectURL(blob)
      function isIE() {
        if (!!window.ActiveXObject || 'ActiveXObject' in window) {
          return true
        } else {
          return false
        }
      }
      if (data.fileName) {
        link.download = data.fileName //下载的文件名
      } else {
        const fileName = "file.xlsx";
        link.download = fileName
      }
      if (isIE()) {
        window.navigator.msSaveOrOpenBlob(blob, link.download)
      } else {
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
}

// mobile
export const getLabel = (columns, value) => {
    if(columns&&value&&columns[0]?.length>0&&value.length>0){
        const label = columns[0]?.find(item => item.value===value[0])?.label;
        return label;
    }
    return "";
}
