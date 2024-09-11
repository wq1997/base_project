import styles from "./index.less";
import Map from "@/pages/largeScreens/components/map";
import Header from "../Header";
import { ScrollTable } from "@/components";
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
import CenterMap from "./CenterMap";
import { getDcDashboardData as getDcDashboardDataServe } from "@/services";
import { useState, useEffect, useRef } from "react";
import { Form, Select, Input, Badge, Space, Search } from "antd";
import { useRequest } from "ahooks";
import Card from "../../../components/Card";
import PlantOverview from "../../../components/PlantOverview";
import AlarmAnysis from "../../../components/AlarmAnysis";
import DeviceStatus from "../../../components/DeviceStatus";

const Business = ({}) => {
    const [isOverseas, setIsOverseas] = useState();
    const plantNameRef = useRef();
    const [plantName, setPlantName] = useState();
    const [dataSource, setDataSource] = useState();
    const [mapPlants, setMapPlants] = useState();
    const [mapPanTo, setPanTo] = useState();
    const { data, run } = useRequest(getDcDashboardDataServe, {
        manual: true,
    });

    const handleSearch = (value, e, source) => {
        if (source?.source == "clear") {
            return setMapPlants(dataSource?.plants);
        }
        if (!dataSource?.plants) return;
        const searchParams = { haiWai: 1, name: plantNameRef.current };
        const filterPlants = dataSource?.plants?.filter(plant => {
            for (let key in searchParams) {
                if (searchParams[key] && !plant[key]?.includes(searchParams[key])) {
                    return false;
                }
            }
            return true;
        });
        setMapPlants(filterPlants);
    };

    useEffect(() => {
        if (data?.data?.data) {
            const dataSource = data?.data?.data;
            setDataSource(dataSource);
            setMapPlants(dataSource?.plants);
        }
    }, [data]);

    useEffect(() => {
        run();
    }, []);

    useEffect(() => {
        console.log("area", area);
        handleSearch();
    }, [area]);

    useEffect(() => {
        if (mapPlants?.length) {
            const { longitude, latitude } = mapPlants[0];
            setPanTo(mapPlants?.length == 1 ? [longitude, latitude] : null);
        }
    }, [mapPlants]);

    return (
        <>
            {true && (
                <div className={styles.business}>
                    <Map
                        panTo={mapPanTo}
                        plants={mapPlants}
                        center={[104.083736, 30.653187]}
                        zoom={5}
                    />
                    <div className={styles.left}>
                        <div className={styles.leftItem}>
                            {/* <PlantOverview
                                data={{
                                    total: Object.keys(
                                        dataSource?.plantSummery?.province2PlantCapacity || {}
                                    )?.map(city => {
                                        return {
                                            name: city,
                                            value: dataSource?.plantSummery
                                                ?.province2PlantCapacity?.[city]?._1,
                                        };
                                    }),
                                    totalCapacity: dataSource?.plantSummery?.totalCapacity,
                                    totalPlant: dataSource?.plantSummery?.count,
                                }}
                            /> */}
                        </div>
                        <div className={styles.leftItem}>
                            <Card
                                title="电量排行"
                                content={
                                    <ElectricityRanking
                                        value={{
                                            dischargeCapacityTop5:
                                                dataSource?.dischargeCapacityTop5,
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
                        </div>
                        <div className={styles.leftItem}>
                            <Card
                                title="社会效益"
                                content={
                                    <>
                                        <SocialBenefits
                                            data={[
                                                {
                                                    icon: bottomLeft1,
                                                    data: dataSource?.socialEffect?.ele || 0,
                                                    unit: "万吨",
                                                    label: "节约标准煤",
                                                },
                                                {
                                                    icon: bottomLeft2,
                                                    data: dataSource?.socialEffect?.co2 || 0,
                                                    unit: "万吨",
                                                    label: "CO2减排量",
                                                },
                                                {
                                                    icon: bottomLeft3,
                                                    data: dataSource?.socialEffect?.tree || 0,
                                                    unit: "万棵",
                                                    label: "等效植树量",
                                                },
                                            ]}
                                        />
                                    </>
                                }
                            />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.search}>
                            <Select
                                style={{ width: 100, marginRight: 10 }}
                                value={area}
                                type="select"
                                options={[
                                    { label: "国内", value: false },
                                    { label: "国外", value: true },
                                ]}
                                placeholder="区域"
                                onChange={value => {
                                    setArea(value);
                                }}
                            />
                            <Input.Search
                                style={{ flex: 1 }}
                                allowClear={true}
                                value={plantName}
                                placeholder="请输入电站名称"
                                onSearch={handleSearch}
                                onChange={e => {
                                    const value = e.target.value;
                                    plantNameRef.current = value;
                                    setPlantName(e.target.value);
                                }}
                            />
                        </div>
                        <div className={styles.rightItem}>
                            {/* <AlarmAnysis
                                data={
                                    dataSource &&
                                    Object?.keys(dataSource?.prior2Count || {})?.map(item => {
                                        return [item, dataSource?.prior2Count?.[item || 0]];
                                    })
                                }
                            /> */}
                        </div>
                        <div className={styles.rightItem}>
                            <Card
                                title="收益排行"
                                content={
                                    <>
                                        {dataSource && (
                                            <IncomeRanking
                                                data={{
                                                    profitTop5: dataSource?.profitTop5,
                                                    profitBottom5: dataSource?.profitBottom5,
                                                }}
                                            />
                                        )}
                                    </>
                                }
                            />
                        </div>
                        <div className={styles.rightItem}>
                            <DeviceStatus data={dataSource?.deviceStatusCount} />
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
                                            window.open("/large-screens/alarm-screen", "_blank");
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
                                                key: "priorZh",
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
