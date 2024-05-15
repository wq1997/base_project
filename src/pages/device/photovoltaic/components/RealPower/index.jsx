
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { theme } from "antd";
import dayjs from 'dayjs';
import {  useIntl } from "umi";
import {getPyPower}from '@/services/deviceTotal'


function Com(props) {
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    useEffect(() => {
    }, [])
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});


    useEffect(() => {
        // getOptions();
        getMock();

    }, [token]);
    const getMock=async()=>{
        let {data}=await getPyPower({plantId:localStorage.getItem('plantId')})
        let arrX=[];
        let arrY=[]
        data.data?.map(it=>{
            arrX.push(dayjs(it.time).format('HH:mm'));
            arrY.push(it.value)
        });
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
            legend: {
                // data: [t('并网点')+1,t('并网点')+2,],
                textStyle:{
                    color: token.titleColor//字体颜色
                    },
            },
            xAxis: [
                {
                    type: 'category',
                    data: [...arrX],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        // formatter: '{value} kWh'
                    },
    
                }
            ],
            dataZoom: [{ type: "inside" }],
            toolbox: {
              show: true,
              right: 25,
              feature: {
                magicType: { type: ["line", "bar"], title: "", default: "line" },
                dataZoom: {
                  yAxisIndex: "none",
                },
                saveAsImage: {},
              },
            },
            series: [
            
                {
                    name:t('实时功率'),
                    type: 'line',
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
                    data: [...arrY]
                },
            ]
        })
    }
    return (
        <div className={styles.content}>
            <CardModel
             title={
                t("实时功率")+'(kW)'
            }
                content={
                    <ReactECharts option={options} style={{height: '100%'}} />
                }
            />

        </div>
    )
}

export default Com