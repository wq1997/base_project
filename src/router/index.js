export default Routes = [
    { path: "/login", component: "@/pages/account/login" },
    { path: '/screen-plant-analysis', component: "@/pages/plantAnalysisScreen"},
    {
        path: "/",
        component: "@/pages/App",
        routes: [
            {
                path: "/",
                component: "@/layouts/baseLayout",
                routes: [
                    {
                        path: "/plant-monitoring/plant-overview",
                        component: "@/pages/plant/plantOverview",
                    },
                    {
                        path: "/plant-monitoring/plant-management",
                        component: "@/pages/plant/plantManagement",
                    },
                    { path: "/device-management", component: "@/pages/device" },
                    {
                        path: "/alarm-management/active-record",
                        component: "@/pages/alarm/alarmRecord",
                    },
                    { path: "/alarm-management/alarm-push", component: "@/pages/alarm/alarmPush" },
                    { path: "/report-management", component: "@/pages/report" },
                    {
                        path: "/system-settings/personal-setting",
                        component: "@/pages/settings/personalSetting",
                    },
                    {
                        path: "/system-settings/operation-log",
                        component: "@/pages/settings/operationLog",
                    },
                ],
            },
        ],
    },
];
