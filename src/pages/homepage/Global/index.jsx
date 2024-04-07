import { Card, Typography, theme } from "antd";
import { useState } from "react";
import { ScrollTable, Title, StaticsCard } from "@/components";
import styles from "./index.less";
import JiangsuMap from "./JiangsuMap";
import AreaStatisc from "./AreaStatisc";
import LoadStatisc from "./LoadStatisc";
import UserTypeStatistic from "./UserTypeStatistic";
import { 
    getGlobalDashboardSummery as getGlobalDashboardSummeryServe,
} from "@/services"
import { useEffect } from "react";

const Global = () => {
    const { token } = theme.useToken();
    const [data, setData] = useState({
        resource: {
            title: "资源分布统计",
            dataSource: [
                {
                    label: "用户数量",
                    value: 0,
                    color: token.color2,
                    icon: 'icon-yonghushuliang',
                },
                {
                    label: "设备资源",
                    value: 0,
                    color: token.color3,
                    icon: 'icon-shebeiziyuan'
                },
                {
                    label: "签约容量(KW)",
                    value: 0,
                    color: token.color4,
                    icon: 'icon-qianyuerongliang'
                },
                {
                    label: "最大可调负荷(KW)",
                    value: 0,
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
                    value: 0,
                    color: token.color6,
                    icon: 'icon-leijishouyi1'
                },
                {
                    label: "本年收益(元)",
                    value: 0,
                    color: token.color5,
                    icon: 'icon-bennianshouyi'
                },
                {
                    label: "次年预计收益(元)",
                    value: 0,
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
                    value: 0,
                    color: token.color8,
                    icon: 'icon-yaoyuezongshu'
                },
                {
                    label: "响应成功数",
                    value: 0,
                    color: token.color7,
                    icon: 'icon-xiangyingchenggongshu'
                },
                {
                    label: "响应成功率",
                    value: 0,
                    color: token.color9,
                    icon: 'icon-xiangyingchenggongshuai'
                },
                {
                    label: "有效响应功率(KW)",
                    value: 0,
                    color: token.color3,
                    icon: 'icon-youxiaoxiangyinggongshuai'
                },
            ],
        },
    });

    const [dataSource, setDataSource] = useState({});

    const getData = async () => {
        const res = await getGlobalDashboardSummeryServe();
        if(res?.data?.data){
            const cloneData = JSON.parse(JSON.stringify(data));
            const result = res?.data?.data;
            console.log(result);
            setDataSource(result);
            cloneData.resource.dataSource[0].value = result.companySummary.companyCount;
            cloneData.resource.dataSource[1].value = result.companySummary.deviceCount;
            cloneData.resource.dataSource[2].value = result.companySummary.maxLoad;
            cloneData.resource.dataSource[3].value = result.companySummary.maxAdjustableLoad;

            cloneData.responseIncome.dataSource[0].value = result.inviteTaskProfitSummary.profitSummary;
            cloneData.responseIncome.dataSource[1].value = result.inviteTaskProfitSummary.currentYearProfit;
            cloneData.responseIncome.dataSource[2].value = result.inviteTaskProfitSummary.followingYearProjectedProfit;

            cloneData.responseExecute.dataSource[0].value = result.inviteTaskSummary.inviteCount;
            cloneData.responseExecute.dataSource[1].value = result.inviteTaskSummary.executeSuccessTaskCount;
            cloneData.responseExecute.dataSource[2].value = result.inviteTaskSummary.responseSuccessRate;
            cloneData.responseExecute.dataSource[3].value = result.inviteTaskSummary.effectiveResponsePower;

            setData(cloneData);
        }
    }

    useEffect(() => {
        getData();
    }, [])
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
                            <AreaStatisc dataSource={dataSource?.area2CompanyCount}/>
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
                        <LoadStatisc dataSource={dataSource?.timeSharingLoad?.loads} />
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
                                        key: 'companyName',
                                    },
                                    {
                                        title: "任务派发数量",
                                        key: 'taskCount',
                                    },
                                    {
                                        title: "任务承接数量",
                                        key: 'confirmTaskCount',
                                    },
                                    {
                                        title: "任务完成数量",
                                        key: 'executeSuccessTaskCount',
                                    },
                                    {
                                        title: "有效响应容量(KW)",
                                        key: 'responseCapacity',
                                    },
                                ]}
                                dataSource={dataSource?.companyTaskSummaries||[]}
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
                            <UserTypeStatistic dataSource={dataSource?.stationType2CompanyCount} />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Global;
