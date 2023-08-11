import { ConfigProvider,theme as antdTheme } from "antd";
import { Outlet, useSelector } from "umi";
import { ThemeEnum } from "@/components";
import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';

const localeEnum = {
    zh_CN,
    en_US
}

const App = () => {
    const { theme, locale } = useSelector(state => state.global);

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