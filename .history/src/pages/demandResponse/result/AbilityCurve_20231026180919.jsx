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
                left: "3%",
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
                    data: [
                        "江苏海四达动力科技有限公司",
                        "连云港华乐不锈钢有限公司",
                        "苏州京浜光电科技有限公司",
                        "江苏海四达新能源有限公司",
                    ],
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
                        formatter: value => value.toFixed(2),
                    },
                },
            ],
            series: [
                {
                    name: "中标容量",
                    type: "bar",
                    barWidth: 30,
                    data: [22.55, 33.12, 37.1, 26.74],
                },
                {
                    name: "实际响应",
                    type: "bar",
                    barWidth: 30,
                    data: [22.1, 25.19, 29.9, 23.28],
                },
                {
                    name: "评价指数",
                    type: "line",
                    yAxisIndex: 1,
                    data: [0.98, 0.76, 0.8, 0.87],
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
