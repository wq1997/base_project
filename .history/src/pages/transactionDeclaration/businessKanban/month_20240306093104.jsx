import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Space } from "antd";
import "./index.less";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];

const Year = () => {
    const totalIncom = [
        { label: "当月累计收益(万元)", value: "920.11" },
        { label: "单月最高日收益(万元)", value: "95.12" },
        { label: "单月日均收益(万元)", value: "76.69" },
    ];

    const totalElectricity = [
        { label: "当月累计交易电量(MWH)", value: "208000" },
        { label: "当月充电电量(MWH)", value: "108000" },
        { label: "当月放电电量(MWH)", value: "100000" },
    ];

    const options1 = {
        title: {
            text: "分日收入曲线",
            textStyle: {
                fontSize: 15,
            },
        },
        legend: {
            data: ["日收入"],
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
                2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                24, 25, 26, 27, 28, 29, 30,
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
                name: "日收入",
                type: "line",
                smooth: true,
                data: [
                    7.51, 7.71, 7.03, 6.65, 6.51, 6.3, 6.81, 6.65, 5.52, 6.92, 5.65, 5.58, 6.69,
                    6.41, 5.99, 5.81, 6.6, 6.31, 6.34, 6.86, 6.82, 5.71, 5.6, 6.01, 6.51, 5.62,
                    6.61, 6.82, 6.91, 6.7,
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
            text: "分日收入曲线",
            textStyle: {
                fontSize: 15,
            },
        },
        legend: {
            data: ["日收入"],
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
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                24, 25, 26, 27, 28, 29, 30,
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
                name: "日收入",
                type: "line",
                smooth: true,
                data: [
                    7.51, 7.71, 7.03, 6.65, 6.51, 6.3, 6.81, 6.65, 5.52, 6.92, 5.65, 5.58, 6.69,
                    6.41, 5.99, 5.81, 6.6, 6.31, 6.34, 6.86, 6.82, 5.71, 5.6, 6.01, 6.51, 5.62,
                    6.61, 6.82, 6.91, 6.7,
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
