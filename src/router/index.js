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
                    { path: "/alarm-management", component: "@/pages/overview" },
                    { path: "/report-management", component: "@/pages/overview" },
                    { path: "/personal-settings", component: "@/pages/settings/personalSetting" },
                    { path: "/operation-log",component: "@/pages/settings/operationLog" },
                ],
            },
        ],
    },
];
