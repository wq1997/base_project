import { Title } from "@/components";
import styles from "./index.less";
import { theme } from "antd";

const StatisticalCard = ({
    title,
    dataSource
}) => {
    const { token } = theme.useToken();

    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>
                <Title.PageSubTitle title={title} />
            </div>
            <div className={styles.cardBottom}>
                {
                    dataSource?.map(data => {
                        return (
                            <div className={styles.cardBottomItem}>
                                <div className={styles.cardBottomItemTop}>{data?.label}</div>
                                <div className={styles.cardBottomItemBottom}>
                                    <span 
                                        className={styles.cardBottomItemBottomValue}
                                        style={{color: token.colorPrimary}}
                                    >
                                        {data?.value}
                                    </span>
                                    <span className={styles.cardBottomItemBottomUnit}>{data?.unit}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default StatisticalCard;