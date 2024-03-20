const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

const Home = "@/pages/home";
const Home = "@/pages/home";
const Home = "@/pages/home";

const Login = "@/pages/account/login";
const Test = "@/pages/test";

export default Routes = [
    {
        path: "/",
        component: App,
        routes: [
            {
                path: "/",
                component: Layout,
                routes: [
                    { path: "/upload-files", component: Home },
                    { path: "/analysis-results", component: Home },
                    { path: "/summary-record", component: Home },
                ],
            },
            { path: "/login", component: Login },
            {
                path: "/test",
                component: Test,
            },
        ],
    },
];
