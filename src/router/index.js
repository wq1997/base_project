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
      { path: "/map", component: "@/pages/map" },
      {
        path: '/index',
        component: Layout,
        routes: [
          ...menuRoutes 
        ]
      },
      {
        path: '/device',
        component: Layout,
        routes: [
          {
            name: '设备总览',
            path: '/device',
            component: "@/pages/device/components",
        }, 
        ]
      },
     ]
   }
]
