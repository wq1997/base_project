import { theme, Typography } from "antd";
import { Title } from "@/components";
import useIcon from "@/hooks/useIcon";
import styles from "./index.less";

const StaticsCard = props => {
    const { icon, color, iconColor, value, label, backgroundColor } = props;
    const { token } = theme.useToken();
    const Icon = useIcon();
    return (
        <div
            className={styles.card}
            style={{
                background: backgroundColor || token.color1,
            }}
        >
            <div>
                <div
                    style={{
                        margin: 0,
                        color,
                        textAlign: "center",
                        fontFamily: "DingTalkJinBuTi",
                        fontSize: 30,
                        marginBottom: 10,
                    }}
                >
                    {value}0
                </div>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div style={{ color: token.color11 }}>{label}</div>
                    {icon && (
                        <Icon
                            type={icon}
                            style={{
                                fontSize: 15,
                                color: iconColor || color,
                                marginLeft: 25,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const SubStaticsCard = props => {
    const { image, color, value, label } = props;
    const { token } = theme.useToken();
    return (
        <div className={styles.card}>
            <div style={{ height: "100%", width: "100%" }}>
                <div
                    style={{
                        color,
                        textAlign: "center",
                        fontFamily: "DingTalkJinBuTi",
                        fontSize: 30,
                        height: "calc(100% - 10px)",
                        backgroundImage: `url(${image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "bottom",
                    }}
                >
                    {value}
                </div>
                <div
                    style={{
                        height: "10px",
                        color: token.color38,
                        textAlign: "center",
                    }}
                >
                    {label}
                </div>
            </div>
        </div>
    );
};

StaticsCard.SubStaticsCard = SubStaticsCard;

export default StaticsCard;
