import React, { useState, useEffect } from "react";
import { Select, Radio, theme } from "antd";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import styles from "./index.less";
import classNames from "classnames";
import { history, useDispatch, useSelector } from "umi";
import { workbenchListTimeCompleteWorkOrderCount as workbenchListTimeCompleteWorkOrderCountServe } from "@/services";

const Total = ({ data }) => {
    const { token } = theme.useToken();
    const [type, setType] = useState("LAST_WEEK");
    const [dataSource, setDataSource] = useState([]);
    const [options, setOpitons] = useState({});
    const { user } = useSelector(state => state.user);

    const allWorkorders = [
        {
            name: "在途异常工单",
            value: data?.inTransitWorkOrderSummery?.inTransitExceptionCount || 0,
            color: token.color16,
            click: () =>
                history.push(
                    `/task-management/task-list?typeIn=${encodeURIComponent(["SYS_EXCEPTION", "MANUAL_EXCEPTION"])}`
                ),
        },
        {
            name: "在途其他工单",
            value: data?.inTransitWorkOrderSummery?.inTransitOtherCount || 0,
            color: token.color17,
            click: () =>
                history.push(
                    `/task-management/task-list?typeIn=${encodeURIComponent(["CYCLE_INSPECTION", "MANUAL_INSPECTION", "MANUAL_FB_INSPECTION", "MANUAL_OTHER", "IMPLEMENT"])}`
                ),
        },
    ];

    const myWorkorders = [
        {
            name: "发起工单数",
            value: data?.initiatedWorkOrderSummery?.initiatedCount || 0,
            color: token.color18,
            click: () =>
                history.push(
                    `/task-management/task-list?initiatorAccount=${encodeURIComponent(user?.selfUser?.account)}`
                ),
        },
        {
            name: "已执行总数",
            value: data?.initiatedWorkOrderSummery?.initiatedByMeAndCompletedCount || 0,
            color: token.color19,
            click: () =>
                history.push(
                    `/task-management/task-list?initiatorAccount=${encodeURIComponent(user?.selfUser?.account)}&statusIn=${encodeURIComponent(["COMPLETED"])}`
                ),
        },
    ];

    const todoList = [
        {
            name: "待执行工单总数",
            value: data?.todoWorkOrderSummery?.todoCount || 0,
            color: token.color20,
            click: () =>
                history.push(
                    `/task-management/my-task?statusIn=${encodeURIComponent(["WAIT_COMPLETED"])}`
                ),
        },
        {
            name: "待执行异常工单",
            value: data?.todoWorkOrderSummery?.todoExceptionCount || 0,
            color: token.color21,
            click: () =>
                history.push(
                    `/task-management/my-task?typeIn=${encodeURIComponent(["SYS_EXCEPTION", "MANUAL_EXCEPTION"])}&statusIn=${encodeURIComponent(["WAIT_COMPLETED"])}`
                ),
        },
    ];

    const getOptions = () => {
        setOpitons({
            color: ["#682AE8", "#E29611"],
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                },
            },
            legend: {
                textStyle: {
                    color: token.color1,
                },
            },
            grid: {
                top: "30px",
                left: "20px",
                right: "20px",
                bottom: "20px",
                containLabel: true,
            },
            xAxis: [
                {
                    type: "category",
                    data: dataSource?.map(item => item?.day),
                },
            ],
            yAxis: [
                {
                    type: "value",
                    splitLine: {
                        lineStyle: {
                            color: [token.color9],
                        },
                    },
                },
            ],
            series: [
                {
                    name: "实施工单",
                    type: "bar",
                    stack: "Ad",
                    data: dataSource?.map(item => item?.implementWorkOrderCount || 0),
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "#FBD576",
                                },
                                {
                                    offset: 1,
                                    color: "#EF6E39",
                                },
                            ]),
                        },
                    },
                },
                {
                    name: "运维工单",
                    type: "bar",
                    stack: "Ad",
                    data: dataSource?.map(item => item?.operationWorkOrderCount || 0),
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "#73FFF7",
                                },
                                {
                                    offset: 1,
                                    color: "#39AAEF",
                                },
                            ]),
                        },
                    },
                },
            ],
        });
    };

    const getDataSource = async () => {
        const res = await workbenchListTimeCompleteWorkOrderCountServe({ searchType: type });
        if (res?.data?.status === "SUCCESS") {
            setDataSource(res?.data?.data);
        }
    };

    useEffect(() => {
        getOptions();
    }, [JSON.stringify(dataSource || {})]);

    useEffect(() => {
        getDataSource();
    }, [type]);

    return (
        <div className={styles.total} style={{ background: token.color12 }}>
            <div className={styles.numbers}>
                <div
                    className={classNames(styles.all, styles.workorders)}
                    style={{ background: token.color12 }}
                >
                    <div className={styles.title}>全部在途工单</div>
                    <div className={styles.content}>
                        {allWorkorders.map(item => (
                            <div className={styles.order} style={{ background: token.color13 }}>
                                <span className={styles.name}>{item.name}</span>
                                <a
                                    className={styles.value}
                                    style={{ color: item.color }}
                                    onClick={item.click}
                                >
                                    {item.value}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className={classNames(styles.my, styles.workorders)}
                    style={{ background: token.color12 }}
                >
                    <div className={styles.title}>我的发起</div>
                    <div className={styles.content}>
                        {myWorkorders.map(item => (
                            <div className={styles.order} style={{ background: token.color13 }}>
                                <span className={styles.name}> {item.name}</span>
                                <a
                                    className={styles.value}
                                    style={{ color: item.color }}
                                    onClick={item.click}
                                >
                                    {item.value}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className={classNames(styles.todoList, styles.workorders)}
                    style={{ background: token.color12 }}
                >
                    <div className={styles.title}>我的待办</div>
                    <div className={styles.content}>
                        {todoList.map(item => (
                            <div className={styles.order} style={{ background: token.color13 }}>
                                <span className={styles.name}>{item.name}</span>
                                <a
                                    className={styles.value}
                                    style={{ color: item.color }}
                                    onClick={item.click}
                                >
                                    {item.value}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.taskBoard} style={{ background: token.color12 }}>
                <div className={styles.title}>
                    <span style={{ marginRight: 10 }}>任务过程看板</span>
                    <Radio.Group defaultValue={type} onChange={e => setType(e.target.value)}>
                        <Radio.Button value="LAST_WEEK">周</Radio.Button>
                        <Radio.Button value="LAST_MONTH">月</Radio.Button>
                    </Radio.Group>
                </div>
                <ReactECharts option={options} style={{ width: "100%", flex: 1 }} />
            </div>
        </div>
    );
};

export default Total;
