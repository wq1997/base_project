const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

// 资源管理
const Polymerization = "@/pages/resourceManage/polymerization";

// 需求侧响应
const AwardIssuance = "@/pages/demandResponse/awardIssuance";  // 原来的中标下发
const ResponseEvaluation = "@/pages/demandResponse/responseEvaluation";  // 原来的响应评价
const DemandResponseCreate = "@/pages/demandResponse/create";  // 申报信息
const DemandResponseToExamine = "@/pages/demandResponse/toExamine";  // 中标下发
const DemandResponseResult = "@/pages/demandResponse/result";  // 响应评价

// 系统设置
const SettingUser = "@/pages/setting/user";

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
          { path: '/vpp/demandResponse/create', component: DemandResponseCreate },
          { path: '/vpp/demandResponse/toExamine', component: DemandResponseToExamine },
          { path: '/vpp/demandResponse/result', component: DemandResponseResult },
          { path: '/vpp/setting/user', component: SettingUser },
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
