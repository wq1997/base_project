
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { theme } from "antd";

function Com(props) {
    const [xxx, setXxx] = useState('')

    useEffect(() => {
        console.log('函数组件来咯')
    }, [])
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
        setOptions({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: props.xData,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                  },
                  
              }
            ],
            series: [
                {
                    name:props.name,
                    type:'line',
                    stack: '总量',
                    symbol:'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color:token.colorPrimary,
                            lineStyle: {
                                color: token.colorPrimary,
                                width:1
                            },
                            areaStyle: { 
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: token.sub_innerBgc
                                }, {
                                    offset: 1,
                                    color: token.colorPrimaryR
                                }]),
                            }
                        }
                    },
                    markPoint:{
                        itemStyle:{
                            normal:{
                                color:'red'
                            }
                        }
                    },
                    data:props.yData
                },
            ]
          });
    };

    useEffect(() => {
        getOptions();
    }, []);
    return (
 
        <ReactECharts option={options} style={{height: '100%'}} />
      
    )
}

export default Com