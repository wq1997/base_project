import ReactECharts from "echarts-for-react";
import { useState, useEffect, } from "react";
import * as echarts from "echarts";

const IncomeRanking = ({ data }) => {
    const [options, setOptions] = useState({});

    const getOptions = () => {
        const xData = ['2024/07/02','2024/07/03','2024/07/04','2024/07/05']
        setOptions({
            tooltip: {
                trigger: 'item',
            },
            grid:{
                top: 20,
                left: 30,
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
                    // 数据圆柱的下边圆形
                    {
                        "name": "",
                        "type": "pictorialBar",
                        "symbolSize": [30, 15],
                        "symbolOffset": [0, 10],
                        "z": 12,
                        itemStyle:{
                            opacity:1,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0,  color: '#02FAFF'}, 
                                { offset: 0.7,  color: '#00B7FF'}
                            ], false),
                        },
                        "data": new Array(xData?.length).fill(1)
                    },
                    //数据圆柱
                    {
                        name: '',
                        type: 'bar',
                        barWidth: 30,
                        barGap: '-100%',
                        itemStyle: {
                            opacity:.7,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0,  color: '#02FAFF'}, 
                                { offset: 0.7,  color: '#00B7FF'}
                            ], false)
                        },
                        data
                    },
                    // 数据上半部分的圆形
                    {
                        "name": "",
                        "type": "pictorialBar",
                        "symbolSize": [30, 15],
                        "symbolOffset": [0, -10],
                        "z": 12,
                        itemStyle:{
                            opacity:1,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0,  color: '#02FFEF'}, 
                                { offset: 0.7,  color: '#009EFF'}
                            ], false),
                        },
                        "symbolPosition": "end",
                        "data": data,
                        "label": {
                          "normal": {
                              "show": true,
                              "position": 'top',
                              "formatter": "{c}",
                              "color": 'white'
                          }
                      },
                    },
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

export default IncomeRanking;