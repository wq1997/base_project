const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

const Login = "@/pages/account/login";
const Test = "@/pages/test";

// 首页
const HomePage = "@/pages/homepage";

// 邀约管理
const DemandResponseInvitation = "@/pages/demandResponse/invitation";
// 邀约列表
const InvitationList = "@/pages/demandResponse/invitation/invitationList";
// 任务清单
const AllTaskList = "@/pages/demandResponse/invitation/allTaskList";
// 任务管理
const DemandResponseTask = "@/pages/demandResponse/task";
// 任务确认
const TaskConfirm = "@/pages/demandResponse/task/confirm";
// 任务列表
const TaskList = "@/pages/demandResponse/task/list";
// 任务详情
const TaskDetail = "@/pages/demandResponse/task/detail";
// 收益管理
const DemandResponseIncome = "@/pages/demandResponse/income";
// 收益看板
const DemandResponseIncomeOverview = "@/pages/demandResponse/income/overview";
// 邀约收入明细
const DemandResponseIncomeInvitation = "@/pages/demandResponse/income/invitationIncome";
// 任务收入明细
const DemandResponseIncomeTask = "@/pages/demandResponse/income/taskIncome";
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

// 现货交易
const TransactionLayout = "@/layouts/transactionLayout";

// 首页
const TransactionHomepage = "@/pages/transaction/homepage";
// 电价预测管理
const TransactionManage = "@/pages/transaction/manage";
const TransactionManageHistory = "@/pages/transaction/manage/history";
const TransactionManagePrediction = "@/pages/transaction/manage/prediction";
// 交易申报
const TransactionReport = "@/pages/transaction/report";
// 交易执行
const TransactionExecute = "@/pages/transaction/execute";
// 经营看板
const TransactionBoard = "@/pages/transaction/board";

// 场站配置
const BaseinfoStation = "@/pages/baseinfo/station";
const BaseinfoStationList = "@/pages/baseinfo/station/stationList";
const BaseinfoStationCompany = "@/pages/baseinfo/station/company";

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
                    {
                        path: "/vpp/demandResponse/invitation",
                        component: DemandResponseInvitation,
                        routes: [
                            {
                                path: "/vpp/demandResponse/invitation/invitationList",
                                component: InvitationList,
                            },
                            {
                                path: "/vpp/demandResponse/invitation/allTaskList",
                                component: AllTaskList,
                            },
                        ],
                    },
                    {
                        path: "/vpp/demandResponse/task",
                        component: DemandResponseTask,
                        routes: [
                            {
                                path: "/vpp/demandResponse/task/confirm",
                                component: TaskConfirm,
                            },
                            {
                                path: "/vpp/demandResponse/task/detail",
                                component: TaskDetail,
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
                    {
                        path: "/vpp/baseinfo/station",
                        component: BaseinfoStation,
                        routes: [
                            {
                                path: "/vpp/baseinfo/station/stationList",
                                component: BaseinfoStationList,
                            },
                            {
                                path: "/vpp/baseinfo/station/companyList",
                                component: BaseinfoStationCompany,
                            },
                        ],
                    },
                    { path: "/vpp/baseinfo/role", component: BaseinfoRole },
                    { path: "/vpp/baseinfo/account", component: BaseinfoAccount },
                    { path: "/vpp/baseinfo/level", component: BaseinfoLevel },
                    { path: "/vpp/setting/log", component: SettingLog },
                    { path: "/vpp/setting/notification", component: SettingNotification },
                ],
            },
            {
                path: "/transaction",
                component: TransactionLayout,
                routes: [
                    { path: "/transaction/homepage", component: TransactionHomepage },
                    {
                        path: "/transaction/manage",
                        component: TransactionManage,
                        routes: [
                            {
                                path: "/transaction/manage/history",
                                component: TransactionManageHistory,
                            },
                            {
                                path: "/transaction/manage/prediction",
                                component: TransactionManagePrediction,
                            },
                        ],
                    },
                    { path: "/transaction/report", component: TransactionReport },
                    { path: "/transaction/execute", component: TransactionExecute },
                    { path: "/transaction/board", component: TransactionBoard },
                ],
            },
        ],
    },
    { path: "/login", component: Login },
    {
        path: "/test",
        component: Test,
    },
];
