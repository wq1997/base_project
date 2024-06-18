const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";
const Login = "@/pages/account/login";
import menuRoutes from '../router/menuRoute'
export default Routes = [
   {
     path: "/", 
     component: App,
     routes: [
      { path: "/login", component: Login },
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
