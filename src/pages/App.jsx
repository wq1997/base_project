import { ConfigProvider, theme as antdTheme } from "antd";
import { Outlet, useSelector, useLocation, history, setLocale } from "umi";
import { setLocalStorage, removeLocalStorage } from "@/utils/utils";
import { ThemeEnum } from "@/components";
import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
// import 'qweather-icons/font/qweather-icons.css';
import 'dayjs/locale/zh-cn';
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('zh-cn');

const localeEnum = {
    zh_CN,
    en_US
}
setLocalStorage("theme", 'dark');



const App = () => {
    const { theme, locale } = useSelector(state => state.global);
    const location = useLocation();
    if (location?.pathname === "/") {
        history.push('/login');
    }
    // setLocalStorage("locale", 'en-US');
    setLocale(locale);
    return (
        <ConfigProvider
            locale={localeEnum[locale]}
            theme={{
                algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                token: ThemeEnum[theme]
            }}
        >
            <Outlet />
        </ConfigProvider>
    )
}

export default App;