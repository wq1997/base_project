import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import { getGccWeeklyProfitServe } from "@/services/bigScreen"
import * as echarts from "echarts";

const IncomeStatistics = () => {
    const [options, setOptions] = useState({});
    const getOptions = async () => {
        const res = await getGccWeeklyProfitServe();
        let xAxisData = [];
        let data1 = [];
        let data2 = [];
        if(res?.data?.data){
            const data = res?.data?.data;
            xAxisData = data?.map(item => item?.date);
            data1 = data?.map(item => item?.energyProfit);
            data2 = data?.map(item => item?.pvProfit);
        }
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