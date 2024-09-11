import { Badge } from "antd";
import Title from "../Title";
import { Charts3D, Charts2_5D } from "@/components";
import styles from "./index.less";
import Circle from "./circle";
import IncomeRanking from "./incomeRanking";
import ElectricityRanking from "./electricityRanking";
import Map from "./map";

const Business = () => {
    return (
        <div className={styles.container}>
            {/* 电量统计 */}
            <div className={styles.area1}>
                <Title title={"电量统计"} />
                <div className={styles.areaContent}>
                    <div className={styles.areaContentChart}>
                        <Charts3D
                            colorList={[
                                "#17A6FF",
                                "#FF63DD",
                                "#FFCD18",
                                "#61F671",
                                "#07FCDD",
                                "#5B5EF7",
                            ]}
                            data={[
                                {
                                    name: "PM2.5",
                                    value: 134,
                                },
                                {
                                    name: "VOC",
                                    value: 56,
                                },
                                {
                                    name: "T",
                                    value: 57,
                                },
                                {
                                    name: "CH2O",
                                    value: 36,
                                },
                                {
                                    name: "CO2",
                                    value: 51,
                                },
                                {
                                    name: "RH",
                                    value: 51,
                                },
                            ]}
                        />
                    </div>
                    <div className={styles.areaContentData}>
                        <div className={styles.areaContentDataItem}>
                            <Badge
                                color="#54CFFF"
                                text={<span style={{ color: "#FFFFFF" }}>总装机容量</span>}
                            />
                            <div className={styles.areaContentDataItemData}>
                                <span className={styles.areaContentDataItemData1}>XXXX</span>
                                <span className={styles.areaContentDataItemData2}>MW</span>
                            </div>
                        </div>
                        <div className={styles.areaContentDataItem}>
                            <Badge
                                color="#54CFFF"
                                text={<span style={{ color: "#FFFFFF" }}>电站个数</span>}
                            />
                            <div className={styles.areaContentDataItemData}>
                                <span className={styles.areaContentDataItemData1}>18</span>
                                <span className={styles.areaContentDataItemData2}>个</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.area4}>
                <Title title={"设备运行情况"} />
                <div className={styles.areaContent}>
                    <Circle />
                </div>
            </div>
            <div className={styles.area2}>
                <Title title={"电量排行"} />
                <div className={styles.areaContent}>
                    <ElectricityRanking
                        data={[
                            [10, 20, 30, 20],
                            [20, 30, 20, 10],
                        ]}
                    />
                </div>
            </div>
            <div className={styles.area3}>3</div>
            <div className={styles.area6}>
                <Title title={"告警分析"} />
                <div className={styles.areaContent}>
                    <Charts2_5D
                        size={170}
                        depth={40}
                        colors={[
                            ["#29FFB4", "#32F600"],
                            ["#00F9FF", "#3962FF"],
                            ["#FCFF00", "#FFA300"],
                            ["#FF00FF", "#DA00FF"],
                        ]}
                        data={[
                            ["低级", 1],
                            ["中级", 2],
                            ["高级", 2],
                            ["严重", 2],
                        ]}
                    />
                </div>
            </div>
            <div className={styles.area5}>
                <Title title={"收益排行"} />
                <div className={styles.areaContent}>
                    <IncomeRanking data={[20, 32, 43, 21]} />
                </div>
            </div>
            <div className={styles.area8}>
                <Map plants={[
                    {position:[121.325407  ,31.288870  ]}
                ]}/>
            </div>
            <div className={styles.area7}>7</div>
        </div>
    );
};

export default Business;
