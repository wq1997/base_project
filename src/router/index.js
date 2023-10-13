const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

// 资源管理
const Polymerization = "@/pages/resourceManage/polymerization";

// 需求侧响应
const AwardIssuance = "@/pages/demandResponse/awardIssuance";
const ResponseEvaluation = "@/pages/demandResponse/responseEvaluation";
const TransactionDeclaration = "@/pages/demandResponse/transactionDeclaration";
const DemandCreate = "@/pages/demandResponse/create";

const Login = "@/pages/account/login";
const Test = "@/pages/test"

export default Routes = [
   {
     path: "/", 
     component: App,
     routes: [
      {
        path: '/vpp',
        component: Layout,
        routes: [
          { path: '/vpp/resourceManage/polymerization', component: Polymerization },
          { path: '/vpp/demandResponse/awardIssuance', component: AwardIssuance },
          { path: '/vpp/demandResponse/responseEvaluation', component: ResponseEvaluation },
          { path: '/vpp/demandResponse/transactionDeclaration', component: TransactionDeclaration },
          { path: '/vpp/demandResponse/create', component: DemandCreate }
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
