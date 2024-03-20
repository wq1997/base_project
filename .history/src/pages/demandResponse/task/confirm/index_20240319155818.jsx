import { Button, Space, message, theme as antdTheme, Modal } from "antd";
import { getWaitConfirmTasks as getWaitConfirmTasksServer } from "@/services/task";
import "./index.less";
import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
} from "@ant-design/icons";
import { Title, StaticsCard } from "@/components";
import classNames from "classnames";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useSelector } from "umi";
import {
    getTaskDashboardById as getTaskDashboardByIdServer,
    confirmTask as confirmTaskServer,
    refuseTask as refuseTaskServer,
    getWaitTaskDashboard as getWaitTaskDashboardServer,
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
    const [times, setTimes] = useState([]);
    const [baseLinePower, setBaseLinePower] = useState([]);
    const [responsePower, setResponsePower] = useState([]);
    const [targetPower, setTargetPower] = useState([]);
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
    const [taskList, setTaskList] = useState();
    const [curTask, setCurTask] = useState();
    const [curTaskIndex, setCurTaskIndex] = useState(0);

    const getOptions = () => {
        setOptions({
            legend: {
                data: ["预计基线负荷", "签约响应量", "任务量"],
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
                data: times,
                axisLabel: {
                    color: token.color11,
                },
            },
            yAxis: {
                type: "value",
                name: "kW",
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
                    name: "预计基线负荷",
                    type: "line",
                    smooth: true,
                    data: baseLinePower,
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
                },
                {
                    name: "签约响应量",
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    data: responsePower,
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
                    name: "任务量",
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    data: targetPower,
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
            ],
        });
    };

    const getTaskDashboard = async () => {
        const taskId = location?.search.split("=")[1];
        let res = await getWaitTaskDashboardServer();
        const list = res?.data?.data;
        if (res?.data?.status == "SUCCESS") {
            setTaskList(list);
            const cur = taskId ? list?.find(item => (item.taskId = taskId)) : list?.[0];
            setTaskInfo(cur);
            setCurTask(cur);
            const {
                responseType,
                taskCapacity,
                projectedProfit,
                executeResult,
                projectedPowerData,
            } = cur;
            taskAskData[0].value = responseType;
            taskAskData[1].value = taskCapacity;
            taskAskData[2].value = projectedProfit;
            setIsWaitTask(!executeResult);
            setTimes(projectedPowerData?.map(item => item?._1));
            setBaseLinePower(projectedPowerData?.map(item => item?._2?.baseLinePower));
            setResponsePower(projectedPowerData?.map(item => item?._2?.responsePower));
            setTargetPower(projectedPowerData?.map(item => item?._2?.targetPower));
        }
    };

    const changeCurTask = num => {
        if (curTaskIndex == 0 || curTaskIndex == taskList?.length - 1) return;
        setCurTaskIndex(curTask + num);
    };

    useEffect(() => {
        getTaskDashboard();
    }, []);

    useEffect(() => {
        getOptions();
    }, [theme, times]);

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
                            {taskInfo?.executeResult?.success ? "成功" : "失败"}
                        </div>
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
                                {taskInfo?.executeResult?.resultDetail?.map(item => (
                                    <div>
                                        {item?._1 ? (
                                            <CheckCircleOutlined className="check-icon" />
                                        ) : (
                                            <CloseCircleOutlined
                                                style={{ color: "#ff7875", marginRight: "8px" }}
                                            />
                                        )}
                                        {item?._2}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const handleRefuse = () => {
        Modal.confirm({
            title: "系统提示",
            content: "确定拒绝该任务？",
            onOk: async () => {
                let res = await refuseTaskServer([taskInfo?.taskId]);
                if (res?.data?.status == "SUCCESS") {
                    message.success(`拒绝成功`);
                    history.push(`/vpp/demandResponse/task/confirm`);
                }
            },
        });
    };

    const handleConfirm = () => {
        Modal.confirm({
            title: "系统提示",
            content: "确定接受该任务？",
            onOk: async () => {
                let res = await confirmTaskServer([taskInfo?.taskId]);
                if (res?.data?.status == "SUCCESS") {
                    message.success(`确认成功`);
                    history.push(`/vpp/demandResponse/task/confirm`);
                }
            },
        });
    };

    return (
        <div className="confirm-task">
            <div className={classNames("wait-confirm", cardStyle)}>
                <div className="title">
                    <Title>
                        {isWaitTask ? (
                            <div>
                                待处理任务({taskList?.length})
                                <>
                                    <CaretLeftOutlined
                                        style={{ cursor: "pointer" }}
                                        onClick={() => changeCurTask(-1)}
                                    />
                                    <CaretRightOutlined
                                        style={{ cursor: "pointer" }}
                                        onClick={() => changeCurTask(1)}
                                    />
                                </>
                            </div>
                        ) : (
                            "任务要求"
                        )}
                    </Title>
                    <div className="company" style={{ color: token.color11 }}>
                        {taskInfo?.companyName} {curTask?.taskId}
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
                                <Button type="primary" danger onClick={handleRefuse}>
                                    拒绝
                                </Button>
                                <Button type="primary" onClick={handleConfirm}>
                                    确认响应
                                </Button>
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
