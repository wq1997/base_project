import React, { useState, useEffect } from "react";
import { Select, Radio, theme } from "antd";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import styles from "./index.less";
import { workbenchListTimeCompleteWorkOrderCount as workbenchListTimeCompleteWorkOrderCountServe } from "@/services";

const Total = ({ data }) => {
    const { token } = theme.useToken();
    const [type, setType] = useState("LAST_WEEK");
    const [dataSource, setDataSource] = useState([]);
    const [options, setOpitons] = useState({});

    const myWorkorders = [
        { name: "工单总数", value: data?.todoWorkOrderSummery?.receiveCount, color: token.color22 },
        { name: "已执行工单", value: data?.todoWorkOrderSummery?.doCount, color: token.color23 },
        { name: "待执行工单", value: data?.todoWorkOrderSummery?.todoCount, color: token.color24 },
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
        <div className="total" style={{ background: token.color12 }}>
            <div className={styles.numbers}>
                <div className={styles.my}>
                    <div className={styles.title}>我的待办</div>
                    <div className={styles.content}>
                        {myWorkorders.map(item => (
                            <div className="order" style={{ background: token.color13 }}>
                                <span>{item.name}</span>
                                <span className="value" style={{ color: item.color }}>
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.taskBoard}>
                <div className={styles.title}>
                    <span>任务过程看板</span>
                    <Radio.Group defaultValue={type} onChange={e => setType(e.target.value)}>
                        <Radio.Button value="LAST_WEEK">周</Radio.Button>
                        <Radio.Button value="LAST_MONTH">月</Radio.Button>
                    </Radio.Group>
                </div>
                <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
};

export default Total;
