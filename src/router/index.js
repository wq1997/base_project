const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

const Home = "@/pages/home";


const Login = "@/pages/account/login";
const deviceMap = "@/pages/deviceMap"
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
       }
     ]
   }
]
