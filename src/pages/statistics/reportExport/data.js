/**
 * label 显示名称
 * value 传递给后端的可以 选择的时候提交
 * data 数值
 */
import dayjs from 'dayjs';

export const data = {
    baseData: {
        title: '电站基础数据',
        data: [
            {
                label: '电站名称',
                value: "name",
                data: ""
            },
            {
                label: '电站类型',
                value: "type",
                data: ""
            },
            {
                label: '建站日期',
                value: "installDate",
                data: ''
            },
            {
                label: '电站位置',
                value: "position",
                data: ''
            },
            {
                label: '时区',
                value: 'timeZone',
                data: ""
            },
            {
                label: '货币',
                value: 'priceUnit',
                data: ""
            },
            {
                label: '并网日期',
                value: 'networkDate',
                data: ""
            },
            {
                label: '安全运行天数',
                value: 'safeOperatingDays',
                data: ""
            },
            {
                label: '储能额定功率',
                value: 'designPower',
                data: ""
            },
            {
                label: '储能装机容量',
                value: 'capacity',
                data: ""
            },
            {
                label: '光伏装机容量',
                value: 'pvCapacity',
                data: ""
            },
            {
                label: '充电桩装机容量',
                value: 'chargePileCapacity',
                data: ""
            },
        ]
    },
    runData: {
        title: '电站运行数据',
        data: [
            {
                label: '严重告警数',
                value: "alarmNumber",
                data: ''
            },
            {
                label: '并网量',
                value: "gridTotal",
                data: ''
            },
            {
                label: '光伏发电量',
                value: "pvDischarge",
                data: ''
            },
            {
                label: '充电桩充电量',
                value: "csCharge",
                data: ''
            },
            {
                label: '储能充电电量',
                value: "totalCharge",
                data: ''
            },
            {
                label: '储能放电电量',
                value: "totalDischarge",
                data: ''
            },
            {
                label: '储能充电成本',
                value: "chargingCosts",
                data: ''
            },
            {
                label: '储能放电收益',
                value: "dischargeGains",
                data: '',
            },
            {
                label: '储能充放电效率',
                value: "energyEfficiency",
                data: '',
            },
        ]
    },
    electricReportData: {
        title: '电量报表',
        data: [
            {
                label: '光伏',
                value: "光伏"
            },
            {
                label: '储能',
                value: "储能"
            },
            {
                label: '充电桩',
                value: "充电桩"
            },
        ]
    },
    incomeData: {
        title: '收益报表',
        data: [
            {
                label: '光伏',
                value: "光伏"
            },
            {
                label: '储能',
                value: "储能"
            },
            {
                label: '充电桩',
                value: "充电桩"
            },
        ]
    }
}


