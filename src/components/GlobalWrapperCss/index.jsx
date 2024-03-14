import { useEmotionCss } from '@ant-design/use-emotion-css';
import { theme } from "antd";

const GlobalWrapperCss = (props) => {
    const { token } = theme.useToken();
    const globalStyle = useEmotionCss(()=>{
        return {
            '.ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title': {
                color: token.colorPrimary
            },
            '.ant-card': {
                background: token.color20,
            },
            '.ant-checkbox-checked': {
                background: token.colorPrimary
            }
        }
    })
    return (
        <div className={globalStyle}>
            {props.children}
        </div>
    )
}

export default GlobalWrapperCss;