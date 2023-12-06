import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";

const Income = () => {
    const [options, setOptions] = useState({});
    const getOptions = () => {
        const deviceName =[
            "设备项目1",
            "设备项目2",
            "设备项目3",
        ];
        const data =[60,50,40];

        setOptions({
            grid: {
                left: 0,
                right: 20,
                bottom: 0,
                top: 10,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function(params) {
                    return params[0].name  + ' : ' + params[0].value
                }
            },
            xAxis: {
                show: false,
                type: 'value'
            },
            yAxis: [
                {
                    type: 'category',
                    inverse: true,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: 'white'
                        },
                        rich: {
                            a: {
                                color: 'white',
                                fontWeight:'800',
                                fontSize: 15,
                            },
                        },
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    data: deviceName
                }, 
                {
                    type: 'category',
                    inverse: true,
                    axisTick: 'none',
                    axisLine: 'none',
                    show: true,
                    data: [
                        {
                            value:1,
                            textStyle: {
                                color: 'red',
                                borderColor: 'red',
                                borderWidth: 1,
                                padding: 5
                            }
                        },
                        {
                            value:2,
                            textStyle: {
                                color: '#E48D25',
                                borderColor: '#E48D25',
                                borderWidth: 1,
                                padding: 5
                            }
                        },
                        {
                            value:3,
                            textStyle: {
                                color: '#DCCE41',
                                borderColor: '#DCCE41',
                                borderWidth: 1,
                                padding: 5
                            }
                        },
                    ]
                }
            ],
            series: [
                {
                    name: '值',
                    type: 'bar',
                    zlevel: 1,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 30,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#008FCB'
                            }, {
                                offset: 1,
                                color: '#076EA8'
                            }]),
                        },
                    },
                    z: 2,
                    barWidth: 15,
                    data: data
                },
                {
                    name: '背景',
                    type: 'bar',
                    barWidth: 15,
                    barGap: '-100%',
                    data: new Array(data?.length).fill(Math.max(...data)+10),
                    itemStyle: {
                        normal: {
                            color: '#001433',
                            barBorderRadius: 30,
                            borderColor: '#0E3A77',
                            borderWidth:2
                        }
                    },
                    z: 1,
                },
            ]
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return (
      <div style={{height: '100%', padding: '20px', boxSizing: 'border-box'}}>
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'white',
                fontFamily: 'electronicFont'
            }}
        >
            <div>项目名称</div>
            <div>收益情况示意</div>
            <div>排行</div>
        </div>
        <ReactECharts option={options} style={{height: '100%'}} />
      </div>
    );
}

export default Income;