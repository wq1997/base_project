import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { addColorAlpha } from "@/utils/utils";
import { theme } from "antd";

const BarStatistical = () => {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const barColor = addColorAlpha(token.colorPrimary, 1);
    const colors = ["#5470C6", "#91CC75", "#EE6666"];
    const getOptions = () => {
        setOptions({
            color: colors,
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
            },
            grid: {
                left: "7.5%",
                right: "0%",
                bottom: 10,
                containLabel: true,
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                },
            },
            legend: {
                data: ["中标容量", "实际响应", "评价指数"],
            },
            xAxis: [
                {
                    type: "category",
                    axisTick: {
                        alignWithLabel: true,
                    },
                    // prettier-ignore
                    data: ['公司A', '公司B', '公司C', '公司D', '公司E'],
                },
            ],
            yAxis: [
                {
                    type: "value",
                    name: "容量(MWh)",
                    position: "left",
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[0],
                        },
                    },
                    axisLabel: {
                        formatter: "{value}",
                    },
                },
                {
                    type: "value",
                    name: "实际响应",
                    position: "left",
                    alignTicks: true,
              
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[1],
                        },
                    },
                    axisLabel: {
                        formatter: "{value}",
                    },
                },
                {
                    type: "value",
                    name: "评价指数",
                    position: "right",
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[2],
                        },
                    },
                    axisLabel: {
                        formatter: value => value / 100,
                    },
                },
            ],
            series: [
                {
                    name: "中标容量",
                    type: "bar",
                    data: [22.0, 33, 37.0, 23.2, 25.6],
                },
                {
                    name: "实际响应",
                    type: "bar",
                    yAxisIndex: 1,
                    data: [22.0, 25.9, 29.0, 26.4, 38.7],
                },
                {
                    name: "评价指数",
                    type: "line",
                    yAxisIndex: 2,
                    data: [22.0, 22.2, 13.3, 54.5, 16.3],
                },
            ],
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return <ReactECharts option={options} style={{ height: 400 }} />;
};

export default BarStatistical;
