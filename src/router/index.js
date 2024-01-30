const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";
const Login = "@/pages/account/login";
const deviceMap = "@/pages/deviceMap";
const LargeScreen = "@/pages/largeScreen";
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
      {
        path: '/deviceMap',
        component: deviceMap
       },
       {
        path: '/largeScreen',
        component: LargeScreen
       }
     ]
   }
]
