import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Space } from "antd";
import "./index.less";
import dayjs from "dayjs";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];

const Year = () => {
    const total = [
        { label: "当月累计收益(万元)", value: "920.11" },
        { label: "单月最高日收益(万元)", value: "95.12" },
        { label: "单月日均收益(万元)", value: "76.69" },
    ];

    const options1 = {
        title: {
            text: "分月收入曲线",
            textStyle: {
                fontSize: 15,
            },
        },
        legend: {
            data: ["月收入"],
        },
        grid: {
            top: "15%",
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
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月",
            ],
        },
        yAxis: {
            type: "value",
            axisLabel: {
                formatter: "{value} 万元",
            },
            axisPointer: {
                snap: true,
            },
        },
        series: [
            {
                name: "月收入",
                type: "line",
                smooth: true,
                data: [
                    7.5, 7.7, 7.0, 6.6, 6.5, 6.3, 6.8, 6.6, 5.5, 6.9, 5.6, 5.5, 6.6,6.4,5.9,5.8,6.6,6.3,6.3,
                    6.8,6.8,5.7,5.6,6.0,6.5,5.6,6.6,6.8,6.9
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
                        color: colorList[1],
                        borderColor: colorList[1],
                    },
                },
            },
        ],
    };

    const options2 = {
        title: {
            text: "分月充放电量曲线",
            textStyle: {
                fontSize: 15,
            },
        },
        legend: {
            data: ["月收入"],
        },
        grid: {
            top: "15%",
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
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月",
            ],
        },
        yAxis: {
            type: "value",
            axisLabel: {
                formatter: "{value} 万元",
            },
            axisPointer: {
                snap: true,
            },
        },
        series: [
            {
                name: "月收入",
                type: "line",
                smooth: true,
                data: [
                    95.12, 90.31, 86.78, 81.11, 75.31, 72.25, 73.12, 69.92, 72.28, 77.39, 61.01,
                    65.51,
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
                        color: colorList[1],
                        borderColor: colorList[1],
                    },
                },
            },
        ],
    };

    return (
        <div style={{ marginTop: "10px", height: "100%" }}>
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
            <div
                className="charts"
                style={{ paddingTop: "30px", minHeight: "300px", height: "calc(100% - 500px)" }}
            >
                <ReactECharts option={options1} style={{ width: "100%", height: "100%" }} />
            </div>
            <div
                className="charts"
                style={{ paddingTop: "30px", minHeight: "300px", height: "calc(100% - 500px)" }}
            >
                <ReactECharts option={options2} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
};

export default Year;
