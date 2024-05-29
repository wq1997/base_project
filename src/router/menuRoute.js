export default [
    {
        name: '总览',
        path: '/index',
        // component: "@/pages/home",
        routes: [
            {
                name: '总览',
                path: '/index/home',
                component: "@/pages/home",
            },
            { name: '2.5D', path: '/index/home/2.5d', component: "@/pages/react/Meta2d" },
        ]
    },
    {
        name: '设备',
        path: '/index/device',
        routes: [
           
            { name: '储能', path: '/index/device/energyStorage', component: "@/pages/device/energyStorage" },
            // { name: '光伏', path: '/index/device/photovoltaic', component: "@/pages/device/photovoltaic" },
            // { name: '充电桩', path: '/index/device/chargingStation', component: "@/pages/device/chargingStation" },
        ]
    },
    {
        name: '统计',
        path: '/index/statistics',
        routes: [
            { name: '电量统计', path: '/index/statistics/electricityStatistics', component: "@/pages/statistics/electricityStatistics" },
            // { name: '收益统计', path: '/index/statistics/revenueStatistics', component: "@/pages/statistics/revenueStatistics" },
            { name: '数据对比', path: '/index/statistics/dataComparison', component: "@/pages/statistics/dataComparison" },
            { name: '报表导出', path: '/index/statistics/reportExport', component: "@/pages/statistics/reportExport" },
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
        name: '场站设置',
        path: '/index/depotSettings',
        routes: [
            { name: '策略配置', path: '/index/depotSettings/policyConfiguration', component: "@/pages/depotSettings/policyConfiguration" },
            { name: '电站配置', path: '/index/depotSettings/powerStationConfig', component: "@/pages/depotSettings/powerStationConfig" },
            { name: '运维管理', path: '/index/depotSettings/operationManage', component: "@/pages/depotSettings/operationManage" },
        ]
    },
    {
        name: '系统管理',
        path: '/index/systemManagement',
        routes: [
            { name: '用户管理', path: '/index/systemManagement/user', component: "@/pages/systemManagement/user" },
            { name: '操作记录', path: '/index/systemManagement/operationRecords', component: "@/pages/systemManagement/operationRecords" },
        ]
    },
]