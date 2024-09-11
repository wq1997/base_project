import { Button, Space, message, theme as antdTheme, Modal, Empty } from "antd";
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
    getTaskDetail as getTaskDetailServer,
    singleConfirmTask as singleConfirmTaskServer,
    singleRefuseTask as singleRefuseTaskServer,
    getWaitTaskList as getWaitTaskListServer,
    getTaskist as getTaskistServer,
} from "@/services/task";
import { history, useLocation } from "umi";
import { getUrlParams } from "@/utils/utils";

const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "rgb(56, 91, 243)", "#9E87FF"];
const Confirm = () => {
    const { search, pathname } = useLocation();
    const { token } = antdTheme.useToken();
    const { theme } = useSelector(state => state.global);
    const [isWaitTask, setIsWaitTask] = useState();
    const [options, setOptions] = useState({});
    const [times, setTimes] = useState([]);
    const [actualPower, setActualPower] = useState([]);
    const [baseLinePower, setBaseLinePower] = useState([]);
    const [companyMaxPower, setCompanyMaxPower] = useState([]);
    const [responsePower, setResponsePower] = useState([]);
    const [actualAveragePower, setActualAveragePower] = useState([]);

    const [taskAskData, setTaskAskData] = useState([
        {
            label: "响应类型",
            value: "",
            color: token.color15,
            icon: "icon-xiangyingleixing",
        },
        {
            label: "申报量(kWh)",
            value: "",
            color: token.color4,
            icon: "icon-renwugongshuai",
        },
    ]);
    const [taskList, setTaskList] = useState();
    const [curTask, setCurTask] = useState();
    const [curTaskIndex, setCurTaskIndex] = useState(0);

    const getOptions = () => {
        const isSearch = pathname?.endsWith("search");
        const legendData = isSearch
            ? ["响应时段负荷", "负荷基线", "任务要求", "实际响应"]
            : ["预计基线负荷", "签约响应量", "任务量"];
        setOptions({
            legend: {
                data: legendData,
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
                    name: legendData[0],
                    type: "line",
                    smooth: true,
                    data: isSearch ? actualPower : baseLinePower,
                    symbol: "none",
                    lineStyle: {
                        width: 2,
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[0],
                            borderColor: colorList[0],
                        },
                    },
                },
                {
                    name: legendData[1],
                    type: "line",
                    smooth: false,
                    symbol: "none",
                    data: isSearch ? baseLinePower : companyMaxPower,
                    lineStyle: {
                        width: 2,
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[1],
                            borderColor: colorList[1],
                        },
                    },
                },
                {
                    name: legendData[2],
                    type: "line",
                    smooth: false,
                    symbol: "none",
                    data: responsePower,
                    lineStyle: {
                        width: 3,
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[2],
                            borderColor: colorList[2],
                        },
                    },
                },
                isSearch && {
                    name: legendData[3],
                    type: "line",
                    smooth: false,
                    symbol: "none",
                    data: actualAveragePower,
                    lineStyle: {
                        width: 3,
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

    const init = () => {
        console.log("curTask", curTask);
        setIsWaitTask(!curTask?.executeResult);
        const _taskAskData = [...taskAskData];
        _taskAskData[0].value = curTask?.invitation?.responseTypeZh;
        _taskAskData[1].value = curTask?.resourcePlan?.capacityKWh;
        setTaskAskData(_taskAskData);
        setIsWaitTask(!curTask?.executeResult);
        setTimes(curTask?.projectedPowerData?.map(item => item?._1));
        setActualPower(curTask?.projectedPowerData?.map(item => item?._2?.actualPower));
        setBaseLinePower(curTask?.projectedPowerData?.map(item => item?._2?.baseLinePower));
        setCompanyMaxPower(curTask?.projectedPowerData?.map(item => item?._2?.companyMaxPower));
        setResponsePower(curTask?.projectedPowerData?.map(item => item?._2?.responsePower));
        setActualAveragePower(
            curTask?.projectedPowerData?.map(item => item?._2?.actualAveragePower)
        );
    };

    const getTaskDashboard = async () => {
        const params = getUrlParams(search);
        const _isWaitTask = !pathname?.endsWith("search");
        setIsWaitTask(_isWaitTask);
        let res;
        console.log(_isWaitTask);
        if (_isWaitTask) {
            res = await getWaitTaskListServer();
        } else {
            let defaultTaskId = "";
            const searchRes = await getTaskistServer({
                pageNum: 1,
                pageSize: 1,
                queryCmd: {
                    status: "EXECUTED_SUCCESS",
                },
            });
            if (searchRes?.data?.data?.recordList?.length > 0) {
                defaultTaskId = searchRes?.data?.data?.recordList?.[0]?.id;
            }
            let url = "";
            if (params?.taskId || defaultTaskId) {
                url = `id=${params?.taskId || defaultTaskId}`;
            }
            if (params?.code) {
                url = `code=${params?.code}`;
            }
            res = await getTaskDetailServer(url);
        }
        const list = _isWaitTask ? res?.data?.data : [res?.data?.data];
        if (res?.data?.status == "SUCCESS") {
            setTaskList(list);
            const index = params?.taskId
                ? list?.findIndex(item => item.taskId == params?.taskId)
                : 0;
            setCurTaskIndex(index);
            setCurTask(list[index]);
        }
    };

    const changeCurTask = num => {
        const newIndex = curTaskIndex + num;
        if (newIndex < 0 || newIndex == taskList?.length) return;
        setCurTaskIndex(newIndex);
        setCurTask(taskList[newIndex]);
    };

    useEffect(() => init(), [curTask]);

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
                            {curTask ? `95 %` : ""}
                        </div>
                        {curTask?.projectedExecuteSuccessRate >= 60 && (
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
                        <div className="value" style={{ color: token.color11, fontSize: 16 }}>
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
                            {curTask ? (curTask?.executeResult?.success ? "成功" : "失败") : ""}
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
                                {curTask?.executeResult?.resultDetail?.map(item => (
                                    <div>
                                        {item?._1 ? (
                                            <CheckCircleOutlined className="check-icon" />
                                        ) : (
                                            <CloseCircleOutlined
                                                className="check-icon"
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
                let res = await singleRefuseTaskServer([curTask?.taskId]);
                if (res?.data?.status == "SUCCESS") {
                    message.success(`拒绝成功`);
                    history.push(`/vpp/demandResponse/task/confirm`);
                    getTaskDashboard();
                }
            },
        });
    };

    const handleConfirm = () => {
        Modal.confirm({
            title: "系统提示",
            content: "确定接受该任务？",
            onOk: async () => {
                let res = await singleConfirmTaskServer([curTask?.taskId]);
                if (res?.data?.status == "SUCCESS") {
                    message.success(`确认成功`);
                    history.push(`/vpp/demandResponse/task/confirm`);
                    getTaskDashboard();
                }
            },
        });
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
            {taskList?.length > 0 ? (
                <div className="confirm-task">
                    <div className={classNames("wait-confirm", cardStyle)}>
                        <div className="title">
                            <Title>
                                {isWaitTask ? (
                                    <div>
                                        待处理任务
                                        {taskList?.length > 1 && (
                                            <>
                                                ({taskList?.length})
                                                <CaretLeftOutlined
                                                    style={{
                                                        cursor:
                                                            curTaskIndex == 0
                                                                ? "not-allowed"
                                                                : "pointer",
                                                    }}
                                                    onClick={() => changeCurTask(-1)}
                                                />
                                                <CaretRightOutlined
                                                    style={{
                                                        cursor:
                                                            curTaskIndex == taskList?.length - 1
                                                                ? "not-allowed"
                                                                : "pointer",
                                                    }}
                                                    onClick={() => changeCurTask(1)}
                                                />
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    "任务要求"
                                )}
                            </Title>
                            <div className="company" style={{ color: token.color11 }}>
                                <span style={{ color: "gray", marginRight: "5px" }}>
                                    {curTask?.taskCode}
                                </span>
                                {curTask?.companyName}
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
                                <div>
                                    响应时间：{curTask?.invitation?.startTime} ~{" "}
                                    {curTask?.invitation?.startTime}
                                </div>
                                <div>确认截止时间：{curTask?.invitation?.replyTime}</div>
                            </div>
                            {isWaitTask && curTask && (
                                <div className="btns">
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
                            <ReactECharts
                                option={options}
                                style={{ width: "100%", height: "500px" }}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        width: "100%",
                        height: "500px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={isWaitTask ? "暂无待确认任务" : "暂无待查询任务"}
                    />
                </div>
            )}
        </div>
    );
};

export default Confirm;
