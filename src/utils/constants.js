export const DEFAULT_PAGINATION = {current: 1, pageSize: 10, total: 0, showQuickJumper: true};
export const FORM_REQUIRED_RULE = {required: true, message: '请输入必填字段'};
export const FORM_FORBIDDEN_SPACE = {pattern: /^[^\s]*$/, message: '禁止输入空格'};
export const FORM_ONLY_NUMBER = {pattern: /^[1-9]\d*$/, message: '只能输入数字'};
export const TELPHONE_NUMBER_REG = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
export const ICON_PATH = "//at.alicdn.com/t/c/font_4191866_6iautgu0c8r.js";
export const PUBLIC_FILE_PATH = 'https://energy.sermatec-cloud.com/static/';
export const SYSTEM_NAME='采日能源数智化解决方案大屏'
export const MAP_KEY = '2dca0cb2ced6ced6030c26376186faee';
export const WETHER_API = 'https://devapi.qweather.com/v7/weather/3d?';
export const WETHER_KEY = '4e50b674eed8402c8a70c8155690a0e1';
export const alarmTableColums=[
    {
        title: '设备编码',
        dataIndex: 'deviceId',
        key: 'deviceId',
    },
    {
        title: '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
    },   
     {
        title: '告警描述',
        dataIndex: 'deviceDes',
        key: 'deviceDes',
    },
    {
        title: '告警等级',
        dataIndex: 'deviceLevel',
        key: 'deviceLevel',
    },
    {
        title: '开始时间',
        dataIndex: 'startT',
        key: 'startT',
    },
];

 