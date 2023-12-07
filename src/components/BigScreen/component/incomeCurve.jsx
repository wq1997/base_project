import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { Select, Space, Radio } from "antd"

const modeList = [
    {
        value: 'Month',
        label: '月'
    },
    {
        value: 'Day',
        label: '日'
    }
]
const IncomeCurve = ({
    currentAreaType
}) => {
    const [options, setOptions] = useState({});
    const [mode, setMode] = useState('Month');

    const handleModeChange = (value) => {
      setMode(value);
    };

    const getOptions = () => {
        const xData = ['12/01', '12/02', '12/03', '12/04', '12/05', '12/06', '12/07']
        const data = [90, 105, 84, 125, 110, 92, 98];

        setOptions({
            grid: {
                top: '10',
                left: '20',
                right: '20',
                bottom: '0',
                containLabel: true,
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#185E91'
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: 'white',
                        margin:15,
                        fontSize: 7
                    },
                },
                axisTick: { show: false,},
                data: xData,
            }],
            yAxis: [{
                type: 'value',
                min: 0,
                max:140,
                splitNumber: 7,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#233e64'
                    }
                },
                axisLine: {show: false,},
                axisLabel: {
                    margin:20,
                    textStyle: {
                        color: 'white',
                        fontSize: 7
                    },
                },
                axisTick: { show: false,},  
            }],
            series: [
                {
                    name: '收益统计',
                    type: 'line',
                    smooth: true,
                    symbolSize:0,
                    lineStyle: {
                        normal: {
                            color: "#07639A"   // 线条颜色
                        }
                    },
                    areaStyle: {
                        normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0,  color: 'rgba(1, 108, 167, 0.9)'}, 
                            { offset: 0.7,  color: 'rgba(1, 108, 167, 0)'}
                        ], false),
        
                        shadowColor: 'rgba(1, 108, 167, 0.9)', //阴影颜色
                        shadowBlur: 20
                    }
                },
                data
            }]
        })
    }

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <div style={{height: '100%',display: 'flex'}}>
            <div style={{flex: 1, height: '100%'}}>
                <ReactECharts option={options} style={{height: '100%'}} />
            </div>
            <div style={{width: 100}}>
                <Space direction="vertical" size={10}>
                    <div style={{display: 'flex', alignItems: 'center', borderRadius: '6px', overflow: 'hidden', width: '100px'}}>
                        {
                            modeList?.map(item => {
                                return (
                                    <div 
                                        style={{
                                            color: 'white', 
                                            width: '50%', 
                                            textAlign: 'center', 
                                            alignItems: 'center',
                                            background: item.value===mode?'#0096D4':'#2E6EA3',
                                            padding: '5px',
                                            fontSize: 15,
                                            cursor: 'pointer'
                                        }}
                                        onClick={()=>handleModeChange(item.value)}
                                    >
                                        {item?.label}
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        currentAreaType==="overseas"&&
                        <Select 
                            defaultValue={'1'}
                            style={{width: 100}}
                            options={[
                                {
                                    label: '法国',
                                    value: '1'
                                },
                                {
                                    label: '美国',
                                    value: '2'
                                },
                                {
                                    label: '英国',
                                    value: '3'
                                }
                            ]}
                        />
                    }
                </Space>
            </div>
        </div>
    )
}

export default IncomeCurve;