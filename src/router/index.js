export default Routes = [
    { path: "/login", component: "@/pages/account/login" },
    {
        path: "/",
        component: "@/pages/App",
        routes: [
            {
                path: "/",
                component: "@/layouts/baseLayout",
                routes: [
                    { path: "/overview-screen", component: "@/pages/overview" },
                    { path: "/plant-overview", component: "@/pages/overview" },
                    { path: "/plant-management", component: "@/pages/overview" },
                    { path: "/device-management", component: "@/pages/overview" },
                    { path: "/active-record", component: "@/pages/alarm/alarmRecord" },
                    { path: "/alarm-push", component: "@/pages/alarm/alarmPush" },
                    { path: "/report-management", component: "@/pages/report" },
                    { path: "/personal-settings", component: "@/pages/settings/personalSetting" },
                    { path: "/operation-log", component: "@/pages/settings/operationLog" },
                ],
            },
        ],
    },
];
