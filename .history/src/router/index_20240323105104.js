const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

const Login = "@/pages/account/login";
const Test = "@/pages/test";

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
                component: Test,
            },
        ],
    },
];
