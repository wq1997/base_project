export default [
    {
        name: '总览',
        path: '/index/home',
        component: "@/pages/home",
    },
    {
        name: '设备',
        path: '/index/device',
        routes: [
            { name: 'PCS', path: '/index/device/energyPcs', component: "@/pages/device/energyPcs" },
            { name: 'BMS', path: '/index/device/energyBms', component: "@/pages/device/energyBms" },
            { name: '户外柜', path: '/index/device/energyOut', component: "@/pages/device/energyOut" },
            { name: '光伏', path: '/index/device/photovoltaic', component: "@/pages/device/photovoltaic" },
            { name: '充电桩', path: '/index/device/chargingStation', component: "@/pages/device/chargingStation" },
        ]
    },
    {
        name: '报表',
        path: '/index/statement',
        routes: [
            { name: '  统计数据', path: '/index/statement/statisticalData', component: "@/pages/statement/statisticalData" },
            { name: '数据对比', path: '/index/statement/dataComparison', component: "@/pages/statement/dataComparison" },
            { name: '报表导出', path: '/index/statement/reportExport', component: "@/pages/statement/reportExport" },
        ]
    },
    {
        name: '收益',
        path: '/index/profit',
        routes: [
            { name: '收益明细', path: '/index/profit/revenueDetails', component: "@/pages/profit/revenueDetails" },
            { name: '收益统计', path: '/index/profit/revenueStatistics', component: "@/pages/profit/revenueStatistics" },
        ]
    },
    {
        name: '告警',
        path: '/index/alarm',
        routes: [
            { name: '实时告警', path: '/index/alarm/realtimeAlarm', component: "@/pages/alarm/realtimeAlarm" },
            { name: '历史告警', path: '/index/alarm/historyAlarm', component: "@/pages/alarm/historyAlarm" },
            { name: '告警规则', path: '/index/alarm/alarmRules', component: "@/pages/alarm/alarmRules" },
        ]
    },
    {
        name: '系统管理',
        path: '/index/systemManagement',
        routes: [
            { name: '策略配置', path: '/index/systemManagement/policyConfiguration', component: "@/pages/systemManagement/policyConfiguration" },
            { name: '用户管理', path: '/index/systemManagement/user', component: "@/pages/systemManagement/user" },
            { name: '操作记录', path: '/index/systemManagement/operationRecords', component: "@/pages/systemManagement/operationRecords" },
        ]
    },
]