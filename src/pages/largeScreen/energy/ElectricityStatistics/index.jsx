import styles from "./index.less";
import ElectricTopLeftImg from "../../../../../public/images/electric_top_left.png";
import ElectricTopRightImg from "../../../../../public/images/electric_top_right.png";
import ElectricBottomLeftImg from "../../../../../public/images/electric_bottom_left.png";
import ElectricBottomRightImg from "../../../../../public/images/electric_bottom_right.png";
import { getEnergyPowerStatisticsServe } from "@/services/bigScreen";
import { useEffect, useState } from "react";

const ElectricityStatistics = () => {
    const [ data, setData ] = useState();
    const getEnergyPowerStatistics = async () => {
        const res = await getEnergyPowerStatisticsServe();
        if(res?.data?.data){
            setData(res?.data?.data);
        }
    }

    useEffect(() => {
        getEnergyPowerStatistics();
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles.contentBottomLeftTopContentLeftTop}>
                <div className={styles.contentBottomLeftTopContentLeftTopLeft}>
                    <img src={ElectricTopLeftImg} />
                    <div className={styles.contentBottomLeftTopContentLeftTopLeftContent}>
                        <div className={styles.contentBottomLeftTopContentLeftTopLeftContentTop}>
                            <div className={styles.contentBottomLeftTopContentLeftTopLeftContentTopData}>
                                {data?.todayCharge}
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
                                {data?.todayDisCharge}
                            </div>
                            <div className={styles.contentBottomLeftTopContentLeftTopRightContentTopUnit}>
                                kwh
                            </div>
                        </div>
                        <div className={styles.contentBottomLeftTopContentLeftTopRightContentBottom}>
                            今日放电量
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
                                {data?.totalCharge}
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
                                {data?.totalDisCharge}
                            </div>
                            <div className={styles.contentBottomLeftBottomContentLeftTopRightContentTopUnit}>
                                kwh
                            </div>
                        </div>
                        <div className={styles.contentBottomLeftBottomContentLeftTopRightContentBottom}>
                            总放电量
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ElectricityStatistics;