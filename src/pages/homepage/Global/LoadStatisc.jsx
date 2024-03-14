import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import * as echarts from "echarts";
import { theme as antdTheme } from "antd";
import { useSelector } from "umi";

const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF'];
const LoadStatisc = () => {
    const { token } = antdTheme.useToken();
    const [options, setOptions] = useState({});
    const { theme } = useSelector(state => state.global);

    const getOptions = () => {
        setOptions({
            legend: {
                icon: 'circle',
                top: '5%',
                right: '5%',
                itemWidth: 6,
                itemGap: 20,
                textStyle: {
                    color: token.color11
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    label: {
                        show: true,
                        backgroundColor: '#fff',
                        color: '#556677',
                        borderColor: 'rgba(0,0,0,0)',
                        shadowColor: 'rgba(0,0,0,0)',
                        shadowOffsetY: 0
                    },
                    lineStyle: {
                        width: 0
                    }
                },
                backgroundColor: '#fff',
                textStyle: {
                    color: '#5c6c7c'
                },
                padding: [10, 10],
                extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
            },
            grid: {
                top: 10,
                bottom: 40,
                left: 60,
                right: 50
            },
            xAxis: [{
                type: 'category',
                data: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                axisLine: {
                    lineStyle: {
                        color: '#DCE2E8'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    // 默认x轴字体大小
                    fontSize: 12,
                    // margin:文字到x轴的距离
                    margin: 15,
                    color: token.color11
                },
                axisPointer: {
                    label: {
                        padding: [0, 0, 10, 0],
                        margin: 15,
                        // 移入时的字体大小
                        fontSize: 12,
                        backgroundColor: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#fff' // 0% 处的颜色
                            }, {
                                // offset: 0.9,
                                offset: 0.86,
                                color: '#fff' // 0% 处的颜色
                            }, {
                                offset: 0.86,
                                color: '#33c0cd' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#33c0cd' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                },
                boundaryGap: false
            }],
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#DCE2E8'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    color: token.color11
                }
            }],
            series: [{
                    name: '实时负载(KW)',
                    type: 'line',
                    data: [3200,2300,80,1360,3500,4500,5678,12999,23456,24567,33467,12789,42345,56721,72351,65432,37821,55121,68723,62436,36722,13218,13223,8762,50,10,40,50,100,80,90,90,80,110,80,50],
                    symbolSize: 1,
                    symbol: 'circle',
                    smooth: false,
                    yAxisIndex: 0,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: '#9effff'
                            },
                            {
                                offset: 1,
                                color: '#9E87FF'
                            }
                        ])
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[0],
                            borderColor: colorList[0]
                        }
                    }
                }, {
                    name: '日前响应能力(KW)',
                    type: 'line',
                    data: [40000,40000,40000,40000,40000,40000,40000,40000,40000,40000,40000,40000,40000,40000,40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
                    symbolSize: 1,
                    symbol: 'circle',
                    smooth: false,
                    yAxisIndex: 0,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
                                offset: 0,
                                color: '#73DD39'
                            },
                            {
                                offset: 1,
                                color: '#73DDFF'
                            }
                        ])
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[1],
                            borderColor: colorList[1]
                        }
                    }
                },
                {
                    name: '日中响应能力(KW)',
                    type: 'line',
                    data: [25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,],
                    symbolSize: 1,
                    symbol: 'circle',
                    smooth: false,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#fe9a'
                            },
                            {
                                offset: 1,
                                color: '#fe9a8b'
                            }
                        ])
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[2],
                            borderColor: colorList[2]
                        }
                    }
                }
            ]
        })
    }
    
    useEffect(() => {
        getOptions();
    }, [theme])

    return (
        <ReactECharts  
            option={options} 
            style={{ width: '100%', height: '100%' }} 
        />
    )
}

export default LoadStatisc;