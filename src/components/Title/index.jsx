import { theme } from "antd";

const Title = (props) => {
    const { token } = theme.useToken();
    const {style} = props;
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                ...style
            }}
        >
            <div 
                style={{
                    width: '6px',
                    height: '18px',
                    background: token.colorPrimary,
                    borderRadius: '4px',
                    marginRight: '4px'
                }}
            />
            <div style={{fontSize: 20}}>{props.children}</div>
        </div>
    )
}

export default Title;