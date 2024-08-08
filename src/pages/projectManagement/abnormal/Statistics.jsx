import { Space, Select, theme } from "antd";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useState, useEffect } from "react";

const Statistics = () => {
    const [options, setOptions] = useState({});
    const { token } = theme.useToken();

    const getOptions = () => {
        const xAxisData = ['一月', '二月', '三月']
        setOptions({
            legend: {
                data: ['异常1', '异常2'],
                textStyle: {
                    fontSize: 14,
                    color: '#FFF',
                },
            },
            grid: {
                left: 50,
                right: 50
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: '#FFFFFF'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                },
                data: xAxisData
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#FFFFFF'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0,0,0,0.15)'
                    },
                    width: 2
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.15)'
                    }
                },
            },
            series: [
                {
                    name: '异常1',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 50,
                    data: [10,20,30],
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "#0DB2FF",
                                },
                                {
                                    offset: 1,
                                    color: "#00D5CF",
                                },
                            ]),
                        },
                    },
                }
            ]
        })
    }

    useEffect(()=>{
        getOptions();
    }, [])
    return (
        <Space
            direction="vertical"
            style={{
                width: '100%'
            }}
        >
            <Space>
                <span style={{color: token.fontColor}}>时间维度：</span>
                <Select
                    options={[
                        { value: 'YEAR', label: '年' },
                        { value: "MONTH", label: '月' }
                    ]}
                    style={{width: 200}}
                    placeholder="请选择时间维度"
                />
            </Space>
            <ReactECharts option={options} style={{ width: "100%", height: 'calc(100vh - 250px)' }}/>
        </Space>
    )
}

export default Statistics;