export const getBaseUrl = () => {
  const { API_URL = '' } = process.env;
  return API_URL;
};
export const setLocalStorage = (key, value) => localStorage.setItem(key, value);
export const getLocalStorage = key => localStorage.getItem(key);
export const MAP_KEY = 'b6b9b071ea496e3aa5c1e2e068275f42';
export const removeLocalStorage = key => localStorage.removeItem(key);
export const downLoadUrl=`https://domestic-power.sermatec-cloud.com/download/`;
import JSEncrypt from 'jsencrypt'

export const getEncrypt=(key,data) =>{
  let encrypt = new JSEncrypt()
  // 设置公钥
  encrypt.setPublicKey(key)
  return encrypt.encrypt(data)
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

export function getQueryString(name) {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  let r = window.location.search.substr(1).match(reg);
  let context = '';
  if (r != null) context = r[2];
  reg = null;
  r = null;
  return context == null || context == '' || context == 'undefined' ? '' : context;
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

/***  
 *    前端生成excel 表格(基于 js-export-excel 插件的二次封装)
 *    fileName:excel文件名
 *    sheetData: 第一行的实例数据
 *    sheetFilter:  和  sheetData 一一对应
 *    sheetHeader:表头
 *    option.datas:  一个对象表示一个表格
 *    columnWidths: 列宽
 *    
 * ***/
export const  downLoadExcelMode = (fileName,sheetData,sheetFilter,sheetHeader,sheetName="sheet") =>{
  var option={};
  option.fileName = fileName
  option.datas=[{
       sheetData:sheetData,
       sheetName:sheetName,
       sheetFilter:sheetFilter,
       sheetHeader:sheetHeader,
       columnWidths: ['8','4'],
      },
  ];
  const ExportJsonExcel = require("js-export-excel");
  var toExcel=new ExportJsonExcel(option);
  toExcel.saveExcel();
}


export function download(url, filename) {
  const link = document.createElement("a");
  link.target='_blank';
  link.href = `${url}${filename}`;
  link.download = filename;
  link.click();
}

export const cloneObject = (object) => JSON.parse(JSON.stringify(object));

export const translateNmberToTime = (value) => {
  if(Number(value)<=9) return `0${value}`;
  return `${value}`;
}