const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

const Home = "@/pages/home";

const ElectricityPriceList = "@/pages/businessData/electricityPrice";
const PolicyInformation = "@/pages/businessData/policyInformation";
const Investment = "@/pages/businessData/investment";

const FirstArea = "@/pages/baseData/firstArea";
const SecondArea = "@/pages/baseData/secondArea";
const ElectricityType = "@/pages/baseData/electricityType";
const BillingSystem = "@/pages/baseData/billingSystem";
const voltageLevel = "@/pages/baseData/voltageLevel";

const UserList = "@/pages/userManage/userList";

const Notify = "@/pages/commentManage/notify";
const Feedback = "@/pages/commentManage/feedback";

const Login = "@/pages/account/login";

// webview
const mobileInvestmentFill = "@/pages/mobile/investmentFill";
const mobileInvestmentResult = "@/pages/mobile/investmentResult";

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
          // 业务数据
          { path: '/cet/businessData/electricityPrice', component: ElectricityPriceList},
          { path: '/cet/businessData/policyInformation', component: PolicyInformation},
          { path: '/cet/businessData/investment', component: Investment },
          // 基础信息
          { path: "/cet/baseInfo/firstArea", component: FirstArea },
          { path: "/cet/baseInfo/secondArea", component: SecondArea },
          { path: "/cet/baseInfo/electricityType", component: ElectricityType },
          { path: "/cet/baseInfo/billingSystem", component: BillingSystem },
          { path: "/cet/baseInfo/voltageLevel", component: voltageLevel },
          // 用户管理
          { path: "/cet/userManage/userList", component: UserList},
          // 留言管理
          { path: "/cet/commentManage/notify", component: Notify },
          { path: "/cet/commentManage/feedback", component: Feedback }
        ]
      },
      { path: "/login", component: Login },
      {
        path: '/mobile',
        routes: [
          {
            path: '/mobile/investment/fill',
            component: mobileInvestmentFill
          },
          {
            path: '/mobile/investment/result',
            component: mobileInvestmentResult
          }
        ]
      },
      {
        path: '/test',
        component: Test
       }
     ]
   }
]