export const inCome = {
    energyIncome: [
        {
            title: '',
            children: [{
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                width: 100,
                render: (text, record, index) => index + 1,
            },
            {
                title: '日期',
                dataIndex: 'date',
                key: 'date',
                width: 100,
                // render: (val) => {
                //     return val ? dayjs(val).format('YYYY-MM-DD') : ''
                // }
            },]
        },
        {
            title: '充电成本（元）',
            children: [
                {
                    title: '尖电',
                    dataIndex: 'tipInFee',
                    key: 'tipInFee',
                    width: 150,
                },
                {
                    title: '峰电',
                    dataIndex: 'peakInFee',
                    key: 'peakInFee',
                    width: 150,
                },
                {
                    title: '平电',
                    dataIndex: 'flatInFee',
                    key: 'flatInFee',
                    width: 150,
                },
                {
                    title: '谷电',
                    dataIndex: 'valleyInFee',
                    key: 'valleyInFee',
                    width: 150,
                },
                {
                    title: '总计',
                    dataIndex: 'dayInFee',
                    key: 'dayInFee',
                    width: 150,


                },
            ],
        },
        {
            title: '放电收益（元）',
            children: [
                {
                    title: '尖电',
                    dataIndex: 'tipOutFee',
                    key: 'tipOutFee',
                    width: 150,


                },
                {
                    title: '峰电',
                    dataIndex: 'peakOutFee',
                    key: 'peakOutFee',
                    width: 150,
                },
                {
                    title: '平电',
                    dataIndex: 'flatOutFee',
                    key: 'flatOutFee',
                    width: 150,
                },
                {
                    title: '谷电',
                    dataIndex: 'valleyOutFee',
                    key: 'valleyOutFee',
                    width: 150,
                },
                {
                    title: '总计',
                    dataIndex: 'dayOutFee',
                    key: 'dayOutFee',
                    width: 150,
                },
            ],
        },
        {
            title: '',
            children: [{
                title: '实际收益',
                dataIndex: 'dayEarning',
                key: 'dayEarning',
                width: 100,
            }],
        }

    ],
    chargePileIncome: [
        {
            title: '充电成本（元）',
            children: [
                {
                    title: '序号',
                    dataIndex: 'id',

                    key: 'id',
                    width: 100,
                    render: (text, record, index) => index + 1,
                },
                {
                    title: '日期',
                    dataIndex: 'date',
                    key: 'date',
                    width: 100,
                    // render: (val) => {
                    //     return val ? dayjs(val).format('YYYY-MM-DD') : ''
                    // }

                },
                {
                    title: '尖电',
                    dataIndex: 'tipInFee',
                    key: 'tipInFee',
                    width: 150,


                },
                {
                    title: '峰电',
                    dataIndex: 'peakInFee',
                    key: 'peakInFee',
                    width: 150,
                },
                {
                    title: '平电',
                    dataIndex: 'flatInFee',
                    key: 'flatInFee',
                    width: 150,
                },
                {
                    title: '谷电',
                    dataIndex: 'valleyInFee',
                    key: 'valleyInFee',
                    width: 150,
                },
                {
                    title: '总计',
                    dataIndex: 'dayInFee',
                    key: 'dayInFee',
                    width: 150,
                },
            ],
        },

    ],
    pvIncome: [
        {
            title: '发电收益（元）',
            children: [
                {
                    title: '序号',
                    dataIndex: 'id',
                    key: 'id',
                    width: 100,
                    render: (text, record, index) => index + 1,
                },
                {
                    title: '日期',
                    dataIndex: 'date',
                    key: 'date',
                    width: 100,
                    // render: (val) => {
                    //     return val ? dayjs(val).format('YYYY-MM-DD') : ''
                    // }
                },
                {
                    title: '尖电',
                    dataIndex: 'tipOutFee',
                    key: 'tipOutFee',
                    width: 150,
                },
                {
                    title: '峰电',
                    dataIndex: 'peakOutFee',
                    key: 'peakOutFee',
                    width: 150,
                },
                {
                    title: '平电',
                    dataIndex: 'flatOutFee',
                    key: 'flatOutFee',
                    width: 150,
                },
                {
                    title: '谷电',
                    dataIndex: 'valleyOutFee',
                    key: 'valleyOutFee',
                    width: 150,
                },
                {
                    title: '总计',
                    dataIndex: 'dayOutFee',
                    key: 'dayOutFee',
                    width: 150,
                },

            ],
        },

    ],

};

