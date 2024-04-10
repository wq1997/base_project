import React, { useState } from "react";
import { Select, Radio, theme } from "antd";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import "./index.less";

const Total = () => {
    const { token } = theme.useToken();
    const [type, setType] = useState("week");

    const myWorkorders = [
        { name: "工单总数", value: "285", color: "#1098EF" },
        { name: "已执行工单", value: "253", color: "#ED9C0D" },
        { name: "待执行工单", value: "2", color: "#10EF12" },
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
                data:
                    type == "week"
                        ? ["04-02", "04-03", "04-04", "04-05", "04-06", "04-07", "04-08", "04-09"]
                        : ["1月", "2月", "3月", "4月"],
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
                name: "进行中",
                type: "bar",
                stack: "Ad",
                barWidth: 40,
                data: type == "week" ? [1, 1, 0, 1, 0, 0, 0, 1] : [0, 0, 2, 0],
            },
            {
                name: "已完成",
                type: "bar",
                stack: "Ad",
                barWidth: 40,
                data: type == "week" ? [0,1] : [15, 16, 12, 21],
            },
        ],
    };

    return (
        <div className="total">
            <div className="my">
                <div className="title">我的待办</div>
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
