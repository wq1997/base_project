import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";

const IncomeStatistics = () => {
    const [options, setOptions] = useState({});
    const getOptions = () => {
        const xAxisData = ['11/11','11/12','11/13','11/14','11/15','11/16','11/17'];
        const data1 = [200,300,500,300,200,400,300];
        const data2 = [400,300,400,300,100,500,400];
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
                data: ['储能收益', '光伏收益'],
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
                            color: 'rgba(150, 164, 244, 0.3)'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '储能收益',
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
                    name: '光伏收益',
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
                }
            ]
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return <ReactECharts option={options} style={{height: '100%'}} />;
}

export default IncomeStatistics;