// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {getEfficiencyByPlantId}from '@/services/deviceTotal';
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { theme } from "antd";
import dayjs from 'dayjs';
import {  useIntl } from "umi";

function Com(props) {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    // const [dataX, setDataX] = useState([]);
    const [legend, setLegend] = useState([]);
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const getData=async()=>{
        let {data}= await getEfficiencyByPlantId({plantId:localStorage.getItem('plantId')});
        let arr=[];
        let series=[];
        let titles=[];
        data.data[0].list?.map(it=>{
            arr.push(dayjs(it.date).format('MM-DD'));
        })
        data.data.map((item,index)=>{
            let arry=[];
            item.list.map(it=>{
                arry.push(it.efficiency);
            });
            titles.push(t(item.title));
            series.push({
                    name:t(item.title),
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: token.barColor[index]
                        }
                    },
                    data: arry
            })
        });
        // console.log(titles,10101010);
        setLegend([...titles]);
        // setOptions({...options,series})
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
                data: [...titles],
                textStyle:{
                    color: token.titleColor//字体颜色
                    },
            },
            xAxis: [
              {
                type: 'category',
                data: arr,
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel: {
                  interval: 0,
                  rotate:0
              }
              }
            ],
            yAxis: [
              {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                  },
                  
              }
            ],
            series:[...series]
          });
    }
    // const getOptions = () => {
     
    // };
    useEffect(()=>{
        getData();
    console.log(options,101010101);

    },[token,])
    useEffect(() => {
        // getOptions();
    }, [token]);
    return (
        <ReactECharts option={options} style={{height: '100%'}} />
    )
}

export default Com