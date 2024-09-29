import { ConfigProvider,theme as antdTheme } from "antd";
import { Outlet, useSelector, useLocation, history,setLocale  } from "umi";
import { ThemeEnum } from "@/components";
import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';
import dayjs from "dayjs";
// import autofit from 'autofit.js'
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import 'qweather-icons/font/qweather-icons.css';
import 'dayjs/locale/zh-cn';
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('zh-cn');

const localeEnum = {
    'zh-CN':zh_CN,
    'en-US':en_US
}

const App = () => {
    localStorage.removeItem('locale');
    localStorage.removeItem('umi_locale');
	// autofit.init({
        // dh: 1080,
        // dw: 1920,
        // el:"body",
        // resize: true
    // })
    const { theme, locale } = useSelector(state => state.global);
    const location = useLocation();
    if(location?.pathname==="/"){
        history.push('/login');
    }
    setLocale('zh-CN');
    return (
        <ConfigProvider 
            locale={localeEnum[locale]}
            theme={{
                algorithm: theme === 'dark'? antdTheme. darkAlgorithm:antdTheme.defaultAlgorithm,
                token: ThemeEnum[theme],
                components: {
                    Input: {
                        autoComplete: 'off'
                    }
                }
            }}
        >
            <Outlet/>
        </ConfigProvider>
    )
}

export default App;