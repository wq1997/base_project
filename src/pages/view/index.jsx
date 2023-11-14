import { useState, useRef } from "react";
import styles from "./index.less";
import { useEffect } from "react";
import { Title, ScrollTable } from "@/components";
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
                    <div className={styles.contentRightTop}>
                        <div className={styles.contentRightTopOne}>
                            <Title title={"数据总览"} />
                            <div className={styles.contentRightTopOneContent}>
                                <div className={styles.contentRightTopOneContentItem}>
                                    <div className={styles.contentRightTopOneContentItemTop}>
                                        37
                                    </div>
                                    <div className={styles.contentRightTopOneContentItemBottom}>
                                        运行天数
                                    </div>
                                </div>
                                <div className={styles.contentRightTopOneContentItem}>
                                    <div    
                                        className={styles.contentRightTopOneContentItemTop}
                                        style={{fontSize: 40, fontWeight: 700}}
                                    >
                                        充电中
                                    </div>
                                    <div className={styles.contentRightTopOneContentItemBottom}>
                                        当前状态
                                    </div>
                                </div>
                                <div className={styles.contentRightTopOneContentItem}>
                                    <div className={styles.contentRightTopOneContentItemTop}>
                                        0
                                    </div>
                                    <div className={styles.contentRightTopOneContentItemBottom}>
                                        当前故障数
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.contentRightTopTwo}>
                            <Title title={"分析报告"} />
                            <div className={styles.contentRightTopTwoContent}>
                                <div>
                                    <div className={styles.contentRightTopTwoContentTop}>
                                        2023年10月用电分析报告  
                                    </div>
                                    <div className={styles.contentRightTopTwoContentBottom}>
                                        查看/下载
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.contentRightTopThree}>
                            <Title title={"实时数据"} />
                            <div className={styles.contentRightTopThreeContent}>
                                <div className={styles.contentRightTopThreeContentItem}>
                                    <div className={styles.contentRightTopThreeContentItemTop}>
                                         1920 kWh
                                    </div>
                                    <div className={styles.contentRightTopThreeContentItemBottom}>
                                        今日充电量
                                    </div>
                                </div>
                                <div className={styles.contentRightTopThreeContentItem}>
                                    <div className={styles.contentRightTopThreeContentItemTop}>
                                        1824 kWh
                                    </div>
                                    <div className={styles.contentRightTopThreeContentItemBottom}>
                                        今日放电量
                                    </div>
                                </div>
                                <div className={styles.contentRightTopThreeContentItem}>
                                    <div className={styles.contentRightTopThreeContentItemTop}>
                                        -202 kW
                                    </div>
                                    <div className={styles.contentRightTopThreeContentItemBottom}>
                                        当前功率
                                    </div>
                                </div>
                                <div className={styles.contentRightTopThreeContentItem}>
                                    <div className={styles.contentRightTopThreeContentItemTop}>
                                        1001 V
                                    </div>
                                    <div className={styles.contentRightTopThreeContentItemBottom}>
                                        当前电压
                                    </div>
                                </div>
                                <div className={styles.contentRightTopThreeContentItem}>
                                    <div className={styles.contentRightTopThreeContentItemTop}>
                                        200 A
                                    </div>
                                    <div className={styles.contentRightTopThreeContentItemBottom}>
                                        当前电流
                                    </div>
                                </div>
                                <div className={styles.contentRightTopThreeContentItem}>
                                    <div className={styles.contentRightTopThreeContentItemTop}>
                                        ¥ 547
                                    </div>
                                    <div className={styles.contentRightTopThreeContentItemBottom}>
                                        今日利润
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.contentRightTopFour}>
                            <Title title={"模型状态"} />
                            <div className={styles.contentRightTopFourContent}>
                                <div className={styles.contentRightTopFourContentItem}>
                                    <div className={styles.contentRightTopFourContentItemLeft}>
                                        <div className={styles.contentRightTopFourContentItemLeftTop}>
                                            当前模型版本
                                        </div>
                                        <div className={styles.contentRightTopFourContentItemLeftBottom}>
                                            V0.3
                                        </div>
                                    </div>
                                    <div className={styles.contentRightTopFourContentItemRight}>
                                        <div className={styles.contentRightTopFourContentItemRightTop}>
                                            热失控模型运行状态
                                        </div>
                                        <div className={styles.contentRightTopFourContentItemRightBottom}>
                                            正常
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.contentRightTopFourContentItem}>
                                    <div className={styles.contentRightTopFourContentItemLeft}>
                                        <div className={styles.contentRightTopFourContentItemLeftTop}>
                                            当前模型版本
                                        </div>
                                        <div className={styles.contentRightTopFourContentItemLeftBottom}>
                                            V0.2
                                        </div>
                                    </div>
                                    <div className={styles.contentRightTopFourContentItemRight}>
                                        <div className={styles.contentRightTopFourContentItemRightTop}>
                                            过充模型运行状态
                                        </div>
                                        <div className={styles.contentRightTopFourContentItemRightBottom}>
                                            正常
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.contentRightTopFourContentItem}>
                                    <div className={styles.contentRightTopFourContentItemLeft}>
                                        <div className={styles.contentRightTopFourContentItemLeftTop}>
                                            当前模型版本
                                        </div>
                                        <div className={styles.contentRightTopFourContentItemLeftBottom}>
                                            V0.1
                                        </div>
                                    </div>
                                    <div className={styles.contentRightTopFourContentItemRight}>
                                        <div className={styles.contentRightTopFourContentItemRightTop}>
                                            异常衰减模型运行状态
                                        </div>
                                        <div className={styles.contentRightTopFourContentItemRightBottom}>
                                            未启动
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentRightBottom}>
                        <Title title={"故障预测"} />
                        <div className={styles.contentRightBottomTable}>
                            <ScrollTable  
                                columns={
                                    [
                                        {
                                            title: '故障类型',
                                            key: 'a'
                                        },
                                        {
                                            title: '故障级别',
                                            key: 'b'
                                        },
                                        {
                                            title: '故障定位',
                                            key: 'c'
                                        },
                                        {
                                            title: '采取措施',
                                            key: 'd'
                                        }
                                    ]
                                }
                                dataSource={
                                    new Array(10).fill(0).map((item, index) => {
                                        return {
                                            a: index,
                                            b: index,
                                            c: index,
                                            d: index,
                                        }
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View;