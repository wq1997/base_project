import { Charts3D, Charts2_5D, ScrollTable } from "@/components";
import Title from "../Title";
import styles from "./index.less";
import Map from "@/pages/largeScreens/components/map";
import Header from "../Header";
import classNames from "classnames";
import { Form, Select, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { getNetScreenData as getNetScreenDataServer } from "@/services/largeScreen";

const Network = ({ typeList, currentType, onChangedType }) => {
    const [initData, setInitData] = useState();
    
    const [searchParams, setSearchParams] = useState({
        name: "",
        address: "",
    });

    const getInitData = async () => {
        const res = await getNetScreenDataServer();
        if (res?.data?.status == "SUCCESS") {
            setInitData(res?.data?.data);
            console.log(res?.data?.data);
        }
    };

    useEffect(() => {
        getInitData();
    }, []);

    return (
        <div className={styles.network}>
            <Map plants={initData?.plants} showInfo={true} />
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
                <Title title={"电站概览"} />
                <div className={classNames(styles.areaContent, styles.areaLeftContent)}>
                    <div className={styles.top}>
                        <div className={styles.data}>
                            <span className={styles.label}>总装机容量：</span>
                            <span className={styles.value}>XXXXXXXXX</span>
                        </div>
                        <div className={styles.chart}>
                            <Charts3D
                                colorList={[
                                    "#00F69C",
                                    "#E6A5FF",
                                    "#76B3FF",
                                    "#FFEF72",
                                    "#34FFFD",
                                    "#4BE8FF",
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
                                ]}
                                autoRotate={false}
                                showLengend={true}
                            />
                            <Charts3D
                                colorList={["#00F9FF", "#FFF100"]}
                                data={[
                                    {
                                        name: "源侧",
                                        value: 134,
                                    },
                                    {
                                        name: "网侧",
                                        value: 56,
                                    },
                                ]}
                                autoRotate={false}
                                showLengend={true}
                            />
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.data}>
                            <span className={styles.label}>总电站个数：</span>
                            <span className={styles.value}>XXXXXXXXX</span>
                        </div>
                        <div className={styles.chart}>
                            <Charts3D
                                colorList={[
                                    "#00F69C",
                                    "#E6A5FF",
                                    "#76B3FF",
                                    "#FFEF72",
                                    "#34FFFD",
                                    "#4BE8FF",
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
                                ]}
                                autoRotate={false}
                                showLengend={true}
                            />
                            <Charts3D
                                colorList={["#00F9FF", "#FFF100"]}
                                data={[
                                    {
                                        name: "源侧",
                                        value: 134,
                                    },
                                    {
                                        name: "网侧",
                                        value: 56,
                                    },
                                ]}
                                autoRotate={false}
                                showLengend={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 底部 */}
            <div className={styles.networkBottom}>
                <Title title={"项目列表"} />
                <div className={styles.areaContent}>
                    <ScrollTable
                        columns={[
                            {
                                title: "项目名称",
                                key: "1",
                            },
                            {
                                title: "项目类型",
                                key: "2",
                            },
                            {
                                title: "项目地址",
                                key: "3",
                            },
                        ]}
                        dataSource={[1, 2, 3, 4, 5]?.map(item => {
                            return {
                                1: "一级",
                                2: "普通",
                                3: "宁夏回族自治区灵武市宁东镇狼南线国能宁东",
                            };
                        })}
                    />
                </div>
            </div>

            {/* 地图搜索 */}
            <div className={styles.search}>
                <Form layout="inline">
                    <Form.Item label="项目类型">
                        <Select
                            style={{ width: 220, height: 40 }}
                            options={[{ label: "1", value: 1 }]}
                        />
                    </Form.Item>
                    <Form.Item label="项目名称">
                        <Input
                            style={{ width: 220, height: 40 }}
                            onChange={e => {
                                setSearchParams({
                                    ...searchParams,
                                    name: e.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="项目地址">
                        <Input
                            style={{ width: 220, height: 40 }}
                            onChange={e => {
                                setSearchParams({
                                    ...searchParams,
                                    address: e.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                </Form>
                <Button className={styles.btn} onClick={()=>{}}>搜索</Button>
            </div>
        </div>
    );
};

export default Network;
