import { Button, Space, Badge, theme as antdTheme } from "antd";
import { getWaitConfirmTasks as getWaitConfirmTasksServer } from "@/services/task";
import "./index.less";
import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Title, StaticsCard } from "@/components";
import classNames from "classnames";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useSelector } from "umi";
import {
    getTaskDashboardById as getTaskDashboardByIdServer,
    confirmTask as confirmTaskServer,
    refuseTask as refuseTaskServer,
} from "@/services/task";
import { history, useLocation } from "umi";

const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];
const Confirm = () => {
    const location = useLocation();
    const { token } = antdTheme.useToken();
    const { theme } = useSelector(state => state.global);
    const [isWaitTask, setIsWaitTask] = useState();
    const [taskInfo, setTaskInfo] = useState({});
    const [options, setOptions] = useState({});
    const [taskAskData, setTaskAskData] = useState([
        {
            label: "响应类型",
            value: "",
            color: token.color15,
            icon: "icon-xiangyingleixing",
        },
        {
            label: "任务功率(KW)",
            value: "",
            color: token.color4,
            icon: "icon-renwugongshuai",
        },
        {
            label: "预计收益(元)",
            value: "",
            color: token.color7,
            icon: "icon-yujishouyi",
        },
    ]);

    const getOptions = () => {
        setOptions({
            legend: {
                data: ["预计基线负荷（kW）", "签约响应量（kW）", "任务量（kW）", "实际响应（kW）"],
                textStyle: {
                    color: token.color11,
                },
            },
            grid: {
                top: "10%",
                left: 50,
                right: 50,
                bottom: 20,
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {},
                },
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: [
                    "13:00",
                    "13:15",
                    "13:30",
                    "13:45",
                    "14:00",
                    "14:15",
                    "14:30",
                    "14:45",
                    "15:00",
                    "15:15",
                    "15:30",
                    "15:45",
                    "16:00",
                ],
                axisLabel: {
                    color: token.color11,
                },
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value} kW",
                },
                axisPointer: {
                    snap: true,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: [token.color25],
                    },
                },
                axisLabel: {
                    color: token.color11,
                },
            },
            series: [
                {
                    name: "预计基线负荷（kW）",
                    type: "line",
                    smooth: true,
                    data: [
                        8532, 19231, 32643, 32763, 39232, 41204, 40401.6, 38804, 35804, 32811,
                        35892, 37281, 23172,
                    ],
                    symbol: "none",
                    lineStyle: {
                        width: 3,
                        shadowColor: "rgba(158,135,255, 0.3)",
                        shadowBlur: 10,
                        shadowOffsetY: 20,
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[0],
                            borderColor: colorList[0],
                        },
                    },
                    // markArea: {
                    //     itemStyle: {
                    //         color: "rgba(255, 173, 177, 0.4)",
                    //     },
                    //     data: [
                    //         [
                    //             {
                    //                 name: "Morning Peak",
                    //                 xAxis: "07:30",
                    //             },
                    //             {
                    //                 xAxis: "10:00",
                    //             },
                    //         ],
                    //         [
                    //             {
                    //                 name: "Evening Peak",
                    //                 xAxis: "17:30",
                    //             },
                    //             {
                    //                 xAxis: "21:15",
                    //             },
                    //         ],
                    //     ],
                    // },
                },
                {
                    name: "签约响应量（kW）",
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    data: [
                        30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000,
                        30000, 30000,
                    ],
                    lineStyle: {
                        width: 3,
                        shadowColor: "rgba(115,221,255, 0.3)",
                        shadowBlur: 10,
                        shadowOffsetY: 20,
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[1],
                            borderColor: colorList[1],
                        },
                    },
                },
                {
                    name: "任务量（kW）",
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    data: [0, 0, 0, 0, 3375, 3375, 3375, 3375, 3375, 0, 0, 0, 0],
                    lineStyle: {
                        width: 3,
                        shadowColor: "rgba(254,154,139, 0.3)",
                        shadowBlur: 10,
                        shadowOffsetY: 20,
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[2],
                            borderColor: colorList[2],
                        },
                    },
                },
                {
                    name: "实际响应（kW）",
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    data: [0, 0, 0, 0, 3450, 3400, 3485, 3602, 3334, 0, 0, 0, 0],
                    lineStyle: {
                        width: 3,
                        shadowColor: "rgba(254,154,139, 0.3)",
                        shadowBlur: 10,
                        shadowOffsetY: 20,
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[3],
                            borderColor: colorList[3],
                        },
                    },
                },
            ],
        });
    };

    const getTaskDashboard = async () => {
        const taskId = location?.search.split("=")[1];
        let res = await getTaskDashboardByIdServer(taskId);
        if (res?.data?.status == "SUCCESS") {
            const { responseType, taskCapacity, projectedProfit, executeResult } = res?.data?.data;
            setTaskInfo(res?.data?.data);
            taskAskData[0].value = responseType;
            taskAskData[1].value = taskCapacity;
            taskAskData[2].value = projectedProfit;
            setIsWaitTask(!executeResult);
        }
    };

    useEffect(() => {
        getTaskDashboard();
    }, []);

    useEffect(() => {
        getOptions();
    }, [theme]);

    const cardStyle = useEmotionCss(() => {
        return {
            background: token.incomeOverviewCardColor,
        };
    });

    const WaitSuggestCard = () => {
        return (
            <div className={classNames("response-suggest", cardStyle)}>
                <div className="title">
                    <Title>响应建议</Title>
                </div>
                <div className="content">
                    <div
                        className="expected contentItem"
                        style={{
                            background: token.color22,
                            boxShadow:
                                theme === "default" && "0px 2px 6px 0px rgba(176,185,210,0.4)",
                        }}
                    >
                        <Title.Description icon={"icon-zhihangqingkuang"}>
                            预计执行成功率
                        </Title.Description>
                        <div
                            className="percent value"
                            style={{
                                color: token.color12,
                                fontFamily: "DingTalkJinBuTi",
                            }}
                        >
                            {taskInfo?.projectedExecuteSuccessRate} %
                        </div>
                        {taskInfo?.projectedExecuteSuccessRate >= 60 && (
                            <div className="suggest">建议参与响应</div>
                        )}
                    </div>
                    <div
                        className="illustrate contentItem"
                        style={{
                            background: token.color22,
                            boxShadow:
                                theme === "default" && "0px 2px 6px 0px rgba(176,185,210,0.4)",
                        }}
                    >
                        <Title.Description icon={"icon-zhihangshuoming"}>
                            响应说明
                        </Title.Description>
                        <div className="value" style={{ color: token.color11 }}>
                            <div>
                                响应成功率为根据响应能力及响应历史行为得出，高于60%建议确认响应。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const resultCard = () => {
        return (
            <div className={classNames("response-suggest", cardStyle)}>
                <div className="title">
                    <Title>{isWaitTask ? "响应建议" : "执行结果"}</Title>
                </div>
                <div className="content">
                    <div
                        className="expected contentItem"
                        style={{
                            background: token.color22,
                            boxShadow:
                                theme === "default" && "0px 2px 6px 0px rgba(176,185,210,0.4)",
                        }}
                    >
                        <Title.Description icon={"icon-zhihangqingkuang"}>
                            {isWaitTask ? "预计执行成功率" : "执行说明"}
                        </Title.Description>
                        <div
                            className="percent value"
                            style={{
                                color: token.color12,
                                fontFamily: "DingTalkJinBuTi",
                            }}
                        >
                            {taskInfo?.projectedExecuteSuccessRate} %
                        </div>
                        {isWaitTask && taskInfo?.projectedExecuteSuccessRate >= 60 && (
                            <div className="suggest">建议参与响应</div>
                        )}
                    </div>
                    <div
                        className="illustrate contentItem"
                        style={{
                            background: token.color22,
                            boxShadow:
                                theme === "default" && "0px 2px 6px 0px rgba(176,185,210,0.4)",
                        }}
                    >
                        <Title.Description icon={"icon-zhihangshuoming"}>
                            执行说明
                        </Title.Description>
                        <div className="value" style={{ color: token.color11 }}>
                            <div>
                                <div>
                                    <CheckCircleOutlined className="check-icon" />
                                    响应时段最大负荷不高于基线最大负荷
                                </div>
                                <div>
                                    <CheckCircleOutlined className="check-icon" />
                                    响应差值大于等于响应能力确认值的 60%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="confirm-task">
            <div className={classNames("wait-confirm", cardStyle)}>
                <div className="title">
                    <Title>{isWaitTask ? "待处理任务" : "任务要求"}</Title>
                    <div className="company" style={{ color: token.color11 }}>
                        {taskInfo?.companyName}
                    </div>
                </div>
                <div className="content">
                    <div className="desc">
                        {taskAskData?.map(item => {
                            return (
                                <div
                                    style={{
                                        boxShadow:
                                            theme === "default" &&
                                            "0px 2px 6px 0px rgba(176,185,210,0.4)",
                                        flex: 1,
                                    }}
                                >
                                    <StaticsCard
                                        icon={item.icon}
                                        color={item.color}
                                        label={item.label}
                                        value={item.value}
                                        backgroundColor={token.color22}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="time" style={{ color: token.color27 }}>
                        <div>响应时间：{taskInfo?.responseTime}</div>
                        <div>确认截止时间：{taskInfo?.confirmationDeadline}</div>
                    </div>
                    {isWaitTask && (
                        <div className="btns">
                            <Button
                                onClick={() => {
                                    history.push(
                                        `/vpp/demandResponse/task/list?taskCode=${taskInfo?.taskCode}`
                                    );
                                }}
                            >
                                查看详情
                            </Button>
                            <Space>
                                <Button type="primary" danger onClick={()=>handleOperate()}>
                                    拒绝
                                </Button>
                                <Button type="primary">确认响应</Button>
                            </Space>
                        </div>
                    )}
                </div>
            </div>
            {isWaitTask ? WaitSuggestCard() : resultCard()}
            <div className="curve">
                <Title>用电曲线</Title>
                <div className="content" style={{ paddingTop: "30px" }}>
                    <ReactECharts option={options} style={{ width: "100%", height: "500px" }} />
                </div>
            </div>
        </div>
    );
};

export default Confirm;
