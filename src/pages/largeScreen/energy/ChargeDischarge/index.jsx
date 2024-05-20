import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import { getEnergyWeeklyChargeDisChargeServe } from "@/services/bigScreen";
import * as echarts from "echarts";

const ChargeDischarge = ({plantId}) => {
    const [options, setOptions] = useState({});
    const getOptions = async () => {
        const res = await getEnergyWeeklyChargeDisChargeServe({plantId});
        let xAxisData = [];
        let data1 = [];
        let data2 = [];
        let data3 = [];
        if(res?.data?.data){
            const data = res?.data?.data;
            xAxisData = data.map(item => `${item?.date?.year}/${item?.date?.monthValue}/${item?.date?.dayOfMonth}`);
            data1 = data.map(item => item.dayChargeEnergy);
            data2 = data.map(item => item.dayDischargeEnergy);
            data3 = data.map(item => item.efficiency);
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
                            color: 'rgba(150, 164, 244, 0.3)'
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
                            color: 'rgba(150, 164, 244, 0.3)'
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
    }, [plantId]);

    return <ReactECharts option={options} style={{height: '100%'}} />;
}

export default ChargeDischarge;