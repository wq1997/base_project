import { useState } from "react";
import styles from "./index.less";
import { useEffect } from "react";
import { Title } from "@/components";
import CpuChart from "./charts/cpuChart";
import GpuChart from "./charts/gpuChart";
import MemoChart from "./charts/memoChart";
import SocChart from "./charts/socChart";
import DeviceRisk from "./charts/deviceRisk";
import moment from "moment";

const View = () => {
    const [currentTime, setCurrentTime] = useState(moment().format("YYYY/MM/DD HH:mm:ss"));

    const refreshCurrentTime = () => {
        setInterval(()=>{
            setCurrentTime(moment().format("YYYY/MM/DD HH:mm:ss"));
        }, 1000)
    }

    useEffect(()=>{
        refreshCurrentTime();
    }, []);

    return (
        <div className={styles.view}>
            <div className={styles.header}>
                <div className={styles.title}>MOFS可视化系统</div>
                <div className={styles.time}>{currentTime}</div>
            </div>
            <div className={styles.content}>
                <div className={styles.contentLeft}>
                    <div className={styles.contentLeftOne}>
                        <Title title={"设备负载"} />
                        <div className={styles.contentLeftOneContent}>
                            <div className={styles.contentLeftOneContentLeft}>
                                状态正常
                            </div>
                            <div className={styles.contentLeftOneContentRight}>
                                <div className={styles.contentLeftOneContentRightItem}>
                                    <div className={styles.contentLeftOneContentRightItemTop}>
                                        CPU
                                    </div>
                                    <div className={styles.contentLeftOneContentRightItemBottom}>
                                        <CpuChart />
                                    </div>
                                </div>
                                <div className={styles.contentLeftOneContentRightItem}>
                                    <div className={styles.contentLeftOneContentRightItemTop}>
                                        GPU
                                    </div>
                                    <div className={styles.contentLeftOneContentRightItemBottom}>
                                        <GpuChart />
                                    </div>
                                </div>
                                <div className={styles.contentLeftOneContentRightItem}>
                                    <div className={styles.contentLeftOneContentRightItemTop}>
                                        内存
                                    </div>
                                    <div className={styles.contentLeftOneContentRightItemBottom}>
                                        <MemoChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentLeftTwo}>
                        <Title title={"SOC"} />
                        <div className={styles.contentLeftTwoContent}>
                            <SocChart />
                        </div>
                    </div>
                    <div className={styles.contentLeftThree}>
                        <Title title={"设备风险点"} />
                        <div className={styles.contentLeftThreeContent}>
                            <DeviceRisk />
                        </div>
                    </div>
                </div>
                <div className={styles.contentRight}>

                </div>
            </div>
        </div>
    )
}

export default View;