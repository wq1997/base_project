import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Space } from "antd";
import "./index.less";
import dayjs from "dayjs";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];

const Year = () => {
    const total = [
        { label: "当年累计收益(元)", value: "543132.91" },
        { label: "当年最高月收益(元)", value: "860281" },
        { label: "当年月均收益(元)", value: "817148.21" },
    ];

    const options = {
        legend: {
            data: ["预计基线负荷（kW）", "签约响应量（kW）", "任务量（kW）", "实际响应（kW）"],
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
        },
        yAxis: {
            type: "value",
            axisLabel: {
                formatter: "{value} kW",
            },
            axisPointer: {
                snap: true,
            },
            max: 45000,
        },
        series: [
            {
                name: "预计基线负荷（kW）",
                type: "line",
                smooth: true,
                data: [
                    8532, 19231, 32643, 32763, 39232, 41204, 40401.6, 38804, 35804, 32811, 35892,
                    37281, 23172,
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
    };

    return (
        <div style={{ marginTop: "10px", height: '100%' }}>
            <DatePicker
                defaultValue={dayjs("2015/01", "YYYY/MM")}
                format={"YYYY/MM"}
                picker="month"
            />
            <div className="total">
                {total?.map(item => (
                    <div>
                        <div className="label">{item.label}</div>
                        <div className="value">{item.value}</div>
                    </div>
                ))}
            </div>
            <div className="charts" style={{ paddingTop: "30px", minHeight: '300px', height: 'calc(100% - 500px)' }}>
                <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
};

export default Year;
