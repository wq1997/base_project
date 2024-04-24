import React, { useState } from "react";
import { Select, Radio } from "antd";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import "./index.less";

const Total = () => {
    const [type, setType] = useState("week");

    const myWorkorders = [
        { name: "接受工单总数", value: "15", color: "#1098EF" },
        { name: "执行工单总数", value: "52", color: "#ED9C0D" },
        { name: "待执行异常工单", value: "67", color: "#10EF12" },
    ];

    const options = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        legend: {},
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
            },
        ],
        series: [
            {
                name: "实施工单",
                type: "bar",
                stack: "Ad",
                data: [32, 33, 30, 33, 39, 33, 32],
            },
            {
                name: "运维工单",
                type: "bar",
                stack: "Ad",
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
                <div className="title">负责项目统计</div>
                <div className="content"></div>
            </div>
        </div>
    );
};

export default Total;
