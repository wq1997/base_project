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
        path: '/cet',
        component: Layout,
        routes: [
          // 首页
          { path: '/cet/A', component: "@/pages/index/A.js" },
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
