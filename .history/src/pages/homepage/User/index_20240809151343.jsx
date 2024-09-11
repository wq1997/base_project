import { theme as antdTheme, Card } from "antd";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useState, useEffect } from "react";
import { Title, StaticsCard, ScrollTable } from "@/components";
import { useSelector } from "umi";
import { getCompanyDashboardSummery as getCompanyDashboardSummeryServe } from "@/services";
import resourceImg from "../../../../public/images/resource.svg";
import responseIncomeImg from "../../../../public/images/responseIncome.svg";
import responseExecuteImg from "../../../../public/images/responseExecute.svg";
import resourceDarkImg from "../../../../public/images/resourceDark.svg";
import responseIncomeDarkImg from "../../../../public/images/responseIncomeDark.svg";
import responseExecuteDarkImg from "../../../../public/images/responseExecuteDark.svg";
import userHomepageRightImg from "../../../../public/images/user_homepage_right.png";
import companyLevelImg from "../../../../public/images/companyLevel.svg";
import companyLevelDarkImg from "../../../../public/images/companyLevelDark.svg";
import companyLevelRightDarkImg from "../../../../public/images/companyLevelRightDark.svg";
import companyLevelRightImg from "../../../../public/images/companyLevelRight.svg";
import LoadStatisc from "./LoadStatisc";
import SocStatisc from "./SocStatisc";
import { recordPage } from "@/utils/utils";
import { useRequest } from "ahooks";

