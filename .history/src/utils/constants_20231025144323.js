 export const echartsColor = undefined && ["#5470C6", "#5AABFF", "#FAC858", "#91CC75"];
export const DEFAULT_PAGINATION = { current: 1, pageSize: 10, total: 0, showQuickJumper: true };
export const FORM_REQUIRED_RULE = { required: true, message: "请输入必填字段" };
export const FORM_FORBIDDEN_SPACE = { pattern: /^[^\s]*$/, message: "禁止输入空格" };
export const FORM_ONLY_NUMBER = { pattern: /^[1-9]\d*$/, message: "只能输入数字" };
export const TELPHONE_NUMBER_REG = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
export const STATUS_ENUM = {
    Declared: "待审核",
    Winning: "已中标",
    Lose: "未中标",
};
export const STATUS_COLOR = {
    Created: "#1677ff",
    Declared: token.colorPrimary,
    Winning: "#389e0d",
    Lose: "#000",
};
