import { theme } from "antd";
import useIcon from "@/hooks/useIcon";

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
            <div style={{fontSize: 20, fontFamily: 'PingFangSemiblod'}}>{props.children}</div>
        </div>
    )
}

const Description = (props) => {
    const Icon = useIcon();
    const { icon, iconColor, style } = props;
    const { token } = theme.useToken();
    return (
        <div
            style={{display: 'flex', ...style}}
        >       
            {
                icon&&
                <Icon
                    type={icon}
                    style={{
                        fontSize: 15,
                        color: iconColor
                    }}
                />
            }
            <div style={{marginLeft: 4, color: token.color11, fontSize: 16}}>{props.children}</div>
        </div>
    )
}

Title.Description = Description;
export default Title;