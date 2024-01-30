import styles from "./index.less";
import ElectricTopLeftImg from "../../../../../public/images/electric_top_left.png";
import ElectricTopRightImg from "../../../../../public/images/electric_top_right.png";
import ElectricBottomLeftImg from "../../../../../public/images/electric_bottom_left.png";
import ElectricBottomRightImg from "../../../../../public/images/electric_bottom_right.png";

const ElectricityStatistics = () => {
    return (
        <div className={styles.content}>
            <div className={styles.contentBottomLeftTopContentLeftTop}>
                <div className={styles.contentBottomLeftTopContentLeftTopLeft}>
                    <img src={ElectricTopLeftImg} />
                    <div className={styles.contentBottomLeftTopContentLeftTopLeftContent}>
                        <div className={styles.contentBottomLeftTopContentLeftTopLeftContentTop}>
                            <div className={styles.contentBottomLeftTopContentLeftTopLeftContentTopData}>
                                750000
                            </div>
                            <div className={styles.contentBottomLeftTopContentLeftTopLeftContentTopUnit}>
                                kwh
                            </div>
                        </div>
                        <div className={styles.contentBottomLeftTopContentLeftTopLeftContentBottom}>
                            今日充电量
                        </div>
                    </div>
                </div>
                <div className={styles.contentBottomLeftTopContentLeftTopRight}>
                    <img src={ElectricTopRightImg} />
                    <div className={styles.contentBottomLeftTopContentLeftTopRightContent}>
                        <div className={styles.contentBottomLeftTopContentLeftTopRightContentTop}>
                            <div className={styles.contentBottomLeftTopContentLeftTopRightContentTopData}>
                                750000
                            </div>
                            <div className={styles.contentBottomLeftTopContentLeftTopRightContentTopUnit}>
                                kwh
                            </div>
                        </div>
                        <div className={styles.contentBottomLeftTopContentLeftTopRightContentBottom}>
                            今日充电量
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.contentBottomLeftTopContentLeftBottom}>
                <div className={styles.contentBottomLeftTopContentLeftBottomLeft}>
                    <img src={ElectricBottomLeftImg} />
                    <div className={styles.contentBottomLeftTopContentLeftBottomLeftContent}>
                        <div className={styles.contentBottomLeftTopContentLeftBottomLeftContentTop}>
                            <div className={styles.contentBottomLeftTopContentLeftBottomLeftContentTopData}>
                                75000
                            </div>
                            <div className={styles.contentBottomLeftTopContentLeftBottomLeftContentTopUnit}>
                                kwh
                            </div>
                        </div>
                        <div className={styles.contentBottomLeftTopContentLeftTopLeftContentBottom}>
                            总充电量
                        </div>
                    </div>
                </div>
                <div className={styles.contentBottomLeftBottomContentLeftTopRight}>
                    <img src={ElectricBottomRightImg} />
                    <div className={styles.contentBottomLeftBottomContentLeftTopRightContent}>
                        <div className={styles.contentBottomLeftBottomContentLeftTopRightContentTop}>
                            <div className={styles.contentBottomLeftBottomContentLeftTopRightContentTopData}>
                                75000
                            </div>
                            <div className={styles.contentBottomLeftBottomContentLeftTopRightContentTopUnit}>
                                kwh
                            </div>
                        </div>
                        <div className={styles.contentBottomLeftBottomContentLeftTopRightContentBottom}>
                            总充电量
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ElectricityStatistics;