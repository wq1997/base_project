/**
 * label 显示名称
 * value 传递给后端的可以 选择的时候提交
 * data 数值
 */ 

export const data = {
    baseData: {
        title: '电站基础数据',
        data: [
            {
                label: '电站名称',
                value: "电站名称",
                data: "xxx"
            },
            {
                label: '电站类型',
                value: "电站类型",
                data: "储能"
            },
            {
                label: '电站位置',
                value: "电站位置",
                data: '上海市浦东新区'
            },
            {
                label: '时区',
                value: '时区',
                data: "UTF+8"
            },
            {
                label: '货币',
                value: '货币',
                data: "人民币"
            },
            {
                label: '并网日期',
                value: '并网日期',
                data: "2023.12.27"
            },
            {
                label: '安全运行天数',
                value: '安全运行天数',
                data: "10"
            },
            {
                label: '储能装机容量',
                value: '储能装机容量',
                data: "215kWh"
            },
            {
                label: '光伏装机容量',
                value: '光伏装机容量',
                data: "215kWh"
            },
            {
                label: '充电桩装机容量',
                value: '充电桩装机容量',
                data: "215kWh"
            },
        ]
    },
    runData: {
        title: '电站运行数据',
        data: [
            {
                label: '告警数',
                value: "告警数",
                data: 10
            },
            {
                label: '并网量',
                value: "并网量",
                data: '323.07kWh'
            },
            // {
            //     label: '电网买电量',
            //     value: "电网买电量",
            //     data: 0
            // },
            {
                label: '光伏发电量',
                value: "光伏发电量",
                data: '363kWh'
            },
            {
                label: '充电桩充电量',
                value: "充电桩充电量",
                data: '263kWh'
            },
            {
                label: '储能总充电量',
                value: "储能总充电量",
                data: '6340kWh'
            },
            {
                label: '储能总放电量',
                value: "储能总放电量",
                data: '5769.4kWh'
            },
            {
                label: '储能总充电次数',
                value: "储能总充电次数",
                data: 12
            },
            {
                label: '储能充放电效率',
                value: "储能充放电效率",
                data: '96.08%'
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