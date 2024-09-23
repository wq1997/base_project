import { ConfigProvider, theme as antdTheme, message } from "antd";
import { Outlet, useSelector, useLocation, history, setLocale } from "umi";
import { ThemeEnum, GlobalWrapperCss } from "@/components";
import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { getLoginPath } from "@/utils/utils";
import 'dayjs/locale/zh-cn';
import { useEffect } from "react";
dayjs.extend(weekday);
dayjs.extend(localeData);

const localeEnum = {
    zh_CN,
    en_US
}

const App = () => {
    const { theme, locale } = useSelector(state => state.global);
    const location = useLocation();
    if (location?.pathname === "/") {
        const loginPath = getLoginPath();
        history.push(loginPath);
    }
    dayjs.locale(locale);
    setLocale(locale, false);

    useEffect(() => {
        message.config({
            top: 100,
            duration: 2,
            maxCount: 3,
            prefixCls: 'my-message',
        });
    }, [])

    return (
        <ConfigProvider
            locale={localeEnum[locale]}
            theme={{
                algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                token: {
                    ...ThemeEnum[theme],
                    fontSize: 15
                },
                components: ThemeEnum[theme].components,
            }}
        >
            <GlobalWrapperCss>
                <Outlet />
            </GlobalWrapperCss>
        </ConfigProvider>
    )
}

export default App;