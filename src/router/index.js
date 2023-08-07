const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

const Login = "@/pages/account/login";

export default Routes = [
   {
     path: "/", 
     component: App,
     routes: [
      {
        path: '/cet',
        component: Layout,
        routes: [
          
        ]
      },
      { path: "/login", component: Login }
     ]
   },
]
