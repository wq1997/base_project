import { theme, Typography } from "antd";
import { Title } from "@/components";
import styles from "./index.less";

const StaticsCard = (props) => {
    const { icon, color, value, label, backgroundColor } = props;
    const { token } = theme.useToken();
    return (
        <div 
            className={styles.card}
            style={{
                backgroundColor: backgroundColor || token.color1,
            }}
        >
            <div>
                <Title.Description
                    icon={icon}
                    iconColor={color}
                    style={{ marginTop: 0, marginBottom: 10, textAlign: 'center' }}
                >
                    {label}
                </Title.Description>
                <div
                    style={{ 
                        margin: 0, 
                        color, 
                        textAlign: 'center',
                        fontFamily: 'DingTalkJinBuTi',
                        fontSize: 30
                    }}
                >
                    {value}
                </div>
            </div>
        </div>
    )
}

const SubStaticsCard = (props) => {
    const { image, color, value, label } = props;
    const { token } = theme.useToken();
    return (
        <div 
            className={styles.card}
        >
            <div style={{height: '100%', width: '100%'}}>
                <div
                    style={{
                        color, 
                        textAlign: 'center',
                        fontFamily: 'DingTalkJinBuTi',
                        fontSize: 30,
                        height: 'calc(100% - 10px)',
                        backgroundImage: `url(${image})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'bottom',
                    }}
                >
                    {value}
                </div>
                <div 
                    style={{
                        height: '10px',
                        color: token.color38,
                        textAlign: 'center'
                    }}
                >
                    {label}
                </div>
            </div>
        </div>
    )
}

StaticsCard.SubStaticsCard = SubStaticsCard;

export default StaticsCard;