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
                    {
                        path: "/workbench/management-roles",
                        component: "@/pages/workbench/managementRoles",
                    },
                    {
                        path: "/workbench/execution-roles",
                        component: "@/pages/workbench/executionRoles",
                    },
                    {
                        path: "/task-management/task-list",
                        component: "@/pages/taskManagement/taskList",
                    },
                    {
                        path: "/task-management/my-task",
                        component: "@/pages/taskManagement/myTask",
                    },
                    {
                        path: "/task-management/abnormal",
                        component: "@/pages/taskManagement/abnormal",
                    },
                    {
                        path: "/project-management/electronic-archives",
                        component: "@/pages/projectManagement/electronicArchives",
                    },
                    {
                        path: "/project-management/workorder-details",
                        component: "@/pages/projectManagement/workorderDetails",
                    },
                    {
                        path: "/project-management/spare-parts-management",
                        component: "@/pages/projectManagement/sparePartsManagement",
                    },
                    {
                        path: "/project-management/alarmStatistics",
                        component: "@/pages/projectManagement/alarmStatistics",
                    },
                    {
                        path: "/project-management/resourcesInventory",
                        component: "@/pages/projectManagement/resourcesInventory",
                    },
                    {
                        path: "/project-management/checkitem-configuration",
                        component: "@/pages/projectManagement/checkitemConfiguration",
                    },
                    {
                        path: "/project-management/alarm-configuration",
                        component: "@/pages/projectManagement/alarmConfiguration",
                    },
                    {
                        path: "/maintenance-tools/project-operation-report",
                        component: "@/pages/maintenanceTools/projectOperationReport",
                    },
                    {
                        path: "/knowledgeBase/editOrCheck",
                        component: "@/pages/knowledgeBase/editOrCheck",
                    },
                    {
                        path: "/knowledgeBase",
                        component: "@/pages/knowledgeBase",
                    },
                    {
                        path: "/system-configuration/account-management",
                        component: "@/pages/systemConfiguration/accountManagement",
                    },
                    {
                        path: "/system-configuration/role-management",
                        component: "@/pages/systemConfiguration/roleManagement",
                    },
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
