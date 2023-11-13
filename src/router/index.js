const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

const Home = "@/pages/home";
const MOFS_View = "@/pages/view";

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
          { path: '/cet/home', component: Home },
        ]
      },
      { path: "/login", component: Login },
      {
        path: '/test',
        component: Test
       },
       {
        path: '/view',
        component: MOFS_View
       }
     ]
   }
]
