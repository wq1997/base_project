import { FormattedMessage } from 'umi'
import { Pagination, Select, Space, theme, Button, Modal } from "antd"

export const DEFAULT_PAGINATION = { current: 1, pageSize: 10, total: 0, showQuickJumper: true };
export const FORM_REQUIRED_RULE = { required: true, message: <FormattedMessage id='请输入必填字段'/> };
export const FORM_FORBIDDEN_SPACE = { pattern: /^[^\s]*$/, message: '禁止输入空格' };
export const FORM_ONLY_NUMBER = { pattern: /^[1-9]\d*$/, message: '只能输入数字' };
export const TELPHONE_NUMBER_REG = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
export const ICON_PATH = "//at.alicdn.com/t/c/font_4191866_6iautgu0c8r.js";
export const PUBLIC_FILE_PATH = 'https://energy.sermatec-cloud.com/static/';
export const SYSTEM_NAME = '采日能源储能管理系统'
export const MAP_KEY = '2dca0cb2ced6ced6030c26376186faee';
export const WETHER_API = 'https://devapi.qweather.com/v7/weather/3d?';
export const AIR_API = 'https://devapi.qweather.com/v7/air/now?';
export const WETHER_KEY = '4e50b674eed8402c8a70c8155690a0e1';
export const alarmTableColums = [
    {
        title: <FormattedMessage id='Sn' />,
        dataIndex: 'sn',
        key: 'Sn',
    },
    {
        title: <FormattedMessage id='告警等级' />,
        dataIndex: 'priorDesc',
        key: '告警等级',
    },
    {
        title: <FormattedMessage id='告警描述' />,
        dataIndex: 'desc',
        key: '告警描述',
    },
    {
        title: <FormattedMessage id='设备名称' />,
        dataIndex: 'deviceName',
        key: '设备名称',
    },

    {
        title: <FormattedMessage id='电站名称' />,
        dataIndex: 'plantName',
        key: '电站名称',
    },

    {
        title: <FormattedMessage id='开始时间' />,
        dataIndex: 'beginS',
        key: '开始时间',
    },
    {
        title: <FormattedMessage id='结束时间' />,
        dataIndex: 'endS',
        key: '结束时间',
    },
];
export const RealtimeData = [];




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

export const pcsDataType = [
    {
        value: 169,
        label: '实时功率',
    },
    {
        value: 305,
        label: '日充电量',
    },
    {
        value: 306,
        label: '日放电量',
    },
];


export const alarmLevel = [
    {
        label: <FormattedMessage id='严重' />,
        value: '1',
        key: '严重',
    },
    {
        label: <FormattedMessage id='高级' />,
        value: '2',
        key: '高级',
    },
    {
        label: <FormattedMessage id='中级' />,
        value: '3',
        key: '中级',
    },
    {
        label: <FormattedMessage id='低级' />,
        value: '4',
        key: '低级',
    }
];
export const optionType = [
    {
        label: <FormattedMessage id='215户外柜' />,
        value: 16,
    },
    // {
    //     label: <FormattedMessage id='232户外柜' />,
    //     value: 13,
    // },
     {
        label: <FormattedMessage id='372户外柜' />,
        value: 14,
    }]

    export const userTable = [
        {
            title: <FormattedMessage id='用户名' />,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <FormattedMessage id='角色' />,
            dataIndex: 'roleId',
            key: 'roleId',
            render:(val)=>{
              return  val==1 ? <FormattedMessage id='普通用户' />:val==2?<FormattedMessage id='管理员' />:<FormattedMessage id='超级管理员' />
            }
        },
        {
            title: <FormattedMessage id='手机' />,
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: <FormattedMessage id='邮箱' />,
            dataIndex: 'mail',
            key: 'mail',
        },
        {
            title: <FormattedMessage id='所属上级' />,
            dataIndex: 'parentName',
            key: 'parentName',
        },
        {
            title: <FormattedMessage id='备注' />,
            dataIndex: 'desc',
            key: 'desc',
        },
       
    ]