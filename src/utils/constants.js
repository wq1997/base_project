import { FormattedMessage  } from 'umi'
import dayjs from 'dayjs';

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
export const AIR_API = 'https://devapi.qweather.com/v7/air/now?';
export const WETHER_KEY = '4e50b674eed8402c8a70c8155690a0e1';
export const alarmTableColums = [
    {
        title: <FormattedMessage id='设备类型'/>,
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: <FormattedMessage id='告警等级'/>,
        dataIndex: 'prior',
        key: 'prior',
    },
    {
        title: <FormattedMessage id='告警描述'/>,
        dataIndex: 'desc',
        key: 'desc',
    },
    {
        title: <FormattedMessage id='设备名称'/>,
        dataIndex: 'deviceName',
        key: 'deviceName',
    },
    {
        title: <FormattedMessage id='并网点'/>,
        dataIndex: 'sn',
        key: 'sn',
    },
    {
        title: <FormattedMessage id='电站名称'/>,
        dataIndex: 'plantName',
        key: 'plantName',
    },
   
    {
        title: <FormattedMessage id='开始时间'/>,
        dataIndex: 'begin',
        key: 'begin',
        render:(val)=>{
            return val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : ''
        }
    },
    {
        title: <FormattedMessage id='结束时间'/>,
        dataIndex: 'end',
        key: 'end',
        render:(val)=>{
            return val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : ''
        }
    },
];
export const RealtimeData = [];


export const profitTable = [
    {
        title: <FormattedMessage id='id'/>,
        dataIndex: 'id',
        key: 'id',
        width: 100,
    },
    {
        title: <FormattedMessage id='日期'/>,
        dataIndex: 'date',
        key: 'date',
        width: 100,
    },
    {
        title: <FormattedMessage id='充电成本（元）'/>,
        className:'chargeProfit',
        children: [
            {
                title: <FormattedMessage id='尖电'/>,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='峰电'/>,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='平电'/>,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='谷电'/>,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='总计'/>,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
        ],
    },
    {
        title: <FormattedMessage id='放电收益（元）'/>,
        className:'disChargeProfit',
        children: [
            {
                title: <FormattedMessage id='尖电'/>,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='峰电'/>,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='平电'/>,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='谷电'/>,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='总计'/>,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },

        ],
    },
    {
        title: <FormattedMessage id='实际收益'/>,
        dataIndex: 'date',
        key: 'date',
        width: 100,
    },

];

export const timeZoneList = (function () {
    let list = [];
    Array.from({ length: 12 }).forEach((_, i) => {
        if (i !== 0) {
            list = [
                ...list,
                { label: `UTC+${i}`, value: `UTC+${i}` },
                { label: `UTC-${i}`, value: `UTC-${i}` },
            ];
        } else {
            list.push({ label: "UTC+0", value: "UTC+0" });
        }
    });
    return list;
})();

export const pcsDataType= [
    {
        value:169,
        label:<FormattedMessage id='实时功率'/>,
    },
    {
        value:305,
        label:<FormattedMessage id='日充电量'/>,
    },
    {
        value:306 ,
        label:<FormattedMessage id='日放电量'/>,
    },
];

export const BmsDataType= [
    {
        value:181,
        label:<FormattedMessage id='电压'/>,
    },
    {
        value:182,
        label:<FormattedMessage id='电流'/>,
    },
    {
        value:183,
        label:<FormattedMessage id='SOC'/>,
    },
    {
        value:184,
        label:<FormattedMessage id='SOH'/>,
    },
      {
        value:303,
        label:<FormattedMessage id='日充'/>,
    },
    {
        value:304,
        label:<FormattedMessage id='日放'/>,
    },
];

export const BmcDataType= [
    {
        value:192 ,
        label:<FormattedMessage id='电压'/>,
    },
    {
        value:193 ,
        label:<FormattedMessage id='电流'/>,
    },
    {
        value:187 ,
        label:<FormattedMessage id='SOC'/>,
    },
    {
        value:194,
        label:<FormattedMessage id='SOH'/>,
    },
      {
        value:307 ,
        label:<FormattedMessage id='日充'/>,
    },
    {
        value:308 ,
        label:<FormattedMessage id='日放'/>,
    },
];


export const MgOcInitDataType= [
    {
        value:154,
        label:<FormattedMessage id='电表总功率'/>,
    },
    {
        value:175,
        label:<FormattedMessage id='BMS功率'/>,
    },
    
    {
        value:169,
        label:<FormattedMessage id='PCS功率'/>,
    },
    {
        value:301,
        label:<FormattedMessage id='日充电电量'/>,
    },
    {
        value:302,
        label:<FormattedMessage id='日放电电量'/>,
    },
    {
        value:183 ,
        label:<FormattedMessage id='SOC'/>,
    },
    {
        value:999 ,
        label:<FormattedMessage id='充放电效率'/>,
    },
];