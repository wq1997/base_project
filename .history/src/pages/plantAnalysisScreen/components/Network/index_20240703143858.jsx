import { Charts3D, Charts2_5D, ScrollTable } from "@/components";
import Title from "../Title";
import styles from "./index.less";
import Map from "@/pages/largeScreens/components/map";
import Header from "../Header";
import classNames from "classnames";
import { Form, Select, Input, Badge } from "antd";
import { useState, useEffect } from "react";
import { getNetScreenData as getNetScreenDataServer } from "@/services/largeScreen";
import WorkOrder from "@/pages/largeScreens/alarmScreen/WorkOrder";
import Card from "@/pages/largeScreens/components/Card";

const Network = ({ typeList, currentType, onChangedType }) => {
    const [initData, setInitData] = useState();
    const [plants, setPlants] = useState();
    const [mapPlants, setMapPlants] = useState();
    const [mapZoom, setMapZoom] = useState(18);
    const [mapPanTo, setPanTo] = useState();
    const [type, setType] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();

    const handleSearch = () => {
        if (!plants) return;
        const searchParams = { type, name, address };
        const filterPlants = plants?.filter(plant => {
            for (let key in searchParams) {
                if (searchParams[key] && !plant[key]?.includes(searchParams[key])) {
                    return false;
                }
            }
            return true;
        });

        setMapPlants(filterPlants);
    };

    const handleReset = () => {
        setType();
        setName();
        setAddress();
        setMapPlants(plants);
    };

    const getInitData = async () => {
        const res = await getNetScreenDataServer();
        if (res?.data?.status == "SUCCESS") {
            const data = res?.data?.data;
            setInitData(data);
            setPlants(data?.plants);
            setMapPlants(data?.plants);
        }
    };

    useEffect(() => {
        if (mapPlants?.length) {
            const { longitude, latitude } = mapPlants[0];
            setPanTo(mapPlants?.length == 1 ? [longitude, latitude] : null);
        }
    }, [mapPlants]);

    useEffect(() => {
        getInitData();
    }, []);

    return (
        <div className={styles.network}>
            <Map plants={mapPlants} showInfo={true} panTo={mapPanTo} />
            {/* 头部Header */}
            <div className={styles.header}>
                <Header
                    typeList={typeList}
                    currentType={currentType}
                    onChangedType={onChangedType}
                />
            </div>
            {/* 左边 */}
            <div className={styles.left}>
                <Card
                    title="电站概览"
                    content={
                        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                            <div style={{ flex: 1 }}>
                                <Charts3D
                                    colorList={[
                                        "#34FFFD",
                                        "#FFF073",
                                        "#76B3FF",
                                        "#E8A7FF",
                                        "#01F29B",
                                        "#FF9960",
                                    ]}
                                    data={initData?.cityCapacitySta?.map(city => {
                                        return {
                                           ...city
                                            value: city.count
                                        };
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
                                        <span className={styles.areaContentDataItemData1}>
                                            {initData?.totalCapacity}
                                        </span>
                                        <span className={styles.areaContentDataItemData2}>MW</span>
                                    </div>
                                </div>
                                <div className={styles.areaContentDataItem}>
                                    <Badge
                                        color="#54CFFF"
                                        text={<span style={{ color: "#FFFFFF" }}>电站个数</span>}
                                    />
                                    <div className={styles.areaContentDataItemData}>
                                        <span className={styles.areaContentDataItemData1}>
                                            {initData?.totalPlant}
                                        </span>
                                        <span className={styles.areaContentDataItemData2}>个</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
                <WorkOrder data={initData?.workOrderSummery} />
            </div>

            {/* 底部 */}
            <div className={styles.networkBottom}>
                <Title title={"信息汇总"} />
                <div className={styles.areaContent}>
                    <ScrollTable
                        columns={[
                            {
                                title: "地区",
                                key: "province",
                            },
                            {
                                title: "总装机容量(MW)",
                                key: "capacity",
                            },
                            {
                                title: "电源侧/电网侧(MW)",
                                key: "supplyGridCapacity",
                            },
                            {
                                title: "电站总数(个)",
                                key: "plantCount",
                            },
                            {
                                title: "电源侧/电网侧(个)",
                                key: "supplyGridPlantCount",
                            },
                        ]}
                        dataSource={initData?.infoSummary}
                    />
                </div>
            </div>

            {/* 地图搜索 */}
            <div className={styles.search}>
                <Form layout="inline">
                    <Form.Item label="项目类型">
                        <Select
                            style={{ width: 220, height: 32 }}
                            options={[
                                { label: "电网侧", value: "电网侧" },
                                { label: "电源侧", value: "电源侧" },
                            ]}
                            onChange={value => {
                                setType(value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="项目名称">
                        <Input
                            style={{ width: 220, height: 32 }}
                            value={name}
                            onChange={e => {
                                setName(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="项目地址">
                        <Input
                            value={address}
                            style={{ width: 220, height: 32 }}
                            onChange={e => {
                                setAddress(e.target.value);
                            }}
                        />
                    </Form.Item>
                </Form>
                <div className={styles.btn} onClick={handleSearch}>
                    搜索
                </div>
                <div className={styles.btn} onClick={handleReset}>
                    重置
                </div>
            </div>
        </div>
    );
};

export default Network;
