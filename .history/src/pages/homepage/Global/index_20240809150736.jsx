import { Card, theme as antdTheme } from "antd";
import { useState } from "react";
import { ScrollTable, Title, StaticsCard } from "@/components";
import styles from "./index.less";
import JiangsuMap from "./JiangsuMap";
import AreaStatisc from "./AreaStatisc";
import LoadStatisc from "./LoadStatisc";
import SocStatisc from "./SocStatisc";
import UserTypeStatistic from "./UserTypeStatistic";
import { getGlobalDashboardSummery as getGlobalDashboardSummeryServe } from "@/services";
import { useEffect } from "react";
import { useSelector } from "umi";
import { recordPage } from "@/utils/utils";
import { useRequest } from "ahooks";
import classNames from "classnames";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import global1Img from "../../../assets/images/global1.svg";
import global2Img from "../../../assets/images/global2.svg";
import global3Img from "../../../assets/images/global3.svg";
import global4Img from "../../../assets/images/global4.svg";
import global5Img from "../../../assets/images/global5.svg";
import global6Img from "../../../assets/images/global6.svg";
import global7Img from "../../../assets/images/global7.svg";
import global8Img from "../../../assets/images/global8.svg";
import global9Img from "../../../assets/images/global9.svg";
import global10Img from "../../../assets/images/global10.svg";

