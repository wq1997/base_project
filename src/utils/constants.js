export const PROJECT_NAME = "采日光伏监控系统";
export const PUBLIC_FILE_PATH = "https://energy.sermatec-cloud.com/static/";
export const DEFAULT_PAGINATION = { current: 1, pageSize: 10, total: 0, showQuickJumper: true };
export const FORM_REQUIRED_RULE = { required: true, message: "请输入必填字段" };
export const FORM_FORBIDDEN_SPACE = { pattern: /^[^\s]*$/, message: "禁止输入空格" };
export const FORM_ONLY_NUMBER = { pattern: /^[1-9]\d*$/, message: "只能输入数字" };
export const TELPHONE_REG = new RegExp(
    /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
);
export const EMAIL_REG = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/);
