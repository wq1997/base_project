import { history } from "umi";
import { Badge } from "antd";
import styles from "./index.less";
import Map from "@/pages/largeScreens/components/map";
import Header from "../Header";
import { Charts3D, Charts2_5D, ScrollTable } from "@/components";
import Circle from "./Circle";
import IncomeRanking from "./incomeRanking";
import ElectricityRanking from "./electricityRanking";
import SocialBenefits from "./SocialBenefits";
import bottomLeft1 from "@/assets/images/bottomLeft1.svg";
import bottomLeft2 from "@/assets/images/bottomLeft2.svg";
import bottomLeft3 from "@/assets/images/bottomLeft3.svg";
import center1 from "@/assets/images/center1.svg";
import center2 from "@/assets/images/center2.svg";
import center3 from "@/assets/images/center3.svg";
import center4 from "@/assets/images/center4.svg";
import classNames from "classnames";
import Title from "../Title";
import CenterMap from "./CenterMap";
import { getDcDashboardData as getDcDashboardDataServe } from "@/services";
import { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import Card from "../../../components/Card";
import PlantOverview from "../../../components/PlantOverview";

const Business = ({ typeList, currentType, onChangedType }) => {
    const [dataSource, setDataSource] = useState();

    const { data, run } = useRequest(getDcDashboardDataServe, {
        manual: true,
    });

    useEffect(() => {
        if (data?.data?.data) {
            const dataSource = data?.data?.data;
            console.log("dataSource", dataSource);
            setDataSource(dataSource);
        }
    }, [data]);

    useEffect(() => {
        run();
    }, []);
    console.log("CCCC", dataSource);
    return (
        <>
            {true && (
                <div className={styles.business}>
                    <Map plants={dataSource?.plants} />
                    {/* 头部Header */}
                    <div className={styles.header}>
                        <Header
                            typeList={typeList}
                            currentType={currentType}
                            onChangedType={onChangedType}
                        />
                    </div>
                    <div className={styles.left}>
                        <PlantOverview
                            data={{
                                total: Object.keys(
                                    dataSource?.plantSummery?.province2PlantCount || {}
                                )?.map(city => {
                                    return {
                                        name: city,
                                        value: dataSource?.plantSummery?.province2PlantCount?.[
                                            city
                                        ],
                                    };
                                }),
                                totalCapacity: dataSource?.plantSummery?.totalCapacity,
                                totalPlant: dataSource?.plantSummery?.count,
                            }}
                        />
                        <Card
                            title="电量排行"
                            content={
                                <ElectricityRanking
                                    value={{
                                        dischargeCapacityTop5: dataSource?.dischargeCapacityTop5,
                                        dischargeCapacityBottom5:
                                            dataSource?.dischargeCapacityBottom5,
                                        dischargeEfficiencyTop5:
                                            dataSource?.dischargeEfficiencyTop5,
                                        dischargeEfficiencyBottom5:
                                            dataSource?.dischargeEfficiencyBottom5,
                                    }}
                                />
                            }
                        />
                        <Card
                            title="社会效益"
                            content={
                                <>
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
                                </>
                            }
                        />
                    </div>
                    <div className={styles.right}>
                        <Card
                            title="告警分析"
                            content={
                                <>
                                    {/* <Charts2_5D
                                        depth={40}
                                        alpha={55}
                                        colors={["#34FFFD", "#E6A5FF", "#FFEF72", "#4BE8FF"]}
                                        data={[
                                            [
                                                "一般",
                                                dataSource?.signalName2Count?.["一般告警"] || 0,
                                            ],
                                            [
                                                "严重",
                                                dataSource?.signalName2Count?.["严重告警"] || 0,
                                            ],
                                        ]}
                                    /> */}
                                </>
                            }
                        />
                        <Card
                            title="收益排行"
                            content={
                                <>
                                    {/* <IncomeRanking
                                    data={{
                                        profitTop5: dataSource?.profitTop5,
                                        profitBottom5: dataSource?.profitBottom5,
                                    }}
                                /> */}
                                </>
                            }
                        />
                        <Card
                            title="设备运行情况"
                            content={<Circle dataSource={dataSource?.deviceStatusCount} />}
                        />
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
                        <Card
                            title={
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <span>告警列表</span>
                                    <div
                                        className={styles.btn}
                                        onClick={() => {
                                            history.push(`/large-screens/alarm-screen`);
                                        }}
                                    >
                                        详情分析
                                    </div>
                                </div>
                            }
                            content={
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
                            }
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Business;
