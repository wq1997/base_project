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
// 任务确认
const TaskConfirm = "@/pages/demandResponse/task/confirm";
// 任务列表
const TaskList = "@/pages/demandResponse/task/list";
// 收益管理
const DemandResponseIncome = "@/pages/demandResponse/income";
// 收益看板
const DemandResponseIncomeOverview = "@/pages/demandResponse/income/overview";
// 邀约收入明细
const DemandResponseIncomeInvitation = "@/pages/demandResponse/income/invitationIncome";
// 任务收入明细
const DemandResponseIncomeTask = "@/pages/demandResponse/income/taskIncome";
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
            {
                path: "/vpp",
                component: Layout,
                routes: [
                    { path: "/vpp/homepage", component: HomePage },
                    { path: "/vpp/demandResponse/invitation", component: DemandResponseInvitation },
                    {
                        path: "/vpp/demandResponse/task",
                        component: DemandResponseTask,
                        routes: [
                            {
                                path: "/vpp/demandResponse/task/confirm",
                                component: TaskConfirm,
                            },
                            {
                                path: "/vpp/demandResponse/task/list",
                                component: TaskList,
                            },
                        ],
                    },
                    {
                        path: "/vpp/demandResponse/income",
                        component: DemandResponseIncome,
                        routes: [
                            {
                                path: "/vpp/demandResponse/income/overview",
                                component: DemandResponseIncomeOverview,
                            },
                            {
                                path: "/vpp/demandResponse/income/invitation",
                                component: DemandResponseIncomeInvitation,
                            },
                            {
                                path: "/vpp/demandResponse/income/task",
                                component: DemandResponseIncomeTask,
                            },
                        ],
                    },
                    { path: "/vpp/baseinfo/company", component: BaseinfoCompany },
                    { path: "/vpp/baseinfo/role", component: BaseinfoRole },
                    { path: "/vpp/baseinfo/account", component: BaseinfoAccount },
                    { path: "/vpp/baseinfo/level", component: BaseinfoLevel },
                    { path: "/vpp/setting/log", component: SettingLog },
                    { path: "/vpp/setting/notification", component: SettingNotification },
                ],
            },
        ],
    },
    { path: "/login", component: Login },
    {
        path: "/test",
        component: Test,
    },
    { path: "/test/transaction/transaction-declaration", component: SettingNotification },
];
