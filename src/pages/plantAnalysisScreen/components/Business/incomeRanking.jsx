import ReactECharts from "echarts-for-react";
import { useState, useEffect, } from "react";
import * as echarts from "echarts";
import { MyTab } from "@/components";

const IncomeRanking = ({ data }) => {
    const [options, setOptions] = useState({});
    const [currentType, setCurrentType] = useState('1');

    const getOptions = () => {
        const xData = ['XX电站','XX电站','XX电站','XX电站']
        const backData = new Array(data.length).fill(Math.max(...data)+2);
        setOptions({
            tooltip: {
                trigger: 'item',
            },
            grid:{
                top: 55,
                left: 50,
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
                      color: '#18486F',
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
                        "symbolSize": [35, 15],
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
                        barWidth: 35,
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
                        "symbolSize": [35, 15],
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
                    // 数据圆柱体背景的圆柱体
                    {
                        name: '',
                        type: 'bar',
                        barWidth: 35,
                        barGap: '-100%',
                        z:0,
                        itemStyle: {
                            color: '#26859B',
                            opacity:.5,
                        },
                        data: backData
                    },
                    // 数据圆柱体背景的圆柱体上面的圆形
                    {
                      "name": "",
                      "type": "pictorialBar",
                      "symbolSize": [35, 15],
                      "symbolOffset": [0, -10],
                      "z": 12,
                      "symbolPosition": "end",
                      itemStyle:{
                          color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0,  color: '#54FCFF'}, 
                            { offset: 0.7,  color: '#00B7FF'}
                        ], false),
                          opacity:1,
                      },
                      "data": backData
                    },
                ]
        });
    }

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <div style={{width: '100%', height: '100%', position: 'relative'}}>
            <div style={{display: 'flex', justifyContent: 'end', position: 'absolute', right: 5, top: 5}}>
                <MyTab 
                    value={currentType}
                    options={[
                        {value: '1', label: '正序'},
                        {value: '2', label: '倒序'},
                    ]}
                />
            </div>
            <ReactECharts option={options} style={{height: 'calc(100% - 5px)'}} />
        </div>
    )
}

export default IncomeRanking;