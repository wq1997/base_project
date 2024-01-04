const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

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
            { path: "/vpp/homepage", component: HomePage },
            { path: "/vpp/demandResponse/invitation", component: DemandResponseInvitation },
            { path: "/vpp/demandResponse/task", component: DemandResponseTask },
            { path: "/vpp/demandResponse/income", component: DemandResponseIncome },
            { path: "/vpp/baseinfo/company", component: BaseinfoCompany },
            { path: "/vpp/baseinfo/role", component: BaseinfoRole },
            { path: "/vpp/baseinfo/account", component: BaseinfoAccount },
            { path: "/vpp/baseinfo/level", component: BaseinfoLevel },
            { path: "/vpp/setting/log", component: SettingLog },
            { path: "/vpp/setting/notification", component: SettingNotification },
        ],
    },
    { path: "/login", component: Login },
    {
        path: "/test",
        component: Test,
    },
];
