export default Routes = [
    {
        path: "/",
        component: "@/pages/App",
        routes: [
            {
                path: "/overview",
                component: "@/layouts/baseLayout",
                routes: [
                    { path: "/overview-screen", component: "@/pages/overview" },
                    {
                        path: "/workbench",
                        component: "@/pages/overview",
                        routes: [
                            {
                                path: "/management-roles",
                                component: "@/pages/overview",
                            },
                            {
                                path: "/execution-roles",
                                component: "@/pages/overview",
                            },
                        ],
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
