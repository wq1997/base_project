import ReactECharts from "echarts-for-react";
import { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { MyTab, MyButtonGroup } from "@/components";

const ElectricityRanking = ({ area,value }) => {
    const {
        dischargeCapacityTop5,
        dischargeCapacityBottom5,
        dischargeEfficiencyTop5,
        dischargeEfficiencyBottom5,
    } = value;
    const ref = useRef();
    const [options, setOptions] = useState({});
    const [currentOrder, setCurrentOrder] = useState("1");
    const [currentType, setCurrentType] = useState("1");

    const getOptions = (currentOrder, currentType) => {
        const typeData = {
            1: {
                1: dischargeCapacityTop5,
                2: dischargeCapacityBottom5,
            },
            2: {
                1: dischargeEfficiencyTop5,
                2: dischargeEfficiencyBottom5,
            },
        };
        const data = typeData[currentType][currentOrder];
        const xData = data?.map(item => item._1) || [];
        setOptions({
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            grid: {
                top: 65,
                left: 30,
                right: 0,
                bottom: 30,
            },
            xAxis: {
                data: xData,
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: "#fff",
                        fontSize: 10,
                    },
                    margin: 20, //刻度标签与轴线之间的距离。
                    formatter: function (value) {
                        if (value.length > 5) {
                            return value.substring(0, 3) + "...";
                        }
                        return value;
                    },
                },
            },
            yAxis: {
                name: currentType == "1" ? "GWh" : "%",
                nameTextStyle: {
                    color: "#fff",
                    fontSize: 10,
                    padding: [0, 25, 0, 0],
                },

                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#00516F",
                        type: "dashed",
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: 10,
                    },
                },
            },
            series:
                currentType == "1"
                    ? [
                        {
                            name: "充电量",
                            type: "bar",
                            barWidth: "30%",
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "#23eefb",
                                        },
                                        {
                                            offset: 1,
                                            color: "#00fff1",
                                        },
                                    ]),
                                    barBorderRadius: 6,
                                },
                            },
                            data: data?.map(item => parseFloat(item._2 / 1000000).toFixed(3)),
                        },
                        {
                            name: "放电量",
                            type: "bar",
                            barWidth: "30%",
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "#00e0ff",
                                        },
                                        {
                                            offset: 1,
                                            color: "#007ac6",
                                        },
                                    ]),
                                    barBorderRadius: 6,
                                },
                            },
                            data: data?.map(item => parseFloat(item._3 / 1000000).toFixed(3)),
                        },
                    ]
                    : [
                        {
                            name: "效率",
                            type: "bar",
                            barWidth: "30%",
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "#00e0ff",
                                        },
                                        {
                                            offset: 1,
                                            color: "#007ac6",
                                        },
                                    ]),
                                    barBorderRadius: 6,
                                },
                            },
                            data: data?.map(item => item._2 * 100),
                        },
                    ],
        });
    };

    useEffect(() => {
        getOptions(currentOrder, currentType);
    }, [value, currentOrder, currentType]);

    useEffect(() => {
        return;
        const myChart = ref?.current?.getEchartsInstance();
        var app = {
            currentIndex: -1,
        };
        if (window.electricityInterval) window.clearInterval(window.electricityInterval);
        window.electricityInterval = setInterval(function () {
            var dataLen = options.series[0].data.length;
            // 取消之前高亮的图形
            myChart.dispatchAction({
                type: "downplay",
                seriesIndex: 1,
                dataIndex: app.currentIndex,
            });
            app.currentIndex = (app.currentIndex + 1) % dataLen;
            // 高亮当前图形
            myChart.dispatchAction({
                type: "highlight",
                seriesIndex: 1,
                dataIndex: app.currentIndex,
            });
            // 显示 tooltip
            myChart.dispatchAction({
                type: "showTip",
                seriesIndex: 1,
                dataIndex: app.currentIndex,
            });
        }, 2000);
    }, [options]);

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "end",
                    position: "absolute",
                    left: 0,
                    top: 5,
                    zIndex: 100,
                }}
            >
                <MyButtonGroup
                    btnStyle={{
                        fontSize: "10px",
                        borderRadius: "3px",
                        padding: "4px 10px",
                    }}
                    value={currentType}
                    options={[
                        { value: "1", label: "电量" },
                        { value: "2", label: "效率" },
                    ]}
                    onChange={value => setCurrentType(value)}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "end",
                    position: "absolute",
                    right: 0,
                    top: 5,
                    zIndex: 100,
                }}
            >
                <MyTab
                    btnStyle={{
                        fontSize: "10px",
                        borderRadius: "3px",
                        padding: "4px 10px",
                    }}
                    value={currentOrder}
                    options={[
                        { value: "1", label: "正序" },
                        { value: "2", label: "倒序" },
                    ]}
                    onChange={value => setCurrentOrder(value)}
                />
            </div>
            <ReactECharts
                ref={ref}
                option={options}
                style={{ height: "calc(100% - 5px)" }}
                notMerge
            />
        </div>
    );
};

export default ElectricityRanking;
