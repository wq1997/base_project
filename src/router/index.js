import AccountRoute from "./account";

const App = "@/pages/App";

export default Routes = [
   {
     path: "/", 
     component: App,
     routes: [
      ...AccountRoute
     ]
   },
]