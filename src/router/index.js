const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

<<<<<<< HEAD
// 资源管理
const Polymerization = "@/pages/resourceManage/polymerization";

// 需求侧响应
const AwardIssuance = "@/pages/demandResponse/awardIssuance"; // 原来的中标下发
const ResponseEvaluation = "@/pages/demandResponse/responseEvaluation"; // 原来的响应评价
const DemandResponseCreate = "@/pages/demandResponse/create"; // 申报信息
const DemandResponseToExamine = "@/pages/demandResponse/toExamine"; // 中标下发
const DemandResponseResult = "@/pages/demandResponse/result"; // 响应评价

// 系统设置
const SettingUser = "@/pages/setting/user";

=======
>>>>>>> 70f752824a979236b92c6758b88223528f576ccc
const Login = "@/pages/account/login";
const Test = "@/pages/test";

// 首页
const HomePage = "@/pages/homepage";

// 邀约管理
const DemandResponseInvitation = "@/pages/demandResponse/invitation";
// 任务管理
const DemandResponseTask = "@/pages/demandResponse/task";
// 收益管理
const DemandResponseIncome = "@/pages/demandResponse/income";


// 公司管理
const BaseinfoCompany = "@/pages/baseinfo/company";
// 角色管理
const BaseinfoRole = "@/pages/baseinfo/role";
// 账号管理
const BaseinfoAccount = "@/pages/baseinfo/account";
// 用户评级管理
const BaseinfoLevel = "@/pages/baseinfo/level";

// 系统日志
const SettingLog = "@/pages/setting/log";
// 系统通知
const SettingNotification = "@/pages/setting/notification";


export default Routes = [
    {
        path: "/",
        component: App,
        routes: [
<<<<<<< HEAD
            {
                path: "/vpp",
                component: Layout,
                routes: [
                    { path: "/vpp/resourceManage/polymerization", component: Polymerization },
                    { path: "/vpp/demandResponse/awardIssuance", component: AwardIssuance },
                    {
                        path: "/vpp/demandResponse/responseEvaluation",
                        component: ResponseEvaluation,
                    },
                    { path: "/vpp/demandResponse/create", component: DemandResponseCreate },
                    { path: "/vpp/demandResponse/toExamine", component: DemandResponseToExamine },
                    { path: "/vpp/demandResponse/result", component: DemandResponseResult },
                    { path: "/vpp/setting/user", component: SettingUser },
                ],
            },
            { path: "/login", component: Login },
            {
                path: "/test",
                component: Test,
            },
        ],
    },
];
=======
          {path: '/vpp/homepage', component: HomePage},
          {path: '/vpp/demandResponse/invitation', component: DemandResponseInvitation},
          {path: '/vpp/demandResponse/task', component: DemandResponseTask},
          {path: '/vpp/demandResponse/income', component: DemandResponseIncome},
          {path: '/vpp/baseinfo/company', component: BaseinfoCompany},
          {path: '/vpp/baseinfo/role', component: BaseinfoRole},
          {path: '/vpp/baseinfo/account', component: BaseinfoAccount},
          {path: '/vpp/baseinfo/level', component: BaseinfoLevel},
          {path: '/vpp/setting/log', component: SettingLog},
          {path: '/vpp/setting/notification', component: SettingNotification},
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
>>>>>>> 70f752824a979236b92c6758b88223528f576ccc
