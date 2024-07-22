import { ConfigProvider, theme as antdTheme, message } from "antd";
import { Outlet, useSelector, useLocation, history, setLocale } from "umi";
import { ThemeEnum, GlobalWrapperCss } from "@/components";
import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
// import 'qweather-icons/font/qweather-icons.css';
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
        history.push('/login');
    }
    dayjs.locale(locale);
    setLocale(locale, false);
    
    useEffect(()=>{
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
                token: ThemeEnum[theme],
                components: {
                    Modal: {
                        contentBg: '#0D4D77',
                        headerBg: '#0D4D77'
                    },
                    Cascader: {
                        optionSelectedBg: '#0D4D77',
                    },
                    // Drawer: {
                    //     colorBgElevated: '#0D4D77'
                    // }
                }
            }}
        >
            <GlobalWrapperCss>
                <Outlet />
            </GlobalWrapperCss>
        </ConfigProvider>
    )
}

export default App;