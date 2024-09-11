import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import * as echarts from "echarts";
import { theme as antdTheme } from "antd";
import { useSelector } from "umi";

const colorList = ["#39E0F8", "#004BFF", "#FFD821", "#F56948", "#9E87FF"];
const LoadStatisc = ({ dataSource }) => {
    const { token } = antdTheme.useToken();
    const [options, setOptions] = useState({});
    const { theme } = useSelector(state => state.global);

    const getOptions = () => {
        const x = dataSource?.map(data => data?.time);
        const data1 = dataSource?.map(data => data?.load);
        const data2 = dataSource?.map(data => data?.todayLoad);
        const data3 = dataSource?.map(data => data?.energySoc);
        const data4 = dataSource?.map(data => data?.energyLoad);
        setOptions({
            legend: {
                icon: "circle",
                top: 0,
                right: "5%",
                itemWidth: 6,
                itemGap: 20,
                textStyle: {
                    color: token.color11,
                },
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    label: {
                        show: true,
                        backgroundColor: "#fff",
                        color: "#556677",
                        borderColor: "rgba(0,0,0,0)",
                        shadowColor: "rgba(0,0,0,0)",
                        shadowOffsetY: 0,
                    },
                    lineStyle: {
                        width: 0,
                    },
                },
                backgroundColor: "#fff",
                textStyle: {
                    color: "#5c6c7c",
                },
                padding: [10, 10],
                extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
            },
            grid: {
                top: 35,
                bottom: 40,
                left: 60,
                right: 50,
            },
            xAxis: [
                {
                    type: "category",
                    data: x,
                    axisLine: {
                        lineStyle: {
                            color: "#DCE2E8",
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        // 默认x轴字体大小
                        fontSize: 12,
                        // margin:文字到x轴的距离
                        margin: 15,
                        color: token.color11,
                    },
                    axisPointer: {
                        label: {
                            padding: [0, 0, 10, 0],
                            margin: 15,
                            // 移入时的字体大小
                            fontSize: 12,
                            backgroundColor: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "#fff", // 0% 处的颜色
                                    },
                                    {
                                        // offset: 0.9,
                                        offset: 0.86,
                                        color: "#fff", // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.86,
                                        color: "#33c0cd", // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: "#33c0cd", // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                        },
                    },
                    boundaryGap: false,
                },
            ],
            yAxis: [
                {
                    name:'kW',
                    type: "value",
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#DCE2E8",
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        color: token.color11,
                    },
                },
                {name:'kW',
                    type: "value",
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#DCE2E8",
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        color: token.color11,
                    },
                },
            ],
            series: [
                {
                    name: "前一日负载(kW)",
                    type: "line",
                    data: data1,
                    symbolSize: 1,
                    symbol: "circle",
                    smooth: true,
                    yAxisIndex: 0,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        // color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        //         offset: 0,
                        //         color: '#9effff'
                        //     },
                        //     {
                        //         offset: 1,
                        //         color: '#9E87FF'
                        //     }
                        // ])
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[0],
                            borderColor: colorList[0],
                        },
                    },
                },
                {
                    name: "当日实时负载(kW)",
                    type: "line",
                    data: data2,
                    symbolSize: 1,
                    symbol: "circle",
                    smooth: true,
                    yAxisIndex: 0,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        // color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
                        //         offset: 0,
                        //         color: '#73DD39'
                        //     },
                        //     {
                        //         offset: 1,
                        //         color: '#73DDFF'
                        //     }
                        // ])
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[1],
                            borderColor: colorList[1],
                        },
                    },
                },
                {
                    name: "设备实时SOC(%)",
                    type: "line",
                    data: data3,
                    symbolSize: 1,
                    symbol: "circle",
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        //         offset: 0,
                        //         color: '#fe9a'
                        //     },
                        //     {
                        //         offset: 1,
                        //         color: '#fe9a8b'
                        //     }
                        // ])
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[2],
                            borderColor: colorList[2],
                        },
                    },
                },
                {
                    name: "储能出力(kW)",
                    type: "line",
                    data: data4,
                    symbolSize: 1,
                    symbol: "circle",
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        //         offset: 0,
                        //         color: '#fe9a'
                        //     },
                        //     {
                        //         offset: 1,
                        //         color: '#fe9a8b'
                        //     }
                        // ])
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[3],
                            borderColor: colorList[3],
                        },
                    },
                },
            ],
        });
    };

    useEffect(() => {
        getOptions();
    }, [theme, dataSource]);

    return <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />;
};

export default LoadStatisc;
