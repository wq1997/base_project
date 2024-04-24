export default Routes = [
    {
        path: "/",
        component: "@/pages/App",
        routes: [
            {
                path: "/",
                component: "@/layouts/baseLayout",
                routes: [
                    { path: "/overview-screen", component: "@/pages/overview" },
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
                        path: "/system-configuration/account-management",
                        component: "@/pages/systemConfiguration/accountManagement",
                    },
                    {
                        path: "/system-configuration/role-management",
                        component: "@/pages/systemConfiguration/roleManagement",
                    },
                    {
                        path: "/system-configuration/checkitem-configuration",
                        component: "@/pages/systemConfiguration/checkItemConfiguration",
                    },
                ],
            },
            { path: "/login", component: "@/pages/account/login" },
            {
                path: "/test",
                component: "@/pages/test",
            },
        ],
    },
];
