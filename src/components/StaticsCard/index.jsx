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
                <Typography.Title
                    level={3}
                    style={{ 
                        margin: 0, 
                        color, 
                        textAlign: 'center',
                        fontFamily: 'DingTalkJinBuTi'
                    }}
                >
                    {value}
                </Typography.Title>
            </div>
        </div>
    )
}

export default StaticsCard;