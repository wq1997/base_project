import { useEmotionCss } from "@ant-design/use-emotion-css";
import { theme } from "antd";

const GlobalWrapperCss = props => {
    const { token } = theme.useToken();
    const globalStyle = useEmotionCss(() => {
        return {
            width: "100%",
            height: "100%",
            ".ant-select-selector": {
                border: `1px solid ${token.calendarBorderColor} !important`,
            },
            ".ant-picker-outlined":{
                borderColor:`${token.calendarBorderColor} !important`
            },
            ".ant-input-outlined":{
                borderColor:`${token.calendarBorderColor} !important`
            },
            ".ant-input::placeholder": {
                color:`${token.color8} !important`
            },
            ".ant-select-selection-placeholder": {
                color:`${token.color8} !important`
            },
        };
    });
    return <div className={globalStyle}>{props.children}</div>;
};

export default GlobalWrapperCss;