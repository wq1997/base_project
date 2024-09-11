import { ConfigProvider, theme as antdTheme } from "antd";
import { Outlet, useSelector } from "umi";
import { ThemeEnum, GlobalWrapperCss } from "@/components";
import en_US from "antd/locale/en_US";
import zh_CN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/zh-cn";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale("zh-cn");

const localeEnum = {
    zh_CN,
    en_US,
};

const App = () => {
 
    return (
      <div>1221</div>
    );
};

export default App;
