import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";

const ChargeDischarge = () => {
    const [options, setOptions] = useState({});
    const getOptions = () => {
        const xAxisData = ['11/11','11/12','11/13','11/14','11/15','11/16','11/17'];
        const data1 = [200,300,500,300,200,400,300];
        const data2 = [400,300,400,300,100,500,400];
        const data3 = [80,90,70,80,90,70,90];
        setOptions({
            color: ['#03B4B4'],
            tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                }
            },
            grid: {
                top: 40,
                bottom: 20
            },
            legend: {
                data: ['充电桩充电量', '光伏发电量', '充放电效率'],
                textStyle: {
                    color: 'white'
                },
                right: 0
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#979797'
                        }
                    }
                },
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}%'
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#979797'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '充电桩充电量',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value) {
                            return value;
                        }
                    },
                    data: data1,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: "#04F0F2"
                            },
                            {
                                offset: 1,
                                color: "#1D9FF4"
                            }
                        ], false)
                    },
                },
                {
                    name: '光伏发电量',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value) {
                            return value;
                        }
                    },
                    data: data2,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: "#E5AF58"
                            },
                            {
                                offset: 1,
                                color: "#EE8962"
                            }
                        ], false)
                    },
                },
                {
                    name: '充放电效率',
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + ' %';
                        }
                    },
                    data: data3
                }
            ]
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return <ReactECharts option={options} style={{height: '100%'}} />;
}

export default ChargeDischarge;