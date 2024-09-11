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
import TaskDetail from "./TaskDetail";

const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "rgb(56, 91, 243)", "#9E87FF"];
const Confirm = () => {
    const { search, pathname } = useLocation();
    const { token } = antdTheme.useToken();
    const { theme } = useSelector(state => state.global);
    const [options, setOptions] = useState({});

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
        {
            label: "实际下发量(kWh)",
            value: "",
            color: token.color7,
            icon: "icon-yujishouyi",
        },
    ]);

    const [curTask, setCurTask] = useState();

    const getOptions = () => {
        if (!curTask) return;
        const { resourcePlan, dayaheadResourcePlan } = curTask;
        const xData = [];
        const baseYData = [];
        const planYData = [];
        const realYData = [];
        resourcePlan?.details?.forEach((item, index) => {
            xData.push(item.timeRange);
            baseYData.push(item.basePower);
            planYData.push(item.targetPower);
            realYData.push(dayaheadResourcePlan?.details?.[index].targetPower);
        });
        setOptions({
            legend: {
                data: ["基线功率", "申报执行功率", "实际执行功率"],
                textStyle: {
                    color: token.color11,
                },
            },
            grid: {
                top: "10%",
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
            },
            toolbox: {
                show: false,
            },
            xAxis: {
                type: "category",
                data: xData,
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value} kW",
                },
                axisPointer: {
                    snap: true,
                },
            },
            series: [
                {
                    name: "基线功率",
                    type: "line",
                    smooth: false,
                    data: baseYData,
                    symbol: "none",
                    lineStyle: {
                        width: 3,
                    },
                },
                {
                    name: "申报执行功率",
                    type: "line",
                    smooth: false,
                    data: planYData,
                    symbol: "none",
                    lineStyle: {
                        width: 3,
                    },
                },
                {
                    name: "实际执行功率",
                    type: "line",
                    smooth: false,
                    data: realYData,
                    symbol: "none",
                    lineStyle: {
                        width: 3,
                    },
                },
            ],
        });
    };

    const getTaskDetail = async taskId => {
        if (taskId) {
            let res = await getTaskDetailServer({id:taskId});
            if (res?.data?.status == "SUCCESS") {
                const data = res?.data?.data;
                setCurTask(data);
            }
        }
    };

    useEffect(() => {
        getOptions();
        const _taskAskData = [...taskAskData];
        _taskAskData[0].value = curTask?.invitation?.responseTypeZh;
        _taskAskData[1].value = curTask?.resourcePlan?.capacityKWh;
        _taskAskData[2].value = curTask?.dayaheadResourcePlan?.capacityKWh;
        setTaskAskData(_taskAskData);
    }, [curTask]);

    useEffect(() => {
        getTaskDetail(getUrlParams(search)?.taskId);
    }, []);

    useEffect(() => {
        getOptions();
    }, [theme]);

    const cardStyle = useEmotionCss(() => {
        return {
            background: token.incomeOverviewCardColor,
        };
    });

    return (
        <div style={{ width: "100%", height: "100%" }}>
            {curTask ? (
                <div className="confirm-task">
                    <div className={classNames("wait-confirm", cardStyle)}>
                        <div className="title">
                            <Title>任务要求</Title>
                            <div className="company" style={{ color: token.color11 }}>
                                <span style={{ color: "gray", marginRight: "5px" }}>
                                    {curTask?.resourcePlan?.resourceId}
                                </span>
                                {curTask?.resourcePlan?.resourceName}
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
                                    {curTask?.invitation?.endTime}
                                </div>
                                <div>确认截止时间：{curTask?.invitation?.replyTime}</div>
                            </div>
                        </div>
                    </div>
                    <div className={classNames("response-suggest", cardStyle)}>
                        <div className="title">
                            <Title>任务状态</Title>
                        </div>
                        <div className="content">
                            <div
                                className="expected contentItem"
                                style={{
                                    background: token.color22,
                                    boxShadow:
                                        theme === "default" &&
                                        "0px 2px 6px 0px rgba(176,185,210,0.4)",
                                }}
                            >
                                <Title.Description icon={"icon-zhihangqingkuang"}>
                                    确认状态
                                </Title.Description>
                                <div
                                    className="statusZh value"
                                    style={{
                                        color: token.color12,
                                        fontFamily: "DingTalkJinBuTi",
                                    }}
                                >
                                    {curTask?.resourcePlan?.statusZh}
                                </div>
                            </div>
                            <div
                                className="illustrate contentItem"
                                style={{
                                    background: token.color22,
                                    boxShadow:
                                        theme === "default" &&
                                        "0px 2px 6px 0px rgba(176,185,210,0.4)",
                                }}
                            >
                                <Title.Description icon={"icon-zhihangshuoming"}>
                                    任务收益
                                </Title.Description>
                                <div
                                    className="value"
                                    style={{ color: token.color11, fontSize: 15 }}
                                >
                                    请登录深圳虚拟电厂管理平台查询本次任务收益情况
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="curve">
                        <Title>用电曲线</Title>
                        <div className="content" style={{ paddingTop: "30px" }}>
                            <ReactECharts
                                option={options}
                                style={{ width: "100%", height: "500px" }}
                            />
                        </div>
                    </div>
                    <div className="table-details">
                        <Title>响应任务详情</Title>
                        <div className="content" style={{ paddingTop: "30px" }}>
                            <TaskDetail data={curTask} />
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
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"暂无待查询任务"} />
                </div>
            )}
        </div>
    );
};

export default Confirm;
