import ReactECharts from "echarts-for-react";
import { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useIntl } from "umi";

const ElectricityRanking = ({ data }) => {
    const intl = useIntl();
    const [options, setOptions] = useState({});
    const getOptions = () => {
        const xData = ['2024/07/02','2024/07/03','2024/07/04','2024/07/05']
        setOptions({
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                textStyle: {
                    color: 'white'
                },
                right: 0
            },
            grid:{
                top: 35,
                left: 40,
                right: 0,
                bottom: 30
            },
            xAxis: {
                data: xData,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    interval:0,
                    textStyle: {
                        color: '#fff',
                        fontSize:10,
                    },
                    margin: 20, //刻度标签与轴线之间的距离。
                },
            },
            yAxis: {
                splitLine: {
                    show: true,
                    lineStyle:{
                      color: '#00516F',
                      type: 'dashed'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize:10,
                    },
                }
            },
            series: [
                {
                    name: intl.formatMessage({id: '充电量'}),
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: '#3EFFF2'
                          }, {
                              offset: 1,
                              color: '#4499F5'
                          }]),
                          barBorderRadius: 12,
                      },
                    },
                    data: data?.[0]
                },
                {
                    name: intl.formatMessage({id: '放电量'}),
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: '#FFF700'
                          }, {
                              offset: 1,
                              color: '#D65527'
                          }]),
                          barBorderRadius: 12,
                      },
                    },
                    data: data?.[1]
                }
            ]
        });
    }

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <ReactECharts 
            option={options} 
            style={{width: '100%', height: '100%'}} 
        />
    )
}

export default ElectricityRanking;