import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { theme } from "antd";

const Prediction = () => {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
        const cData = [200,400,500,600,500,300,200];
        const fData = [300,400,600,700,600,200,100];
        setOptions({
            grid: {
                top: 20,
                bottom: 45,
                right: 0
            },
            legend: {
                top: 0,
                right: 5,
                data: [
                    {
                        name: '充电',
                        itemStyle: 'rgb(39, 46, 160)',
                        textStyle: {
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    {
                        name: '放电',
                        itemStyle: 'rgb(202, 212, 54)',
                        textStyle: {
                            color: 'rgba(0,0,0,0)'
                        }
                    }
                ]
            },
            xAxis: {
                type: 'category',
                data: ['11/10', '11/11', '11/12', '11/13', '11/14', '11/15', '11/16'],
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: '#ffffff',
                    fontSize: 14,
                    margin: 20
                }
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  color: 'white'
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    type: 'dashed',
                    color: '#646CA9'
                  }
                }
              },
            series: [
                {
                    name: '充电',
                    lineStyle: {
                        normal: {
                            width: 4,
                            color: 'rgb(39, 46, 160)'
                        }
                    },
                    areaStyle: { // 区域面积
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgb(39, 46, 160)'
                                },
                                {
                                    offset: 0.2,
                                    color: 'rgba(39, 46, 160, 0.8)'
                                },
                                {
                                    offset: 0.4,
                                    color: 'rgba(39, 46, 160, 0.6)'
                                },
                                {
                                    offset: 0.6,
                                    color: 'rgba(39, 46, 160, 0.4)'
                                },
                                {
                                    offset: 0.8,
                                    color: 'rgba(39, 46, 160, 0.2)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(39, 46, 160, 0)'
                                }
                            ]
                        }
                    },
                data: cData,
                type: 'line'
              },
              {
                name: '放电',
                lineStyle: {
                        normal: {
                            width: 4,
                            color: 'rgb(202, 212, 54)'
                            }
                        },
                        areaStyle: { // 区域面积
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgb(202, 212, 54)' // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.2,
                                        color: 'rgba(202, 212, 54, 0.8)' // 50% 处的颜色
                                    },
                                    {
                                        offset: 0.4,
                                        color: 'rgba(202, 212, 54, 0.6)' // 50% 处的颜色
                                    },
                                    {
                                        offset: 0.6,
                                        color: 'rgba(202, 212, 54, 0.4)' // 50% 处的颜色
                                    },
                                    {
                                        offset: 0.8,
                                        color: 'rgba(202, 212, 54, 0.2)' // 50% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(202, 212, 54, 0)' // 100% 处的颜色
                                    }
                                ]
                            }
                        },
                    data: fData,
                    type: 'line'
                }
            ]
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return <ReactECharts option={options} style={{height: '100%'}} />;
};

export default Prediction