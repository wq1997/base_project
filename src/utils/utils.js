export const setLocalStorage = (key, value) => localStorage.setItem(key, value);
export const getLocalStorage = key => localStorage.getItem(key);


// mobile
export const getLabel = (columns, value) => {
    if(columns&&value&&columns[0]?.length>0&&value.length>0){
        const label = columns[0]?.find(item => item.value===value[0])?.label;
        return label;
    }
    return "";
}