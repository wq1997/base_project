import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme } from 'antd';
import ReactECharts from "echarts-for-react";
import {  useIntl } from "umi";
import dayjs from 'dayjs';
import { getGridPointPowers } from "@/services/deviceTotal";

function Com(props) {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
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
        getMock();
    }, [token]);
const getMock=async()=>{
    let {data}=await getGridPointPowers({
        gridPointId:1
    });
    
    let arrSy=[];
    let arrRy=[]
    data.data.strategyPower?.map(it=>{
        arrRy.push([dayjs(it.time).format('HH:mm'),it.value]);
    });
    data.data.gridPointPower?.map(it=>{
        arrSy.push([dayjs(it.time).format('HH:mm'),it.value])
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
            data: [t('运行功率'),t('策略功率'),],
            textStyle:{
                color: token.titleColor//字体颜色
                },
            left:0,
        },
        xAxis: [
            {
                type: 'category',
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
                name:t('运行功率'),
                type: 'line',
                itemStyle: {
                    normal: {
                        color: token.barColor[0]

                    }
                },
                data: [...arrSy],
            },
            {
                name:t('策略功率'),
                type: 'line',
                itemStyle: {
                    normal: {
                        color: token.barColor[1]

                    }
                },
                data: [...arrRy]
            },
        ]
    })
}


    return (
        <ReactECharts option={options} style={{ height: '100%' }} />
    )
}

export default Com