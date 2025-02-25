import { ConfigProvider,theme as antdTheme } from "antd";
import { Outlet, useSelector, useLocation, history,setLocale } from "umi";
import { ThemeEnum, GlobalWrapperCss } from "@/components";
import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import 'qweather-icons/font/qweather-icons.css';
import 'dayjs/locale/zh-cn';
import '@/utils/flexible'
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('zh-cn');

const localeEnum = {
    zh_CN,
    en_US
}

const App = () => {
    const { theme, locale } = useSelector(state => state.global);
    const location = useLocation();
    if(location?.pathname==="/"){
        history.push('/login');
    }
    setLocale(locale, false);

    return (
        <ConfigProvider 
            locale={localeEnum[locale]}
            theme={{
                algorithm: theme === 'dark'? antdTheme.darkAlgorithm:antdTheme.defaultAlgorithm,
                token: ThemeEnum[theme],
                components: {
                    Input: {
                        autoComplete: 'off',
                        colorBorder: theme === 'dark'?'#333':'#d9d9d9',
                        colorTextPlaceholder:theme === 'dark'?'rgba(255, 255, 255, 0.45)':'#d9d9d9',
                    },
                    InputNumber: {
                        colorBorder: theme === 'dark'?'#333':'#d9d9d9',
                    },
                    Select: {
                        colorBorder: theme === 'dark'?'#333':'#d9d9d9',
                        colorTextPlaceholder:theme === 'dark'?'rgba(255, 255, 255, 0.45)':'#d9d9d9',
                    },
                    DatePicker: {
                        colorBorder: theme === 'dark'?'#333':'#d9d9d9',
                    },
                    Radio: {
                        colorBorder: theme === 'dark'?'#333':'#d9d9d9',
                    },
                    Button: {
                        defaultBorderColor: theme === 'dark'?'#333':'#d9d9d9',
                        borderColorDisabled: theme === 'dark'?'#333':'#d9d9d9',
                    },
                    Modal: {
                        contentBg: theme === 'dark'?'#1C244C':'#fff',
                        headerBg: theme === 'dark'?'#1C244C':'#fff'
                    },
                    // Cascader: {
                    //     colorBorder: theme === 'dark'?'red':'red',
                    // }
                }
            }}
        >
            <GlobalWrapperCss>
                <Outlet/>
            </GlobalWrapperCss>
        </ConfigProvider>
    )
}

export default App;