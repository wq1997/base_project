const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

const Home = "@/pages/home";


const Login = "@/pages/account/login";
const Test = "@/pages/test"
import menuRoutes from '../router/menuRoute'
export default Routes = [
   {
     path: "/", 
     component: App,
     routes: [
      {
        path: '/index',
        component: Layout,
        routes: [
          ...menuRoutes
        ]
      },
      { path: "/login", component: Login },
      
      {
        path: '/test',
        component: Test
       }
     ]
   }
]
