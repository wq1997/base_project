const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

const uploadFiles = "@/pages/uploadFiles";
const analysisResults = "@/pages/analysis-results";
const summaryRecord = "@/pages/summary-record";

const Login = "@/pages/account/login";
const Test = "@/pages/test";

export default Routes = [
    {
        path: "/",
        component: App,
        routes: [
            {
                path: "/",
                component: Layout,
                routes: [
                    { path: "/upload-files", component: uploadFiles },
                    { path: "/analysis-results", component: analysisResults },
                    { path: "/summary-record", component: summaryRecord },
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
