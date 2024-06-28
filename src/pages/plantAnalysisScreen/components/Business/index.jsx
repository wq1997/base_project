import { history } from "umi";
import { Badge } from "antd";
import styles from "./index.less";
import Map from "@/pages/largeScreens/components/map";
import Header from "../Header";
import { Charts3D, Charts2_5D, ScrollTable } from "@/components";
import Circle from "./circle";
import IncomeRanking from "./incomeRanking";
import ElectricityRanking from "./electricityRanking";
import SocialBenefits from "./socialBenefits";
import bottomLeft1 from "../../../../../public/images/bottomLeft1.svg";
import bottomLeft2 from "../../../../../public/images/bottomLeft2.svg";
import bottomLeft3 from "../../../../../public/images/bottomLeft3.svg";
import center1 from "../../../../../public/images/center1.svg";
import center2 from "../../../../../public/images/center2.svg";
import center3 from "../../../../../public/images/center3.svg";
import center4 from "../../../../../public/images/center4.svg";
import classNames from "classnames";
import Title from "../Title";
import CenterMap from "./centerMap";

const Business = ({ typeList, currentType, onChangedType }) => {
    return (
        <div className={styles.business}>
            <Map
                plants={[
                    { plantName: "上海采日能源电站", position: [121.320789, 31.194111] },
                    { plantName: "杭州采日能源电站", position: [120.212851, 30.291667] },
                    { plantName: "南京采日能源电站", position: [118.798196, 31.968232] },
                    { plantName: "合肥采日能源电站", position: [117.290268, 31.798907] },
                    {
                        plantName: "重庆采日能源电站重庆采日能源电站",
                        position: [106.55081, 29.609201],
                    },
                    { plantName: "广州采日能源电站", position: [113.26932, 22.9885] },
                ]}
            />
            {/* 头部Header */}
            <div className={styles.header}>
                <Header
                    typeList={typeList}
                    currentType={currentType}
                    onChangedType={onChangedType}
                />
            </div>
            <div className={styles.left}>
                {/* 电站统计 */}
                <div className={classNames(styles.left1, styles.content)}>
                    <Title title={"电站统计"} />
                    <div className={styles.contentChart}>
                        <Charts3D
                            colorList={[
                                "#34FFFD",
                                "#FFF073",
                                "#76B3FF",
                                "#E8A7FF",
                                "#01F29B",
                                "#FF9960",
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
                {/* 电量排行 */}
                <div className={classNames(styles.left2, styles.content)}>
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
                {/* 电量排行 */}
                <div className={classNames(styles.left3, styles.content)}>
                    <Title title={"社会效益"} />
                    <div className={styles.areaContent}>
                        <SocialBenefits
                            data={[
                                {
                                    icon: bottomLeft1,
                                    data: 2.13,
                                    unit: "吨",
                                    label: "节约标准煤",
                                },
                                {
                                    icon: bottomLeft2,
                                    data: 2.13,
                                    unit: "吨",
                                    label: "CO2减排量",
                                },
                                {
                                    icon: bottomLeft3,
                                    data: 4.0,
                                    unit: "棵",
                                    label: "等效植树量",
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                {/* 告警分析 */}
                <div className={classNames(styles.right1, styles.content)}>
                    <Title title={"告警分析"} />
                    <div className={styles.areaContent}>
                        <Charts2_5D
                            depth={40}
                            alpha={55}
                            colors={["#34FFFD", "#FFEF72", "#4BE8FF", "#E6A5FF"]}
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
                <div className={classNames(styles.right2, styles.content)}>
                    <Title title={"告警分析"} />
                    <div className={styles.areaContent}>
                        <IncomeRanking data={[20, 32, 43, 21]} />
                    </div>
                </div>
                {/* 设备运行情况 */}
                <div className={classNames(styles.right3, styles.content)}>
                    <Title title={"设备运行情况"} />
                    <div className={styles.areaContent}>
                        <Circle />
                    </div>
                </div>
            </div>

            {/* 中间顶部 */}
            <div className={styles.centerTop}>
                <CenterMap
                    dataSource={[
                        {
                            label: "工单总数",
                            data: "XXX",
                            icon: center1,
                        },
                        {
                            label: "在途异常工单",
                            data: "XXX",
                            icon: center2,
                        },
                        {
                            label: "在途其他工单",
                            data: "XXX",
                            icon: center3,
                        },
                        {
                            label: "已完成工单",
                            data: "XXX",
                            icon: center4,
                        },
                    ]}
                />
            </div>

            {/* 中间底部 */}
            <div className={styles.centerBottom}>
                <Title title={"告警列表"} />
                <div className={styles.outBtn}>
                    <div
                        className={styles.btn}
                        onClick={() => {
                            history.push(`/large-screens/alarm-screen`);
                        }}
                    >
                        详情分析
                    </div>
                </div>
                <div className={styles.table}>
                    <ScrollTable
                        columns={[
                            {
                                title: "设备类型",
                                key: "1",
                            },
                            {
                                title: "告警等级",
                                key: "2",
                            },
                            {
                                title: "告警描述",
                                key: "3",
                            },
                            {
                                title: "设备名称",
                                key: "4",
                            },
                            {
                                title: "并网点",
                                key: "5",
                            },
                            {
                                title: "电站名称",
                                key: "6",
                            },
                            {
                                title: "开始时间",
                                key: "7",
                            },
                        ]}
                        dataSource={[1, 2, 3, 4, 5]?.map(item => {
                            return {
                                1: "一级",
                                2: "普通",
                                3: "BMC_200063",
                                4: "BMS1_CLUSTER1",
                                5: "并网点1",
                                6: "mg48测试电站",
                                7: "2024-05-06 10:39:48",
                            };
                        })}
                    />
                </div>
            </div>
        </div>
    );
};

export default Business;
