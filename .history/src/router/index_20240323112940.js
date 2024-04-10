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
                        component: "@/pages/overview",
                        routes: [
                            {
                                path: "/workbench/management-roles",
                                component: "@/pages/overview",
                            },
                            {
                                path: "/workbench/execution-roles",
                                component: "@/pages/overview",
                            },
                        ],
                    },
                    // {
                    //     path: "/project-management/electronic-archives",
                    //     component: "@/pages/overview",
                    //     routes: [
                    //         {
                    //             path: "/project-management/electronic-archives",
                    //             component: "@/pages/overview",
                    //             routes: [
                    //                 {
                    //                     path: "/project-management/electronic-archives/mocha-itom",
                    //                     component: "@/pages/overview",
                    //                 },
                    //             ],
                    //         },
                    //         {
                    //             path: "/workbench/management-roles/execution-roles",
                    //             component: "@/pages/overview",
                    //         },
                    //     ],
                    // },
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
