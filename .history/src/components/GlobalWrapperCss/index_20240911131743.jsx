import { useEmotionCss } from '@ant-design/use-emotion-css';
import { theme } from "antd";

const GlobalWrapperCss = (props) => {
    const { token } = theme.useToken();
    const globalStyle = useEmotionCss(() => {
        return {
            width:'100%',
            height:'100%',
            '.ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title': {
                color: token.colorPrimary
            },
            '.ant-card': {
                background: token.color20,
            },
            '.ant-checkbox-checked': {
                background: token.colorPrimary
            },
            '.ant-table-wrapper .ant-table-thead >tr>th': {
                borderBottom: `1px solid ${token.color2}`
            },
            '.ant-select-selector': {
                color: `${token.color3} !important`
            },
            'input:-webkit-autofill': {
                '-webkit-animation': 'autofill-fix 1s infinite !important',
                '-webkit-text-fill-color': `${token.color3} !important`,
                'caret-color': `${token.color3} !important`,
                '-webkit-transition': 'background-color 50000s ease-in-out 0s !important',
                '-webkit-box-shadow': '0 0 0 1000px transparent inset!important',
                transition: 'background-color 50000s ease-in-out 0s !important',
                'background-color': 'transparent !important',
                'background-image': 'none !important'
            },
            ".ant-table": {
                scrollbarColor: `${token.color31} rgba(253, 253, 253, 0.19)`
            },
            ".ant-radio-wrapper-disabled": {
                color: `${token.color10} !important`
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