const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

const Home = "@/pages/home";


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
          // 首页
          { path: '/cet/home', component: Home },
        ]
      },
      { path: "/login", component: Login }
     ]
   },
]
