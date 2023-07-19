import { ConfigProvider,theme as antdTheme } from "antd";
import { Outlet, useSelector } from "umi";
import { ThemeEnum } from "@/components"
const App = () => {
    const { theme } = useSelector(state => state.global)
    console.log("dark", ThemeEnum[theme])
    return (
        <ConfigProvider 
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