
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import ScrollTable from "../../../components/ScorllTable/index";
import { CardModel } from "@/components";
import styles from './index.less'
import { DatePicker } from 'antd';
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
                data: ['28日', '29日', '30日', '1日', '2日', '3日', '4日','5日','6日'],
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
                    name:'实时功率',
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
                    data:[12, 32, 11, 14, 90, 30, 10, 82, 91, 34, 90, 33]
                },
            ]
          });
    };

    useEffect(() => {
        getOptions();
    }, [token]);
    return (
        <div className={styles.content}>
            <CardModel
             title={
                "实时功率"
            }
                content={
                    <ReactECharts option={options} style={{height: '100%'}} />
                }
            />

        </div>
    )
}

export default Com