const Global = () => {
    recordPage("op:global_mode");
    const { theme } = useSelector(state => state.global);
    const { token } = antdTheme.useToken();
    const globalStyle = useEmotionCss(() => {
        return {
            ".areaBackground": {
                backgroundColor: token.color53,
            },
        };
    });

    const [data, setData] = useState({
        resource: {
            title: "资源分布统计",
            dataSource: [
                {
                    label: "用户数量",
                    value: 0,
                    img: global1Img,
                    valueColor: "#39A3F3",
                },
                {
                    label: "设备资源",
                    value: 0,
                    img: global2Img,
                    valueColor: "#FF9120",
                },
                {
                    label: "签约容量(kW)",
                    value: 0,
                    img: global3Img,
                    valueColor: "#AD4AFE",
                },
                {
                    label: "最大可调负荷(kW)",
                    value: 0,
                    img: global4Img,
                    valueColor: "#39F36E",
                },
            ],
        },
        responseIncome: {
            title: "响应收益统计",
            dataSource: [
                {
                    label: "累计收益(元)",
                    value: 0,
                    defaultImg: global5Img,
                    darkImg: global6Img,
                    valueColor: "#AD4AFE",
                },
                {
                    label: "本年收益(元)",
                    value: 0,
                    defaultImg: global7Img,
                    darkImg: global8Img,
                    valueColor: "#FF8520",
                },
                {
                    label: "次年预计收益(元)",
                    value: 0,
                    defaultImg: global9Img,
                    darkImg: global10Img,
                    valueColor: "#39A3F3",
                },
            ],
        },
        responseExecute: {
            title: "响应执行统计",
            dataSource: [
                {
                    label: "邀约总数",
                    value: 0,
                    valueColor: "#FF8600",
                },
                {
                    label: "响应成功数",
                    value: 0,
                    valueColor: "#03B4B4",
                },
                {
                    label: "响应成功率(%)",
                    value: 0,
                    valueColor: "#39A3F3",
                },
                {
                    label: "有效响应功率(KW)",
                    value: 0,
                    valueColor: "#FD76DD",
                },
            ],
        },
    });

    const [dataSource, setDataSource] = useState({});

    const {
        data: result,
        run,
        cancel,
    } = useRequest(getGlobalDashboardSummeryServe, {
        manual: true,
        pollingInterval: 1000 * 60 * 5,
        refreshDeps: [theme],
    });

    useEffect(() => {
        if (result) {
            const cloneData = JSON.parse(JSON.stringify(data));
            const resultData = result?.data?.data;
            cloneData.resource.dataSource[0].value = resultData?.companySummary?.companyCount || 0;
            cloneData.resource.dataSource[1].value = resultData?.companySummary?.deviceCount || 0;
            cloneData.resource.dataSource[2].value = resultData?.companySummary?.maxLoad || 0;
            cloneData.resource.dataSource[3].value =
                resultData?.companySummary?.maxAdjustableLoad || 0;

            cloneData.responseIncome.dataSource[0].value =
                resultData?.inviteTaskProfitSummary?.profitSummary || 0;
            cloneData.responseIncome.dataSource[1].value =
                resultData?.inviteTaskProfitSummary?.currentYearProfit || 0;
            cloneData.responseIncome.dataSource[2].value =
                resultData?.inviteTaskProfitSummary?.followingYearProjectedProfit || 0;

            cloneData.responseExecute.dataSource[0].value =
                resultData?.inviteTaskSummary?.inviteCount || 0;
            cloneData.responseExecute.dataSource[1].value =
                resultData?.inviteTaskSummary?.executeSuccessTaskCount || 0;
            cloneData.responseExecute.dataSource[2].value =
                resultData?.inviteTaskSummary?.responseSuccessRate || 0;
            cloneData.responseExecute.dataSource[3].value =
                resultData?.inviteTaskSummary?.effectiveResponsePower || 0;

            setDataSource(resultData);
            setData(cloneData);
        }
    }, [result]);

    useEffect(() => {
        run();
    }, [theme]);

    return (
        <div className={classNames(styles.global, globalStyle)}>
            <div className={classNames(styles.area1, "areaBackground")}>
                <Title>资源分布统计</Title>
                <div className={styles.content}>
                    {data?.resource?.dataSource?.map(item => {
                        return (
                            <div className={styles.card} style={{ background: token.color54 }}>
                                <div className={styles.cardLeft}>
                                    <img src={item.img} />
                                </div>
                                <div className={styles.cardRight}>
                                    <div
                                        className={styles.cardRightTop}
                                        style={{ color: item.valueColor }}
                                    >
                                        {item.value}
                                    </div>
                                    <div
                                        className={styles.cardRightBottom}
                                        style={{ color: token.color11 }}
                                    >
                                        {item.label}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={classNames(styles.area2, "areaBackground")}>
                <Title>用户分布统计(江苏省)</Title>
                <div className={styles.content}>
                    <div className={styles.contentLeft}>
                        <AreaStatisc dataSource={dataSource?.area2CompanyCount} />
                    </div>
                    <div className={styles.contentRight}>
                        <div className={styles.contentRightChart}>
                            <JiangsuMap allPlant={dataSource?.companies} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classNames(styles.area3, "areaBackground")}>
                <Title>接入用户类型</Title>
                <div className={styles.content}>
                    <UserTypeStatistic dataSource={dataSource?.stationType2CompanyCount} />
                </div>
            </div>
            <div className={classNames(styles.area4, "areaBackground")}>
                <Title>响应执行统计</Title>
                <div className={styles.content}>
                    {data?.responseExecute?.dataSource?.map(item => {
                        return (
                            <div className={styles.card} style={{ background: token.color55 }}>
                                <div className={styles.cardTop} style={{ color: item.valueColor }}>
                                    {item.value}
                                </div>
                                <div className={styles.cardBottom} style={{ color: token.color11 }}>
                                    {item.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={classNames(styles.area5, "areaBackground")}>
                <Title>响应收益统计</Title>
                <div className={styles.content}>
                    {data?.responseIncome?.dataSource?.map(item => {
                        return (
                            <div className={styles.card}>
                                <div className={styles.cardLeft}>
                                    <img src={theme === "dark" ? item.darkImg : item.defaultImg} />
                                </div>
                                <div className={styles.cardRight}>
                                    <div
                                        className={styles.cardRightTop}
                                        style={{ color: item.valueColor }}
                                    >
                                        {item.value}
                                    </div>
                                    <div
                                        className={styles.cardRightBottom}
                                        style={{ color: token.color11 }}
                                    >
                                        {item.label}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={classNames(styles.area6, "areaBackground")}>
                <Title>分时负荷统计</Title>
                <div className={styles.content}>
                    <LoadStatisc dataSource={dataSource?.timeSharingLoad?.loads} />
                </div>
                <div className={"centerLoadStatisc"}>
                    <SocStatisc dataSource={dataSource?.timeSharingLoad?.loads || []} />
                </div>
            </div>
            <div className={classNames(styles.area7, "areaBackground")}>
                <Title>用户响应汇总</Title>
                <div className={styles.content}>
                    <ScrollTable
                        columns={[
                            {
                                title: "用户名",
                                key: "companyName",
                            },
                            {
                                title: "任务派发数量",
                                key: "taskCount",
                            },
                            {
                                title: "任务承接数量",
                                key: "confirmTaskCount",
                            },
                            {
                                title: "任务完成数量",
                                key: "executeSuccessTaskCount",
                            },
                            {
                                title: "有效响应容量(KW)",
                                key: "responseCapacity",
                            },
                        ]}
                        dataSource={dataSource?.companyTaskSummaries || []}
                    />
                </div>
            </div>
        </div>
    );
};

export default Global;
