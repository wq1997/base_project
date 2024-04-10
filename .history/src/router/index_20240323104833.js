const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

 

const Login = "@/pages/account/login";
const Test = "@/pages/test"

export default Routes = [
   {
     path: "/", 
     component: App,
     routes: [
      {
        path: '/cet',
        component: Layout,
        routes: [
          // 首页
          { path: '/overview-screen', component: "@/pages/home" },
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
