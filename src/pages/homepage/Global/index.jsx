import { Card, theme as antdTheme } from "antd";
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
import { useSelector } from "umi";

const Global = () => {
    const { theme } = useSelector(state => state.global);
    const { token } = antdTheme.useToken();
    const colorList = [
        token.color2,
        token.color3,
        token.color4,
        token.color5,
        token.color6,
        token.color5,
        token.color7,
        token.color8,
        token.color7,
        token.color9,
        token.color3
    ]
    const backgroundColorList = [
        token.color39, 
        token.color40, 
        token.color41, 
        token.color42, 
        token.color43, 
        token.color44, 
        token.color45, 
        token.color46, 
        token.color47, 
        token.color48, 
        token.color49
    ]
    const [data, setData] = useState({
        resource: {
            title: "资源分布统计",
            dataSource: [
                {
                    label: "用户数量",
                    value: 0,
                },
                {
                    label: "设备资源",
                    value: 0,
                },
                {
                    label: "签约容量(KW)",
                    value: 0,
                },
                {
                    label: "最大可调负荷(KW)",
                    value: 0,
                },
            ],
        },
        responseIncome: {
            title: "响应收益统计",
            dataSource: [
                {
                    label: "累计收益(元)",
                    value: 0,
                },
                {
                    label: "本年收益(元)",
                    value: 0,
                },
                {
                    label: "次年预计收益(元)",
                    value: 0,
                },
            ],
        },
        responseExecute: {
            title: "响应执行统计",
            dataSource: [
                {
                    label: "邀约总数",
                    value: 0,
                },
                {
                    label: "响应成功数",
                    value: 0,
                },
                {
                    label: "响应成功率(%)",
                    value: 0,
                },
                {
                    label: "有效响应功率(KW)",
                    value: 0,
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
            cloneData.resource.dataSource[0].value = result.companySummary?.companyCount || 0;
            cloneData.resource.dataSource[1].value = result.companySummary?.deviceCount || 0;
            cloneData.resource.dataSource[2].value = result.companySummary?.maxLoad || 0;
            cloneData.resource.dataSource[3].value = result.companySummary?.maxAdjustableLoad || 0;

            cloneData.responseIncome.dataSource[0].value = result.inviteTaskProfitSummary?.profitSummary || 0;
            cloneData.responseIncome.dataSource[1].value = result.inviteTaskProfitSummary?.currentYearProfit || 0;
            cloneData.responseIncome.dataSource[2].value = result.inviteTaskProfitSummary?.followingYearProjectedProfit || 0;

            cloneData.responseExecute.dataSource[0].value = result.inviteTaskSummary?.inviteCount || 0;
            cloneData.responseExecute.dataSource[1].value = result.inviteTaskSummary?.executeSuccessTaskCount || 0;
            cloneData.responseExecute.dataSource[2].value = result.inviteTaskSummary?.responseSuccessRate || 0;
            cloneData.responseExecute.dataSource[3].value = result.inviteTaskSummary?.effectiveResponsePower || 0;
            
            setDataSource(result);
            setData(cloneData);
        }
    }

    useEffect(() => {
        getData();
    }, [theme])

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
                                    {data[item].dataSource?.map((dataSource) => {
                                        return (
                                            <StaticsCard 
                                                icon={dataSource.icon}
                                                color={colorList.shift()}
                                                label={dataSource.label}
                                                value={dataSource.value}
                                                backgroundColor={backgroundColorList.shift()}
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
                                allPlant={dataSource?.companies}
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
