const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

const Home = "@/pages/home";


const Login = "@/pages/account/login";
const Test = "@/pages/test"

export default Routes = [
   {
     path: "/", 
     component: App,
     routes: [
      {
        path: '/mbts',
        component: Layout,
        routes: [
          // 首页
          { path: '/Upload-files', component: Home },
          // 首页
          { path: '/mbts/home', component: Home },
          // 首页
          { path: '/mbts/home', component: Home },
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
