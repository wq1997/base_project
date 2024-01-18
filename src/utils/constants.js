import { Space } from "antd"

export const DEFAULT_PAGINATION = { current: 1, pageSize: 10, total: 0, showQuickJumper: true };
export const FORM_REQUIRED_RULE = { required: true, message: '请输入必填字段' };
export const FORM_FORBIDDEN_SPACE = { pattern: /^[^\s]*$/, message: '禁止输入空格' };
export const FORM_ONLY_NUMBER = { pattern: /^[1-9]\d*$/, message: '只能输入数字' };
export const TELPHONE_NUMBER_REG = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
export const ICON_PATH = "//at.alicdn.com/t/c/font_4191866_6iautgu0c8r.js";
export const PUBLIC_FILE_PATH = 'https://energy.sermatec-cloud.com/static/';
export const SYSTEM_NAME = '采日工商业微网孪生平台'
export const MAP_KEY = '2dca0cb2ced6ced6030c26376186faee';
export const WETHER_API = 'https://devapi.qweather.com/v7/weather/3d?';
export const WETHER_KEY = '4e50b674eed8402c8a70c8155690a0e1';
export const alarmTableColums = [
    {
        title: '设备类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '告警等级',
        dataIndex: 'prior',
        key: 'prior',
    },
    {
        title: '告警描述',
        dataIndex: 'desc',
        key: 'desc',
    },
    {
        title: '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
    },
    {
        title: '并网点',
        dataIndex: 'sn',
        key: 'sn',
    },
    {
        title: '电站名称',
        dataIndex: 'plantName',
        key: 'plantName',
    },
   
    {
        title: '开始时间',
        dataIndex: 'begin',
        key: 'begin',
    },
    {
        title: '结束时间',
        dataIndex: 'end',
        key: 'end',
    },
];
export const RealtimeData = [];


export const profitTable = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        width: 100,
    },
    {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        width: 100,
    },
    {
        title: '充电成本（元）',
        className:'chargeProfit',
        children: [
            {
                title: '尖电',
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: '峰电',
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: '平电',
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: '谷电',
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: '总计',
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
        ],
    },
    {
        title: '放电收益（元）',
        className:'disChargeProfit',
        children: [
            {
                title: '尖电',
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: '峰电',
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: '平电',
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: '谷电',
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: '总计',
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },

        ],
    },
    {
        title: '实际收益',
        dataIndex: 'date',
        key: 'date',
        width: 100,
    },

];
