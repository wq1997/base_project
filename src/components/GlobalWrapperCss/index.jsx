import { useEmotionCss } from "@ant-design/use-emotion-css";
import { theme } from "antd";

const GlobalWrapperCss = props => {
    const { token } = theme.useToken();
    const globalStyle = useEmotionCss(() => {
        return {
            width: "100%",
            height: "100%",
            '--w-e-textarea-bg-color': token.color12,
            '--w-e-textarea-color': 'white',
            '--w-e-toolbar-bg-color': token.color12,
            '--w-e-toolbar-disabled-color': 'white',
            '--w-e-toolbar-active-color': 'white',
            '--w-e-toolbar-color': 'white',
            '--w-e-toolbar-active-bg-color': 'black',
            '--w-e-modal-button-bg-color': token.color12,
            '.ant-input-affix-wrapper .anticon.ant-input-password-icon': {
                color: '#999'
            },
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
                "-webkit-text-fill-color": "black",
                "caret-color": "black",
                "-webkit-transition": "background-color 50000s ease-in-out 0s !important",
                "-webkit-box-shadow": "0 0 0 1000px transparent inset!important",
                transition: "background-color 50000s ease-in-out 0s !important",
                "background-color": "transparent !important",
                "background-image": "none !important",
            },
            ".ant-input-affix-wrapper": {
                color: "black",
            },
            ".ant-table-wrapper .ant-table-thead >tr>th": {
                background: token.color15,
            },
            ".ant-select-outlined.ant-select-disabled .ant-select-selector": {
                color: "white !important",
            },
            ".ant-select-multiple .ant-select-selection-overflow .ant-select-selection-item": {
                color: "white !important",
            },
            "span[contenteditable]": {
                backgroundColor: `${token.colorPrimary}!important`
            }
        };
    });
    return <div className={globalStyle}>{props.children}</div>;
};

export default GlobalWrapperCss;
