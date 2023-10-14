export const setLocalStorage = (key, value) => localStorage.setItem(key, value);
export const getLocalStorage = key => localStorage.getItem(key);

export function getQueryString(name) {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    let r = window.location.search.substr(1).match(reg);
    let context = '';
    if (r != null) context = r[2];
    reg = null;
    r = null;
    return context == null || context == '' || context == 'undefined' ? '' : context;
}
  
export function addColorAlpha(colorCode, alpha){
    if(colorCode.charAt(0)==="#"){
        colorCode = colorCode.slice(1);
        let r = parseInt(colorCode.substring(0,2),16),
            g = parseInt(colorCode.substring(2,4),16),
            b = parseInt(colorCode.substring(4),16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }else if(colorCode.slice(0,4)==="rgb("){
        let rgb = colorCode.slice(4,-1).split(',');
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
    }
}