export default [
    {
        name: '电站统计',
        path: '/index/plant',
        component: "@/pages/plant",
    },
    {
        name: '设备中心',
        path: '/index/device',
        component: "@/pages/device",
     
    },
    // {
    //     name: '策略配置',
    //     path: '/index/policyConfiguration',
    //     component: "@/pages/policyConfiguration"
    // },
    // {
    //     name: '收益统计',
    //     path: '/index/statistics',
    //     routes: [
    //         { name: '电量统计', path: '/index/statistics/electricity', component: "@/pages/statistics/electricity" },
    //         { name: '高级分析', path: '/index/statistics/highAnysis', component: "@/pages/statistics/highAnysis"},
    //         { name: '历史告警', path: '/index/statistics/revenue', component: "@/pages/statistics/revenue" },
    //         { name: '监测曲线', path: '/index/statistics/monitoringCurves', component: "@/pages/statistics/monitoringCurves" },
    //     ]
    // },
    {
        name: '告警中心',
        path: '/index/alarm',
        routes: [
            { name: '实时告警', path: '/index/alarm/realtimeAlarm', component: "@/pages/alarm/realtimeAlarm" },
            { name: '历史告警', path: '/index/alarm/historyAlarm', component: "@/pages/alarm/historyAlarm" },
        ]
    },
    {
        name: '系统管理',
        path: '/index/systemManagement',
        routes: [
            { name: '用户中心', path: '/index/systemManagement/user', component: "@/pages/systemManagement/user" },
            { name: '操作记录', path: '/index/systemManagement/operationRecords', component: "@/pages/systemManagement/operationRecords" },
        ]
    },
]