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
                        component: DemandResponseInvitation,
                        routes: [
                            {
                                path: "/management-roles",
                                component: InvitationList,
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
