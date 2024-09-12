import { ConfigProvider, theme as antdTheme } from "antd";
import { Outlet, history, useSelector, useLocation } from "umi";
import { ThemeEnum, GlobalWrapperCss } from "@/components";
import en_US from "antd/locale/en_US";
import zh_CN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/zh-cn";
import { ScaleViewContainer } from "react-scale-view";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale("zh-cn");

const localeEnum = {
    zh_CN,
    en_US,
};

const App = () => {
    const { theme, locale } = useSelector(state => state.global);

    const location = useLocation();
    if (location?.pathname === "/") {
        history.push("/login");
    }

    return (
        <ConfigProvider
            locale={localeEnum[locale]}
            theme={{
                algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                token: {
                    ...ThemeEnum[theme],
                    fontSize: 15,
                },
                components: ThemeEnum[theme].components,
            }}
        >
            {/* <GlobalWrapperCss>
                <Outlet />
            </GlobalWrapperCss> */}
            <ScaleViewContainer
                config={{
                    width: 1920, // (必选)容器宽度；如 1920，
                    height: 1080, // (必选)容器高度；如 1080，
                    scaleType: "FULL_SCREEN",
                }}
            >
                <Outlet />
            </ScaleViewContainer>
        </ConfigProvider>
    );
};

export default App;
