const App = "@/pages/App";
const Layout = "@/layouts/baseLayout";

const uploadFiles = "@/pages/uploadFiles";
const analysisResults = "@/pages/analysisResults";
const summaryRecord = "@/pages/summaryRecord";
const configureTemplate = "@/pages/configureTemplate";

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
                    { path: "/configure-template", component: configureTemplate },
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