const User = () => {
    recordPage("op:user_mode");
    const { token } = antdTheme.useToken();
    const { theme } = useSelector(state => state.global);
    const [dataSource, setDataSource] = useState({});
    const colorList = [
        token.color29,
        token.color30,
        token.color31,
        token.color32,
        token.color33,
        token.color34,
        token.color35,
        token.color36,
        token.color37,
    ];

    const mainStyle = useEmotionCss(() => {
        return {
            width: "100%",
            minHeight: "calc(100vh - 130px)",
            background: token.color28,
            padding: "25px 14px",
            boxSizing: "border-box",
            ".top": {
                height: 550,
                display: "flex",
                ".left": {
                    width: "calc(45% - 5px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "4px",
                    ".cardData": {
                        width: "100%",
                        height: "108px",
                        display: "flex",
                        gap: "4px",
                    },
                },
                ".right": {
                    width: "calc(55% - 5px)",
                    height: "100%",
                    img: {
                        width: "100%",
                        height: "calc(100% - 60px)",
                        objectFit: "cover",
                    },
                },
            },
            ".center": {
                width: "100%",
                height: "600px",
                margin: "50px 0",
                ".centerLoadStatisc": {
                    height: "calc(50% - 40px)",
                },
                ".centerSocStatisc": {
                    height: "calc(40% - 40px)",
                },
            },
            ".bottom": {
                height: 200,
                display: "flex",
                ".left": {
                    width: "calc(45% - 5px)",
                },
                ".right": {
                    width: "calc(55% - 5px)",
                },
            },
        };
    });

    const [data, setData] = useState({
        resource: {
            title: "资源分布统计",
            dataSource: [
                {
                    label: "设备资源",
                    value: 0,
                    img: resourceImg,
                    darkImg: resourceDarkImg,
                },
                {
                    label: "签约容量(KW)",
                    value: 0,
                    img: resourceImg,
                    darkImg: resourceDarkImg,
                },
                {
                    label: "最大可调负荷(KW)",
                    value: 0,
                    img: resourceImg,
                    darkImg: resourceDarkImg,
                },
            ],
        },
        responseIncome: {
            title: "响应收益统计",
            dataSource: [
                {
                    label: "累计收益(元)",
                    value: 0,
                    img: responseIncomeImg,
                    darkImg: responseIncomeDarkImg,
                },
                {
                    label: "本年收益(元)",
                    value: 0,
                    img: responseIncomeImg,
                    darkImg: responseIncomeDarkImg,
                },
                {
                    label: "次年预计收益(元)",
                    value: 0,
                    img: responseIncomeImg,
                    darkImg: responseIncomeDarkImg,
                },
            ],
        },
        responseExecute: {
            title: "响应执行统计",
            dataSource: [
                {
                    label: "接收任务数",
                    value: 0,
                    img: responseExecuteImg,
                    darkImg: responseExecuteDarkImg,
                },
                {
                    label: "完成总数",
                    value: 0,
                    img: responseExecuteImg,
                    darkImg: responseExecuteDarkImg,
                },
                {
                    label: "有效响应功率(KW)",
                    value: 0,
                    img: responseExecuteImg,
                    darkImg: responseExecuteDarkImg,
                },
            ],
        },
    });

    const { data: result, run } = useRequest(getCompanyDashboardSummeryServe, {
        manual: true,
        pollingInterval: 1000 * 60 * 5,
        refreshDeps: [theme],
    });

    useEffect(() => {
        if (result?.data?.data) {
            const cloneData = JSON.parse(JSON.stringify(data));
            const resultData = result?.data?.data;
            cloneData.resource.dataSource[0].value = resultData?.deviceCount || 0;
            cloneData.resource.dataSource[1].value = resultData?.maxLoad || 0;
            cloneData.resource.dataSource[2].value = resultData?.maxAdjustableLoad || 0;

            cloneData.responseIncome.dataSource[0].value = resultData?.profitSummary || 0;
            cloneData.responseIncome.dataSource[1].value = resultData?.currentYearProfit || 0;
            cloneData.responseIncome.dataSource[2].value =
                resultData?.followingYearProjectedProfit || 0;

            cloneData.responseExecute.dataSource[0].value = resultData?.receiveTaskCount || 0;
            cloneData.responseExecute.dataSource[1].value =
                resultData?.executeSuccessTaskCount || 0;
            cloneData.responseExecute.dataSource[2].value = resultData?.effectiveResponsePower || 0;

            setDataSource(resultData);
            setData(cloneData);
        }
    }, [result]);

    useEffect(() => {
        run();
    }, []);

    return (
        <div className={mainStyle}>
            <div className="top">
                <div className="left">
                    {Object.keys(data)?.map(item => {
                        return (
                            <div style={{ flex: 1, height: "100%" }}>
                                <Title style={{ marginTop: 0, marginBottom: 20 }}>
                                    {data[item].title}
                                </Title>
                                <div className="cardData">
                                    {data[item].dataSource?.map(dataSource => {
                                        return (
                                            <StaticsCard.SubStaticsCard
                                                image={
                                                    theme === "dark"
                                                        ? dataSource.darkImg
                                                        : dataSource.img
                                                }
                                                color={colorList.shift()}
                                                label={dataSource.label}
                                                value={dataSource.value}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="right">
                    <Title style={{ marginTop: 0, marginBottom: 20 }}>场站运行模拟</Title>
                    <img src={userHomepageRightImg} />
                </div>
            </div>
            <div className={"center"}>
                <div style={{ height: "100%", width: "100%" }}>
                    <Title style={{ marginTop: 0, marginBottom: 20 }}>分时负荷统计</Title>
                    <div className={"centerLoadStatisc"}>
                        <LoadStatisc dataSource={dataSource?.timeSharingLoad?.loads || []} />
                    </div>
                    <div className={"centerLoadStatisc"}>
                        <SocStatisc dataSource={dataSource?.timeSharingLoad?.loads || []} />
                    </div>
                </div>
            </div>
            <div className={"bottom"}>
                <div className="left">
                    <Title style={{ marginTop: 0, marginBottom: 20 }}>公司评级</Title>
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                width: "80%",
                                height: "calc(100% - 30px)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div style={{ position: "relative" }}>
                                <img
                                    src={theme === "dark" ? companyLevelDarkImg : companyLevelImg}
                                />
                                <span
                                    style={{
                                        fontSize: 60,
                                        position: "absolute",
                                        left: "50%",
                                        top: "45%",
                                        transform: "translate(-50%, -50%)",
                                        color: token.color50,
                                    }}
                                >
                                    {dataSource?.companyLevel}
                                </span>
                            </div>
                            <div style={{ position: "relative" }}>
                                <img
                                    src={
                                        theme === "dark"
                                            ? companyLevelRightDarkImg
                                            : companyLevelRightImg
                                    }
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: "60%",
                                        transform: "translate(-50%, -50%)",
                                        color: token.color50,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 40,
                                            fontFamily: "DingTalkJinBuTi",
                                            color: token.color37,
                                            textAlign: "center",
                                        }}
                                    >
                                        {dataSource?.complianceRate || 0}%
                                    </div>
                                    <div
                                        style={{
                                            color: token.color51,
                                            fontSize: 16,
                                            textAlign: "center",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        履约率(近半年)
                                    </div>
                                </div>
                            </div>
                            <div style={{ position: "relative" }}>
                                <img
                                    src={
                                        theme === "dark"
                                            ? companyLevelRightDarkImg
                                            : companyLevelRightImg
                                    }
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: "60%",
                                        transform: "translate(-50%, -50%)",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontFamily: "DingTalkJinBuTi",
                                            textAlign: "center",
                                            color: token.color52,
                                        }}
                                    >
                                        <span style={{ fontSize: 40 }}>
                                            {dataSource?.responseRanking}
                                        </span>
                                        <span style={{ fontSize: 20 }}>
                                            {" "}
                                            / {dataSource?.totalCompanyCount}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            color: token.color51,
                                            fontSize: 16,
                                            textAlign: "center",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        响应量排名
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <Title style={{ marginTop: 0, marginBottom: 20 }}>用户响应统计</Title>
                    <div
                        style={{
                            width: "100%",
                            height: "calc(100% - 30px)",
                        }}
                    >
                        <ScrollTable
                            columns={[
                                {
                                    title: "响应类型",
                                    key: "type",
                                },
                                {
                                    title: "日前响应(kW)",
                                    key: "dayBefore",
                                },
                                {
                                    title: "日中响应(kW)",
                                    key: "dayIn",
                                },
                                {
                                    title: "实时响应(kW)",
                                    key: "realTime",
                                },
                            ]}
                            dataSource={[
                                {
                                    type: "削峰",
                                    dayBefore:
                                        dataSource?.companyResponseSummery?.heightPeakCut
                                            ?.dayBefore,
                                    dayIn: dataSource?.companyResponseSummery?.heightPeakCut?.dayIn,
                                    realTime:
                                        dataSource?.companyResponseSummery?.heightPeakCut?.realTime,
                                },
                                {
                                    type: "填谷",
                                    dayBefore:
                                        dataSource?.companyResponseSummery?.lowPeakCut?.dayBefore,
                                    dayIn: dataSource?.companyResponseSummery?.lowPeakCut?.dayIn,
                                    realTime:
                                        dataSource?.companyResponseSummery?.lowPeakCut?.realTime,
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
