import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { theme as antdTheme } from "antd";
import { useSelector } from "umi";
import * as echarts from "echarts";

const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF'];

const PriceChart = () => {
    const { token } = antdTheme.useToken();
    const { theme } = useSelector(state => state.global);
    const [options, setOptions] = useState({});

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
                top: 50,
                bottom: 40,
                left: 50,
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
                    textStyle: {
                        color: '#556677'
                    },
                    // 默认x轴字体大小
                    fontSize: 12,
                    // margin:文字到x轴的距离
                    margin: 15
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
                name: '价格(元/MWh)',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#DCE2E8'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#556677'
                    }
                },
                splitLine: {
                    show: false
                }
            }],
            series: [{
                    name: '日前预测电价',
                    type: 'line',
                    data: [500,400,400,500,600,700,750,850,900,800,700,500,400,600,620,800,1000,1050,800,600,500,300, 300],
                    symbolSize: 1,
                    symbol: 'circle',
                    smooth: true,
                    yAxisIndex: 0,
                    showSymbol: false,
                    lineStyle: {
                        width: 5,
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: '#9effff'
                            },
                            {
                                offset: 1,
                                color: '#9E87FF'
                            }
                        ]),
                        shadowColor: 'rgba(158,135,255, 0.3)',
                        shadowBlur: 10,
                        shadowOffsetY: 20
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[0],
                            borderColor: colorList[0]
                        }
                    }
                },
                {
                    name: '日内预测电价',
                    type: 'line',
                    data: [700,600,600,700,800,900,750,950,1100,900,900,700,600,800,820,700,1200,1250,900,800,600,400, 350],
                    symbolSize: 1,
                    symbol: 'circle',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 5,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#fe9a'
                            },
                            {
                                offset: 1,
                                color: '#fe9a8b'
                            }
                        ]),
                        shadowColor: 'rgba(254,154,139, 0.3)',
                        shadowBlur: 10,
                        shadowOffsetY: 20
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
        <div>
            <div
                style={{
                    height: 50,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div 
                    style={{
                        background: 'rgba(158,135,255, 0.1)',
                        width: 'calc(50% - 10px)', 
                        lineHeight: '50px', 
                        padding: '0 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    日前出清电价差：<span style={{color: token.colorPrimary, fontWeight: 600, fontSize: 18}}>1150 元/MWh</span>
                </div>
                <div 
                    style={{
                        background: 'rgba(158,135,255, 0.1)',
                        width: 'calc(50% - 10px)', 
                        lineHeight: '50px', 
                        padding: '0 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    日内出清电价差：<span style={{color: token.colorPrimary, fontWeight: 600, fontSize: 18}}>1200 元/MWh</span>
                </div>
            </div>
            <ReactECharts  
                option={options} 
                style={{ width: '100%', height: '400px' }} 
            />
        </div>
    )
}

export default PriceChart;