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
    const [taskList, setTaskList] = useState();
    const [curTask, setCurTask] = useState();
    const [curTaskIndex, setCurTaskIndex] = useState(0);

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

    const getTaskDashboard = async taskId => {
        if (taskId) {
            let res = await getTaskDetailServer(taskId);
            if (res?.data?.status == "SUCCESS") {
                const data = res?.data?.data;
                setCurTaskIndex(0);
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
        getTaskDashboard(getUrlParams(search)?.taskId);
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
