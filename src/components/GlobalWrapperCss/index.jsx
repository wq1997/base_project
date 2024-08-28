import { useEmotionCss } from '@ant-design/use-emotion-css';
import { theme } from "antd";

const GlobalWrapperCss = (props) => {
    const { token } = theme.useToken();
    const globalStyle = useEmotionCss(() => {
        return {
            '.ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title': {
                color: token.colorPrimary
            },
            '.ant-card': {
                background: token.color20,
            },
            '.ant-checkbox-checked': {
                background: token.colorPrimary
            },
            'input:-webkit-autofill': {
                '-webkit-animation': 'autofill-fix 1s infinite !important',
                '-webkit-text-fill-color': 'black',
                'caret-color': 'black',
                '-webkit-transition': 'background-color 50000s ease-in-out 0s !important',
                '-webkit-box-shadow': '0 0 0 1000px transparent inset!important',
                transition: 'background-color 50000s ease-in-out 0s !important',
                'background-color': 'transparent !important',
                'background-image': 'none !important'
            },
            '.ant-input-affix-wrapper': {
                color: 'black'
            },
            '.ant-table-wrapper .ant-table-thead >tr>th': {
                background: token.color15
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