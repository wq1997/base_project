const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";
const User = "@/pages/user";
const Login = "@/pages/login";
const Register = "@/pages/register";
const Test = "@/pages/test";

export default Routes = [
    {
        path: "/",
        component: App,
        routes: [
            {
                path: "/cet",
                component: Layout,
                routes: [{ path: "/cet/user", component: User }],
            },
            { path: "/login", component: Login },
            { path: "/register", component: Register },
            {
                path: "/test",
                component: Test,
            },
        ],
    },
];
