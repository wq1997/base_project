import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Space } from "antd";
import "./index.less";
import dayjs from "dayjs";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];

const Year = () => {
    const totalIncom = [
        { label: "当年累计收益(万元)", value: "920.11" },
        { label: "当年最高月收益(万元)", value: "95.12" },
        { label: "当年月均收益(万元)", value: "76.69" },
    ];

    const totalElectricity = [
        { label: "当年累计交易电量(MWH)", value: "208000" },
        { label: "当年充电电量(MWH)", value: "108000" },
        { label: "当年放电电量(MWH)", value: "100000" },
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

    const options2 = {
        title: {
            text: "分月充放电量曲线",
            textStyle: {
                fontSize: 15,
            },
        },
        legend: {
            data: ["充电量", "放电量"],
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
                formatter: "{value} MWH",
            },
            axisPointer: {
                snap: true,
            },
        },
        series: [
            {
                name: "充电量",
                type: "bar",

                data: [8673, 8900, 8190, 9000, 8886, 7991, 8956, 8735, 8979, 9000, 8777, 9000],

                barStyle: {
                    width: 3,
                    normal: {
                        color: colorList[1],
                        borderColor: colorList[1],
                    },
                },
            },
            {
                name: "放电量",
                type: "bar",

                data: [-8938,-89],

                barStyle: {
                    width: 3,
                    normal: {
                        color: colorList[2],
                        borderColor: colorList[2],
                    },
                },
            },
        ],
    };

    return (
        <div style={{ marginTop: "10px", height: "100%" }}>
            <div className="total">
                {totalIncom?.map(item => (
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
            <div className="total">
                {totalElectricity?.map(item => (
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
                <ReactECharts option={options2} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
};

export default Year;
