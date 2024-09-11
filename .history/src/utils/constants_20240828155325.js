export const PROJECT_NAME = "采日运维管理系统";
export const PUBLIC_FILE_PATH = "https://energy.sermatec-cloud.com/static/";
export const DEFAULT_PAGINATION = {
    current: 1,
    pageSize: 20,
    total: 0,
    showQuickJumper: false,
    showSizeChanger: false,
};
export const FORM_REQUIRED_RULE = { required: true, message: "请输入必填字段" };
export const FORM_FORBIDDEN_SPACE = { pattern: /^[^\s]*$/, message: "禁止输入空格" };
export const FORM_ONLY_NUMBER = { pattern: /^[1-9]\d*$/, message: "只能输入数字" };
export const TELPHONE_NUMBER_REG = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
export const TELPHONE_REG = new RegExp(
    /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
);
export const EMAIL_REG = {
    reg: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/,
    desc: "邮箱格式有误",
};
export const ALL_SPACE_REG = new RegExp(/\S/);
export const PASSWORD_REG = {
    reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z-`=\[\];',.~!@#$%^&*()_+|{}:"?]{8,16}$/,
    desc: "密码长度为8-16位，至少2种字符",
};

export const USERNAME_REG = {
    reg: /^[a-zA-Z0-9_]{8,16}$/,
    desc: "8-16个字符，只能填写英文、数字、下划线",
};

const baseURL = process.env.API_URL;
const UploadURL = baseURL + "/attachment/upload";
const downloadURL = baseURL + '/web/mes-file-info';
