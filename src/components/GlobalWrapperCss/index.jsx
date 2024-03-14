import { useEmotionCss } from '@ant-design/use-emotion-css';
import { theme } from "antd";

const GlobalWrapperCss = (props) => {
    const { token } = theme.useToken();
    const globalStyle = useEmotionCss(()=>{
        return {
            '.ant-table-wrapper .ant-table-thead >tr>th':{
                 backgroundColor: token.tableHeaderColor
            },
            '.ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title': {
                color: token.colorPrimary
            },
            '.ant-card': {
                background: token.color20,
            },
        }
    })
    return (
        <div className={globalStyle}>
            {props.children}
        </div>
    )
}

export default GlobalWrapperCss;