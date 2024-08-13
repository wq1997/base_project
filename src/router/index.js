export default Routes = [
    { path: "/screen-plant-analysis", component: "@/pages/largeScreens/plantAnalysisScreen" },
    {
        path: "/",
        component: "@/pages/App",
        routes: [
            {
                path: "/",
                component: "@/layouts/baseLayout",
                routes: [
                    // { path: "/overview-screen", component: "@/pages/overview" },

                    {
                        path: "/workbench/management-roles",
                        component: "@/pages/workbench/managementRoles",
                    },
                    {
                        path: "/workbench/execution-roles",
                        component: "@/pages/workbench/executionRoles",
                    },
                    {
                        path: "/project-management/electronic-archives",
                        component: "@/pages/projectManagement/electronicArchives",
                    },
                    {
                        path: "/project-management/task-list",
                        component: "@/pages/projectManagement/taskList",
                    },
                    {
                        path: "/project-management/workorder-details",
                        component: "@/pages/projectManagement/workorderDetails",
                    },
                    {
                        path: '/project-management/spare-parts-management',
                        component: '@/pages/projectManagement/sparePartsManagement',
                    },
                    {
                        path: '/project-management/abnormal',
                        component: '@/pages/projectManagement/abnormal'
                    },
                    {
                        path: '/project-management/resourcesInventory',
                        component: '@/pages/projectManagement/resourcesInventory'
                    },
                    {
                        path: '/knowledgeBase',
                        component: '@/pages/knowledgeBase'
                    },
                    {
                        path: "/system-configuration/account-management",
                        component: "@/pages/systemConfiguration/accountManagement",
                    },
                    {
                        path: "/system-configuration/role-management",
                        component: "@/pages/systemConfiguration/roleManagement",
                    },
                    {
                        path: "/system-configuration/checkitem-configuration",
                        component: "@/pages/systemConfiguration/checkitemConfiguration",
                    },
                    {
                        path: '/system-configuration/alarm-configuration',
                        component: '@/pages/systemConfiguration/alarmConfiguration'
                    }
                ],
            },
            { path: "/login", component: "@/pages/account/login" },
            {
                path: "/test",
                component: "@/pages/test",
            },
            {
                path: "/large-screens/alarm-screen",
                component: "@/pages/largeScreens/alarmScreen",
            },
        ],
    },
];
