const App = "@/pages/App";
 

export default Routes = [
    {
        path: "/",
        component: App,
        routes: [
            {
                path: "/overview",
                component: "@/layouts/baseLayout",
                routes: [{ path: "/overview-screen", component: "@/pages/overview" }],
            },
            { path: "/login", component: "@/pages/account/login" },
            {
                path: "/test",
                component: "@/pages/test",
            },
        ],
    },
];
