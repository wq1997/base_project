import { history } from "umi";
import { Badge } from "antd";
import Title from "../Title";
import { Charts3D, Charts2_5D, ScrollTable } from "@/components";
import styles from "./index.less";
import Circle from "./circle";
import IncomeRanking from "./incomeRanking";
import ElectricityRanking from "./electricityRanking";
<<<<<<< HEAD
import Map from "./map";
=======
import SocialBenefits from "./socialBenefits";
import bottomLeft1 from "../../../../../public/images/bottomLeft1.svg";
import bottomLeft2 from "../../../../../public/images/bottomLeft2.svg";
import bottomLeft3 from "../../../../../public/images/bottomLeft3.svg";
import center1 from "../../../../../public/images/center1.svg";
import center2 from "../../../../../public/images/center2.svg";
import center3 from "../../../../../public/images/center3.svg";
import center4 from "../../../../../public/images/center4.svg";
import CenterMap from "./centerMap";
>>>>>>> bab69210ef0271bfe96a8749e0615de8582b5af4

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
            {/* 设备运行情况 */}
            <div className={styles.area4}>
                <Title title={"设备运行情况"} />
                <div className={styles.areaContent}>
                    <Circle />
                </div>
            </div>
            {/* 电量排行 */}
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
            {/* 社会效益 */}
            <div className={styles.area3}>
                <Title title={"社会效益"}/>
                <div className={styles.areaContent}>
                    <SocialBenefits 
                        data={[
                            {
                                icon: bottomLeft1,
                                data: 2.13,
                                unit: '吨',
                                label: '节约标准煤'
                            },
                            {
                                icon: bottomLeft2,
                                data: 2.13,
                                unit: '吨',
                                label: 'CO2减排量'
                            },
                            {
                                icon: bottomLeft3,
                                data: 4.00,
                                unit: '棵',
                                label: '等效植树量'
                            }
                        ]}
                    />
                </div>
            </div>
            {/* 告警分析 */}
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
            {/* 收益排行 */}
            <div className={styles.area5}>
                <Title title={"收益排行"} />
                <div className={styles.areaContent}>
                    <IncomeRanking data={[20, 32, 43, 21]} />
                </div>
            </div>
            <div className={styles.area7}>7</div>
=======
                <CenterMap 
                    dataSource={[
                        {
                            label: '工单总数',
                            data: 'XXX',
                            fontColor: '#20C2FF',
                            icon: center1
                        },
                        {
                            label: '在途异常工单',
                            data: 'XXX',
                            fontColor: '#FF5E00',
                            icon: center2
                        },
                        {
                            label: '在途其他工单',
                            data: 'XXX',
                            fontColor: '#FF28DA',
                            icon: center3
                        },
                        {
                            label: '已完成工单',
                            data: 'XXX',
                            fontColor: '#01FF23',
                            icon: center4
                        }
                    ]}
                />
            </div>
            {/* 告警列表 */}
            <div className={styles.area7}>
                <Title title={"告警列表"}/>
                <div className={styles.areaContent}>
                    <div 
                        className={styles.btn}
                        onClick={()=>{
                            history.push(`/maintenance-screen/alarm-screen`)
                        }}
                    >
                        详情分析
                    </div>
                    <div className={styles.table}>
                        <ScrollTable 
                            columns={[
                                {
                                    title: '设备类型',
                                    key: '1'
                                },
                                {
                                    title: '告警等级',
                                    key: '2'
                                },
                                {
                                    title: '告警描述',
                                    key: '3'
                                },
                                {
                                    title: '设备名称',
                                    key: '4'
                                },
                                {
                                    title: '并网点',
                                    key: '5'
                                },
                                {
                                    title: '电站名称',
                                    key: '6'
                                },
                                {
                                    title: '开始时间',
                                    key: '7'
                                }
                            ]}
                            dataSource={[1,2,3,4,5]?.map(item => {
                                return {
                                    1: '一级',
                                    2: '普通',
                                    3: 'BMC_200063',
                                    4: 'BMS1_CLUSTER1',
                                    5: '并网点1',
                                    6: 'mg48测试电站',
                                    7: '2024-05-06 10:39:48'
                                }
                            })}
                        />
                    </div>
                </div>
            </div>
>>>>>>> bab69210ef0271bfe96a8749e0615de8582b5af4
        </div>
    );
};

export default Business;
