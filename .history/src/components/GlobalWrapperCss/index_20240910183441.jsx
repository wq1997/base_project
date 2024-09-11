import { useEmotionCss } from "@ant-design/use-emotion-css";
import { theme } from "antd";

const GlobalWrapperCss = props => {
    const { token } = theme.useToken();
    const globalStyle = useEmotionCss(() => {
        return {
            ".ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title": {
                color: token.colorPrimary,
            },
            ".ant-card": {
                background: token.color20,
            },
            ".ant-checkbox-checked": {
                background: token.colorPrimary,
            },
            "input:-webkit-autofill": {
                "-webkit-animation": "autofill-fix 1s infinite !important",
                "-webkit-text-fill-color": token.fontColor,
                "caret-color": token.fontColor,
                "-webkit-transition": "background-color 50000s ease-in-out 0s !important",
                "-webkit-box-shadow": "0 0 0 1000px transparent inset!important",
                transition: "background-color 50000s ease-in-out 0s !important",
                "background-color": "transparent !important",
                "background-image": "none !important",
            },
            ".ant-picker-input": {
                color: token.color1,
            },
            ".amap-info-content": {
                background: token.color8,
            },
            
        };
    });
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
            }}
            className={globalStyle}
        >
            {props.children}
        </div>
    );
};

export default GlobalWrapperCss;
