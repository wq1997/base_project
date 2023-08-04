import AccountRoute from "./account";
import BaseDataRoute from "./baseData";

const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";
console.log({
  path: '/cet',
  component: Layout,
  routes: [
    ...BaseDataRoute
  ]
})
export default Routes = [
   {
     path: "/", 
     component: App,
     routes: [
      {
        path: '/cet',
        component: Layout,
        routes: [
          ...BaseDataRoute
        ]
      },
      ...AccountRoute
     ]
   },
]
