import { Card, Typography, theme } from "antd";
import { useState } from "react";
import { ScrollTable, Title, StaticsCard } from "@/components";
import styles from "./index.less";
import JiangsuMap from "./JiangsuMap";
import AreaStatisc from "./AreaStatisc";
import LoadStatisc from "./LoadStatisc";
import UserTypeStatistic from "./UserTypeStatistic";

const Global = () => {
    const { token } = theme.useToken();
    const [data, setData] = useState({
        resource: {
            title: "资源分布统计",
            dataSource: [
                {
                    label: "用户数量",
                    value: 4,
                    color: token.color2,
                    icon: 'icon-yonghushuliang',
                },
                {
                    label: "设备资源",
                    value: 16,
                    color: token.color3,
                    icon: 'icon-shebeiziyuan'
                },
                {
                    label: "签约容量(KW)",
                    value: 40000,
                    color: token.color4,
                    icon: 'icon-qianyuerongliang'
                },
                {
                    label: "最大可调负荷(KW)",
                    value: 40000,
                    color: token.color5,
                    icon: 'icon-zuidaketiaofuhe'
                },
            ],
        },
        responseIncome: {
            title: "响应收益统计",
            dataSource: [
                {
                    label: "累计收益(元)",
                    value: 90171.92,
                    color: token.color6,
                    icon: 'icon-leijishouyi1'
                },
                {
                    label: "本年收益(元)",
                    value: 46250,
                    color: token.color5,
                    icon: 'icon-bennianshouyi'
                },
                {
                    label: "次年预计收益(元)",
                    value: 128509,
                    color: token.color7,
                    icon: 'icon-cinianyujishouyi'
                },
            ],
        },
        responseExecute: {
            title: "响应执行统计",
            dataSource: [
                {
                    label: "邀约总数",
                    value: 2,
                    color: token.color8,
                    icon: 'icon-yaoyuezongshu'
                },
                {
                    label: "响应成功数",
                    value: 2,
                    color: token.color7,
                    icon: 'icon-xiangyingchenggongshu'
                },
                {
                    label: "响应成功率",
                    value: "100%",
                    color: token.color9,
                    icon: 'icon-xiangyingchenggongshuai'
                },
                {
                    label: "有效响应功率(KW)",
                    value: 11921,
                    color: token.color3,
                    icon: 'icon-youxiaoxiangyinggongshuai'
                },
            ],
        },
    });
    return (
        <div>
            <div className={styles.top}>
                <div className={styles.topLeft}>
                    {Object.keys(data)?.map(item => {
                        return (
                            <Card style={{ flex: 1, height: "100%" }}>
                                <Title
                                    style={{ marginTop: 0, marginBottom: 20 }}
                                >
                                    {data[item].title}
                                </Title>
                                <div className={styles.cardData}>
                                    {data[item].dataSource?.map(dataSource => {
                                        return (
                                            <StaticsCard 
                                                icon={dataSource.icon}
                                                color={dataSource.color}
                                                label={dataSource.label}
                                                value={dataSource.value}
                                            />
                                        );
                                    })}
                                </div>
                            </Card>
                        );
                    })}
                </div>
                <div className={styles.topRight}>
                    <Card style={{ height: "100%", width: "100%" }}>
                        <div className={styles.topRightItem}>
                            <Title>
                                用户分布统计(江苏省)
                            </Title>
                            <JiangsuMap
                                allPlant={[
                                    {
                                        longitude: 120.72816,
                                        latitude: 31.69943,
                                        name: "苏州京浜光电科技股份有限公司	",
                                    },
                                    {
                                        longitude: 121.53228,
                                        latitude: 31.844902,
                                        name: "江苏海四达新能源有限公司",
                                    },
                                    {
                                        longitude: 121.640297,
                                        latitude: 31.80057,
                                        name: "江苏海四达动力科技有限公司",
                                    },
                                    {
                                        longitude: 119.437057,
                                        latitude: 34.640018,
                                        name: "连云港市连云区板桥工业园区",
                                    },
                                ]}
                            />
                        </div>
                        <div className={styles.topRightItem}>
                            <AreaStatisc />
                        </div>
                    </Card>
                </div>
            </div>

            <div className={styles.center}>
                <Card style={{ height: "100%", width: "100%" }}>
                    <Title style={{ marginTop: 0, marginBottom: 20 }}>
                        分时负荷统计
                    </Title>
                    <div className={styles.centerLoadStatisc}>
                        <LoadStatisc />
                    </div>
                </Card>
            </div>

            <div className={styles.bottom}>
                <div className={styles.bottomLeft}>
                    <Card style={{ height: "100%", width: "100%" }}>
                        <Title style={{ marginTop: 0, marginBottom: 20 }}>
                            用户响应汇总
                        </Title>
                        <div className={styles.bottomLeftContent}>
                            <ScrollTable
                                columns={[
                                    {
                                        title: "用户名",
                                        key: 1,
                                    },
                                    {
                                        title: "任务派发数量",
                                        key: 2,
                                    },
                                    {
                                        title: "任务承接数量",
                                        key: 3,
                                    },
                                    {
                                        title: "任务完成数量",
                                        key: 4,
                                    },
                                    {
                                        title: "有效响应容量(KW)",
                                        key: 5,
                                    },
                                ]}
                                dataSource={[
                                    {
                                        1: "连云港华乐不锈钢制品有限公司",
                                        2: 2,
                                        3: 2,
                                        4: 2,
                                        5: 9000,
                                    },
                                    {
                                        1: "江苏海四达新能源有限公司",
                                        2: 2,
                                        3: 2,
                                        4: 2,
                                        5: 1178,
                                    },
                                    {
                                        1: "苏州京浜光电科技股份有限公司",
                                        2: 2,
                                        3: 2,
                                        4: 2,
                                        5: 799,
                                    },
                                    {
                                        1: "江苏海四达动力科技有限公司",
                                        2: 2,
                                        3: 2,
                                        4: 2,
                                        5: 779,
                                    },
                                ]}
                            />
                        </div>
                    </Card>
                </div>
                <div className={styles.bottomRight}>
                    <Card style={{ height: "100%", width: "100%" }}>
                        <Title style={{ marginTop: 0, marginBottom: 20 }}>
                            接入用户类型
                        </Title>
                        <div className={styles.bottomRightContent}>
                            <UserTypeStatistic />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Global;
