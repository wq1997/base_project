import React, { useState } from "react";
import { Select, Radio, theme } from "antd";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import "./index.less";

const Total = () => {
    const { token } = theme.useToken();
    const [type, setType] = useState("week");

    const myWorkorders = [
        { name: "接受工单总数", value: "67", color: "#1098EF" },
        { name: "执行工单总数", value: "52", color: "#ED9C0D" },
        { name: "待执行异常工单", value: "15", color: "#10EF12" },
    ];

    const options = {
        color: [token.color2, token.color11],
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
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data: ["3-14", "3-15", "3-16", "3-17", "3-18", "3-19", "3-20"],
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
                barWidth: 40,
                data: [32, 33, 30, 33, 39, 33, 32],
            },
            {
                name: "运维工单",
                type: "bar",
                stack: "Ad",
                barWidth: 40,
                data: [12, 13, 10, 13, 30, 23, 21],
            },
        ],
    };

    return (
        <div className="total">
            <div className="my">
                <div className="title">我待办的</div>
                <div className="content">
                    {myWorkorders.map(item => (
                        <div className="order">
                            <span>{item.name}</span>
                            <span className="value" style={{ color: item.color }}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="task-board">
                <div className="title">
                    <span>任务过程看板</span>
                    <Radio.Group defaultValue={type} onChange={e => setType(e.target.value)}>
                        <Radio.Button value="week">周</Radio.Button>
                        <Radio.Button value="month">月</Radio.Button>
                    </Radio.Group>
                </div>
                <div className="content">
                    <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
                </div>
            </div>
        </div>
    );
};

export default Total;
