import dayjs from 'dayjs';

export const setLocalStorage = (key, value) => localStorage.setItem(key, value);
export const getLocalStorage = key => localStorage.getItem(key);
export const MAP_KEY = 'b6b9b071ea496e3aa5c1e2e068275f42';
export const removeLocalStorage = key => localStorage.removeItem(key);
import JSEncrypt from 'jsencrypt'

export const getEncrypt = (key, data) => {
  let encrypt = new JSEncrypt()
  // 设置公钥
  encrypt.setPublicKey(key)
  return encrypt.encrypt(data)
};

export const splitString = (value, length) => {
  if (value.length < length) return value;
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
    link.click();
    document.body.removeChild(link)
  }
}

// mobile
export const getLabel = (columns, value) => {
  if (columns && value && columns[0]?.length > 0 && value.length > 0) {
    const label = columns[0]?.find(item => item.value === value[0])?.label;
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
export const downLoadExcelMode = (fileName, sheetData, sheetFilter, sheetHeader, sheetName = "sheet") => {
  var option = {};
  option.fileName = fileName
  option.datas = [{
    sheetData: sheetData,
    sheetName: sheetName,
    sheetFilter: sheetFilter,
    sheetHeader: sheetHeader,
    columnWidths: ['8', '4'],
  },
  ];
  const ExportJsonExcel = require("js-export-excel");
  var toExcel = new ExportJsonExcel(option);
  toExcel.saveExcel();
}

export const fillInt = (max, includeZero) => {
  if (includeZero) {
    return new Array(max + 1).fill(0).map((item, index) => {
      if (index <= 9) {
        return `0${index}`
      }
      return `${index}`;
    });
  } else {
    return new Array(max).fill(0).map((item, index) => {
      if (index < 9) {
        return `0${index + 1}`
      }
      return `${index + 1}`;
    });
  }
}

// 选择时间段是否与检测时间段重叠
export const isOverlap = (startModel, endModel, isStart, isEnd) => {
  // 将选择的时间段处理为Int格式判断,this.startTime定义为选择的时间段开始时间，this.endTime定义为选择的时间段结束时间
  // 此处的this.startTime = "09:00", this.endTime = "18:00"（举例）
  let startTime = parseInt(startModel.split(':')[0] + startModel.split(':')[1] + startModel.split(':')[2])    //900
  let endTime = parseInt(endModel.split(':')[0] + endModel.split(':')[1] + endModel.split(':')[2])    //1800
  // 将检测的时间段处理为Int格式判断，同上
  let isStartTime = parseInt(isStart.split(':')[0] + isStart.split(':')[1] + isStart.split(':')[2])
  let isEndTime = parseInt(isEnd.split(':')[0] + isEnd.split(':')[1] + isEnd.split(':')[2])
  // 如果检测时间段存在，并且选择时间为全天，则肯定重复，这个判断的前提是检测时间段不为空
  if (startTime === endTime) {
    return false
  }
  /**************** 判断时间是否重叠,得先判断开始时间是否小于结束时间 ****************/
  // 说明：startTime: 选择时间段的开始时间，endTime: 选择时间段的结束时间
  // 说明：isStartTime: 检测时间段的开始时间,isEndTime: 检测时间段的结束时间
  // 前提一：检测时间段: 开始时间小于结束时间，即在同一天内
  if (isStartTime < isEndTime) {
    // 判断选择时间段分为三种情              况，即可满足该区间与检测时间段不会重复
    // 情况一：时间段在检测时间段左边并且不跨越00：00，即满足startTime<endTime<=isStartTime
    // 情况二：时间段在检测时间段右边并且不跨越00：00,即满足isEndTime<=startTime<endTime
    // 情况三：时间段跨越00：00,即满足start>end且(startTime>=isEndTime并且endTime<=isStartTime)
    if (startTime < endTime && endTime <= isStartTime) {
      return true
    } else if (isEndTime <= startTime && startTime < endTime) {
      return true
    } else if (startTime > endTime && startTime >= isEndTime && endTime <= isStartTime) {
      return true
    } else {
      return false
    }
  } else if (isStartTime > isEndTime) {
    // 前提二：检测时间段: 开始时间大于结束时间，即跨越00：00到第二天，为了保证不会与选择时间段重叠，即选择时间段不可能跨越00：00到第二天
    // 判断选择时间段分为一种情况，即可满足该区间不与检测时间段重复，该时间段在检测时间段左边或是右边并且不跨越00：00的情况都是同一种情况
    // 即满足isEndTime<=startTime<endTime<=isStartTime
    if (isEndTime <= startTime && startTime < endTime && endTime <= isStartTime) {
      return true
    } else {
      return false
    }
  } else {
    // 前提三：检测时间段为全天时间段，例如09：00~09：00，选择时间段无论怎么选都会重叠
    return false
  }
  return true
};


//根据 @CRIMX 的答案进行了修改后的逻辑：


export const is24HoursInOneDay = (data) => {
  // cs 指定某天的00:00:00
  // cn 指定某天的24:00:00
  let hours = 0;
  let min = 0;
  let sec = 0;
  data.map(it => {
    let start = dayjs(it.startTime).format('HH:mm:ss').split(':');
    let end = dayjs(it.endTime).format('HH:mm:ss').split(':');
    hours = end[0] - start[0] + hours;
    min = end[1] - start[1] + min;
    sec = end[2] - start[2] + sec;
  })
  console.log(hours * 60 * 60 + min * 60 + sec);
  return hours * 60 * 60 + min * 60 + sec == 86399-(data.length-1);
}

