import { ConfigProvider,theme as antdTheme } from "antd";
import { Outlet, useSelector, useLocation, history } from "umi";
import { ThemeEnum } from "@/components";
import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import 'dayjs/locale/zh-cn';
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

    return (
        <ConfigProvider 
            locale={localeEnum[locale]}
            theme={{
                algorithm: theme === 'dark'? antdTheme.darkAlgorithm:antdTheme.defaultAlgorithm,
                token: ThemeEnum[theme]
            }}
        >
            <Outlet/>
        </ConfigProvider>
    )
}

export default App;