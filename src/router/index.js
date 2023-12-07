const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

const Login = "@/pages/account/login";
const deviceMap = "@/pages/deviceMap"

export default Routes = [
   {
     path: "/", 
     component: App,
     routes: [
      { path: "/login", component: Login },
      {
        path: '/deviceMap',
        component: deviceMap
       }
     ]
   }
]
