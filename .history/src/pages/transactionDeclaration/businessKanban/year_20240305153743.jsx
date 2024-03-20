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
                    75.1，
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
            }
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
