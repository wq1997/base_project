export const PROJECT_NAME = "采日能源光伏监控系统";
export const PUBLIC_FILE_PATH = "https://energy.sermatec-cloud.com/static/";
export const DEFAULT_PAGINATION = {
    current: 1,
    pageSize: 15,
    total: 0,
    showQuickJumper: false,
    showSizeChanger: false,
};
export const FORM_REQUIRED_RULE = { required: true, message: "请输入必填字段" };
export const FORM_FORBIDDEN_SPACE = { pattern: /^[^\s]*$/, message: "禁止输入空格" };
export const FORM_ONLY_NUMBER = { pattern: /^[1-9]\d*$/, message: "只能输入数字" };
export const TELPHONE_REG = new RegExp(
    /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
);
export const EMAIL_REG = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/);
export const ALL_SPACE_REG = new RegExp(/\S/);
export const PASSWORD_RGE =
    /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z-`=\[\];',.~!@#$%^&*()_+|{}:"?]{8,16}$/;
export const USERNAME_RE = {
    reg: /^[a-zA-Z0-9_]{8,16}$/,
    des: "8-16个字符，只能填写英文、数字、下划线",
};
/*  
    8001->开机
    8002->关机
    8004->直流电弧故障清除
    8005->故障复位
    8006->有功调节
    8007->无功调节
    8008->功率因数调节
*/
export const COMMANDIDS = [8001, 8002, 8003, 8005, 8006, 8007, 8008];
