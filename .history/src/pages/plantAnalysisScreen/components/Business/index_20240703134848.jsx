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
import {
    getDcDashboardData as getDcDashboardDataServe,
} from "@/services";
import { useState, useEffect } from "react";
import { useRequest } from "ahooks";

const Business = ({ typeList, currentType, onChangedType }) => {
    const [dataSource, setDataSource] = useState();

    const { data, run } = useRequest(getDcDashboardDataServe, {
        manual: true
    });

    useEffect(() => {
        if (data?.data?.data) {
            const dataSource = data?.data?.data;
            setDataSource(dataSource);
        }
    }, [data])

    useEffect(() => {
        run();
    }, [])
    console.log("CCCC", dataSource)
    return (
        <>
            {
                true &&
                <div className={styles.business}>
                    <Map
                        plants={dataSource?.plants}
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
                                    data={Object.keys(dataSource?.plantSummery?.province2PlantCount || {})?.map(city => {
                                        return {
                                            name: city,
                                            value: dataSource?.plantSummery?.province2PlantCount?.[city]
                                        }
                                    })}
                                />
                            </div>
                            <div className={styles.areaContentData}>
                                <div className={styles.areaContentDataItem}>
                                    <Badge
                                        color="#54CFFF"
                                        text={<span style={{ color: "#FFFFFF" }}>总装机容量</span>}
                                    />
                                    <div className={styles.areaContentDataItemData}>
                                        <span className={styles.areaContentDataItemData1}>{dataSource?.plantSummery?.totalCapacity}</span>
                                        <span className={styles.areaContentDataItemData2}>MW</span>
                                    </div>
                                </div>
                                <div className={styles.areaContentDataItem}>
                                    <Badge
                                        color="#54CFFF"
                                        text={<span style={{ color: "#FFFFFF" }}>电站个数</span>}
                                    />
                                    <div className={styles.areaContentDataItemData}>
                                        <span className={styles.areaContentDataItemData1}>{dataSource?.plantSummery?.count}</span>
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
                        {/* 社会效益 */}
                        <div className={classNames(styles.left3, styles.content)}>
                            <Title title={"社会效益"} />
                            <div className={styles.areaContent}>
                                <SocialBenefits
                                    data={[
                                        {
                                            icon: bottomLeft1,
                                            data: dataSource?.socialEffect?.ele || 0,
                                            unit: "吨",
                                            label: "节约标准煤",
                                        },
                                        {
                                            icon: bottomLeft2,
                                            data: dataSource?.socialEffect?.co2 || 0,
                                            unit: "吨",
                                            label: "CO2减排量",
                                        },
                                        {
                                            icon: bottomLeft3,
                                            data: dataSource?.socialEffect?.tree || 0,
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
                                    colors={["#34FFFD", "#E6A5FF", "#FFEF72", "#4BE8FF"]}
                                    data={[
                                        ["一般", dataSource?.signalName2Count?.['一般告警'] || 0],
                                        ["严重", dataSource?.signalName2Count?.['严重告警'] || 0],
                                    ]}
                                />
                            </div>
                        </div>
                        {/* 收益排行 */}
                        <div className={classNames(styles.right2, styles.content)}>
                            <Title title={"收益排行"} />
                            <div className={styles.areaContent}>
                                <IncomeRanking data={[20, 32, 43, 21]} />
                            </div>
                        </div>
                        {/* 设备运行情况 */}
                        <div className={classNames(styles.right3, styles.content)}>
                            <Title title={"设备运行情况"} />
                            <div className={styles.areaContent}>
                                <Circle dataSource={dataSource?.deviceStatusCount} />
                            </div>
                        </div>
                    </div>

                    {/* 中间顶部 */}
                    <div className={styles.centerTop}>
                        <CenterMap
                            dataSource={[
                                {
                                    label: "工单总数",
                                    data: dataSource?.workOrderSummery?.totalCount,
                                    icon: center1,
                                },
                                {
                                    label: "在途异常工单",
                                    data: dataSource?.workOrderSummery?.inTransitAbnormalCount,
                                    icon: center2,
                                },
                                {
                                    label: "在途其他工单",
                                    data: dataSource?.workOrderSummery?.inTransitOtherCount,
                                    icon: center3,
                                },
                                {
                                    label: "已完成工单",
                                    data: dataSource?.workOrderSummery?.completedCount3,
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
                                        title: "电站名称",
                                        key: "plantName",
                                    },
                                    {
                                        title: "设备名称",
                                        key: "deviceName",
                                    },
                                    {
                                        title: "告警等级",
                                        key: "signalName",
                                    },
                                    {
                                        title: "告警描述",
                                        key: "desc",
                                    },
                                    {
                                        title: "开始时间",
                                        key: "begin",
                                    },
                                ]}
                                dataSource={dataSource?.alarms}
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Business;