export const energy = {
    energyEnergy: [
        {
            title: '',
            children: [{
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                width: 100,
                render: (text, record, index) => index + 1,
            },

            {
                title: '日期',
                dataIndex: 'date',
                key: 'date',
                width: 100,
                // render: (val) => {
                //     return val ? dayjs(val).format('YYYY-MM-DD') : ''
                // }
            },
            ]
        },
        {
            title: '充电量（kWh）',
            children: [
                {
                    title: '尖电',
                    dataIndex: 'tipInEnergy',
                    key: 'tipInEnergy',
                    width: 150,
                },
                {
                    title: '峰电',
                    dataIndex: 'peakInEnergy',
                    key: 'peakInEnergy',
                    width: 150,
                },
                {
                    title: '平电',
                    dataIndex: 'flatInEnergy',
                    key: 'flatInEnergy',
                    width: 150,
                },
                {
                    title: '谷电',
                    dataIndex: 'valleyInEnergy',
                    key: 'valleyInEnergy',
                    width: 150,
                },
                {
                    title: '总计',
                    dataIndex: 'dayInEnergy',
                    key: 'dayInEnergy',
                    width: 150,
                },
            ],
        },
        {
            title: '放电量（kWh）',
            children: [
                {
                    title: '尖电',
                    dataIndex: 'tipOutEnergy',
                    key: 'tipOutEnergy',
                    width: 150,
                },
                {
                    title: '峰电',
                    dataIndex: 'peakOutEnergy',
                    key: 'peakOutEnergy',
                    width: 150,
                },
                {
                    title: '平电',
                    dataIndex: 'flatOutEnergy',
                    key: 'flatOutEnergy',
                    width: 150,
                },
                {
                    title: '谷电',
                    dataIndex: 'valleyOutEnergy',
                    key: 'valleyOutEnergy',
                    width: 150,
                },
                {
                    title: '总计',
                    dataIndex: 'dayOutEnergy',
                    key: 'dayOutEnergy',
                    width: 150,
                },
                {
                    title: '充放电效率',
                    dataIndex: 'efficiency',
                    key: 'efficiency',
                    width: 150,
                    render:(val,rec)=>{
                      return `${(rec.dayOutEnergy/rec.dayInEnergy*100).toFixed(2)}%`  
                    }
                   }
            ],
        },
    ],

    chargePileEnergy: [
        {
            title: '',
            children: [{
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                width: 100,
                render: (text, record, index) => index + 1,
            },

            {
                title: '日期',
                dataIndex: 'date',
                key: 'date',
                width: 100,
                // render: (val) => {
                //     return val ? dayjs(val).format('YYYY-MM-DD') : ''
                // }
            },
            ]
        },
        {
            title: '充电量（kWh）',
            children: [
                {
                    title: '尖电',
                    dataIndex: 'tipInEnergy',
                    key: 'tipInEnergy',
                    width: 150,
                },
                {
                    title: '峰电',
                    dataIndex: 'peakInEnergy',
                    key: 'peakInEnergy',
                    width: 150,
                },
                {
                    title: '平电',
                    dataIndex: 'flatInEnergy',
                    key: 'flatInEnergy',
                    width: 150,
                },
                {
                    title: '谷电',
                    dataIndex: 'valleyInEnergy',
                    key: 'valleyInEnergy',
                    width: 150,
                },
                {
                    title: '总计',
                    dataIndex: 'dayInEnergy',
                    key: 'dayInEnergy',
                    width: 150,
                },
            ],
        },
        {
            title: '用电量（kWh）',
            children: [
                {
                    title: '尖电',
                    dataIndex: 'tipOutEnergy',
                    key: 'tipOutEnergy',
                    width: 150,
                },
                {
                    title: '峰电',
                    dataIndex: 'peakOutEnergy',
                    key: 'peakOutEnergy',
                    width: 150,
                },
                {
                    title: '平电',
                    dataIndex: 'flatOutEnergy',
                    key: 'flatOutEnergy',
                    width: 150,
                },
                {
                    title: '谷电',
                    dataIndex: 'valleyOutEnergy',
                    key: 'valleyOutEnergy',
                    width: 150,
                },
                {
                    title: '总计',
                    dataIndex: 'dayOutEnergy',
                    key: 'dayOutEnergy',
                    width: 150,
                },

            ],
        },
    ],
    pvEnergy: [
        {
            title: '',
            children: [{
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                width: 100,
                render: (text, record, index) => index + 1,
            },
            {
                title: '日期',
                dataIndex: 'date',
                key: 'date',
                width: 100,
                // render: (val) => {
                //     return val ? dayjs(val).format('YYYY-MM-DD') : ''
                // }
            },
            ]
        },
        {
            title: '发电量（kWh）',
            children: [
                {
                    title: '尖电',
                    dataIndex: 'tipInEnergy',
                    key: 'tipInEnergy',
                    width: 150,
                },
                {
                    title: '峰电',
                    dataIndex: 'peakInEnergy',
                    key: 'peakInEnergy',
                    width: 150,
                },
                {
                    title: '平电',
                    dataIndex: 'flatInEnergy',
                    key: 'flatInEnergy',
                    width: 150,
                },
                {
                    title: '谷电',
                    dataIndex: 'valleyInEnergy',
                    key: 'valleyInEnergy',
                    width: 150,
                },
                {
                    title: '总计',
                    dataIndex: 'dayInEnergy',
                    key: 'dayInEnergy',
                    width: 150,
                },
            ],
        },
        {
            title: '上网电量（kWh）',
            children: [
                {
                    title: '尖电',
                    dataIndex: 'tipOutEnergy',
                    key: 'tipOutEnergy',
                    width: 150,
                },
                {
                    title: '峰电',
                    dataIndex: 'peakOutEnergy',
                    key: 'peakOutEnergy',
                    width: 150,
                },
                {
                    title: '平电',
                    dataIndex: 'flatOutEnergy',
                    key: 'flatOutEnergy',
                    width: 150,
                },
                {
                    title: '谷电',
                    dataIndex: 'valleyOutEnergy',
                    key: 'valleyOutEnergy',
                    width: 150,
                },
                {
                    title: '总计',
                    dataIndex: 'dayOutEnergy',
                    key: 'dayOutEnergy',
                    width: 150,
                },
            ],
        },
    ],
}
