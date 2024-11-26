const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";
const Login = "@/pages/account/login";
const BigScreen = "@/pages/bigScreen/index";
import menuRoutes from '../router/menuRoute'

export default Routes = [
    {
        path: "/",
        component: App,
        routes: [
            {path: "/login", component: Login},
            {path: '/bigScreen', component: BigScreen},
            {
                path: '/index',
                component: Layout,
                routes: [
                    ...menuRoutes
                ]
            },
        ]
    }
]
