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
import PlantOverview from "../../../components/PlantOverview";

const zoomCenter = {
    Domestic: {
        zoom: 18,
        center: [104.083736, 30.653187],
    },
    Foreign: {
        zoom: 3,
        center: [-27.199145, 14.743877],
    },
};


const Network = ({ onChangedType }) => {
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
            <Map plants={mapPlants} panTo={mapPanTo} center={[89.110251, 30.85187]} zoom={5} />
            {/* 左边 */}
            <div className={styles.left}>
                <PlantOverview
                    data={{
                        total: initData?.cityCapacitySta?.map(city => {
                            return {
                                ...city,
                                value: city.count,
                            };
                        }),
                        totalCapacity: initData?.totalCapacity,
                        totalPlant: initData?.totalPlant,
                    }}
                />
                <WorkOrder data={initData?.workOrderSummery} />
            </div>

            {/* 底部 */}
            <div className={styles.networkBottom}>
                <Card
                    title="项目汇总"
                    content={
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
                                    title: "总电站个数(个)",
                                    key: "plantCount",
                                },
                                {
                                    title: "电源侧/电网侧(个)",
                                    key: "supplyGridPlantCount",
                                },
                            ]}
                            dataSource={initData?.infoSummary}
                        />
                    }
                />
            </div>

            {/* 地图搜索 */}
            <div className={styles.search}>
                <Form layout="inline">
                    <Form.Item label="项目类型">
                        <Select
                            className={styles.input}
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
                            lassName={styles.input}
                            value={name}
                            onChange={e => {
                                setName(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="项目地址">
                        <Input
                            value={address}
                            lassName={styles.input}
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
