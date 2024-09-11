import { ConfigProvider, theme as antdTheme } from "antd";
import { Outlet, useSelector, setLocale,useLocation } from "umi";
import { ThemeEnum, GlobalWrapperCss } from "@/components";
import OvertimeLogin from "../utils/overtime";
import en_US from "antd/locale/en_US";
import zh_CN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/zh-cn";
import { useEffect } from "react";
dayjs.extend(weekday);
dayjs.extend(localeData);

const localeEnum = {
    "zh-CN": zh_CN,
    "en-US": en_US,
};

const App = () => {
    const { theme, locale } = useSelector(state => state.global);
    dayjs.locale(locale);
    setLocale(locale, false);

    const location = useLocation();
    if (location?.pathname === "/") {
        history.push("/login");
    }

    // useEffect(() => {
    //     global.overtime = window.setInterval(OvertimeLogin(), 10 * 1000);
    // });

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
            <GlobalWrapperCss>
                <Outlet />
            </GlobalWrapperCss>
        </ConfigProvider>
    );
};

export default App;
