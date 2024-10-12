// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, DatePicker, Button,Cascader  } from "antd";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { CardModel } from "@/components";
import dayjs from 'dayjs';
import { useSelector, useIntl } from "umi";
import { getMeterMonitorInitData, obtainMeterParameterData } from '@/services/deviceTotal'
import { getQueryString } from "@/utils/utils";

const { Option } = Select;
function Com({ id }) {
    const { token } = theme.useToken();
    const [type, setType] = useState(310);
    const [dataOption, setDataOption] = useState([]);
    const [optionEchart, setOptionEchart] = useState({})
    const [goalId, setGoalId] = useState(id);
    const [title, setTitle] = useState('当天充电电量');
    const [unit, setUnit] = useState('kW');
    
    const [date, setDate] = useState(dayjs(new Date()));
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    function onChange(date, dateString) {
        setDate(date);
    }

    useEffect(() => {
        getEchartsData();
    }, [token,type]);
    useEffect(() => {
        getInitData()
    }, [id])
    const getInitData = async () => {
        let { data } = await getMeterMonitorInitData();
        setDataOption(data?.data);
        setType(data?.data[0]?.children[0]?.value);
        setTitle(data?.data[0]?.children[0]?.label);
        setUnit(data?.data[0]?.children[0]?.unit)
    }
    const getEchartsData = async () => {
        let { data } = await obtainMeterParameterData({
            id,
            type,
            dateOne: dayjs(new Date()).format('YYYY-MM-DD'),
            dateTwo: date.format('YYYY-MM-DD'),
        });
        let dataX = []
        let nowY = [];
        let toY = [];
        data.data?.nowDay?.map(it => {
            dataX.push(dayjs(it.time).format('HH:mm'));
            nowY.push(it.value);
        })
        dataX.length===0? data.data?.today?.map(it => {
            toY.push(it.value);
            dataX.push(dayjs(it.time).format('HH:mm'));
        }):data.data?.today?.map(it => {
            toY.push(it.value);
        });
        setOptionEchart({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: [`今日${title}`, `${date.format('YYYY-MM-DD')}${title}`],
                textStyle: {
                    color:token.smallTitleColor,
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
                    data: dataX,
                    axisTick: {
                        alignWithLabel: true
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
            series: [
                {
                    name: `今日${title}`,
                    type: 'line',
                    // stack: 'total',
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: token.colorPrimary,
                            lineStyle: {
                                color: token.colorPrimary,
                                width: 1
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
                    markPoint: {
                        itemStyle: {
                            normal: {
                                color: 'red'
                            }
                        }
                    },
                    data: nowY
                },
                {
                    name: `${date.format('YYYY-MM-DD')}${title}`,
                    type: 'line',
                    // stack: 'total',
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#FF8E07',
                            lineStyle: {
                                color: '#FF8E07',
                                width: 1
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: token.sub_innerBgc
                                }, {
                                    offset: 0.7,
                                    color: ' #FF8E07'
                                }]),
                            }
                        }
                    },
                    data: toY
                },
            ]
        });
    };

    const changeCluster = (val,selectedOptions) => {
        setType(val[1])
        setTitle(selectedOptions[1]?.label);
        setUnit(selectedOptions?.[1]?.unit)
        console.log(val,selectedOptions,111111);
        
    }
    return (
        <div className={styles.monitoringCurves}>
            <div className={styles.searchHead}>
                <span >{t('数据类型')}:</span>
                <Cascader 
                    className={styles.margRL}
                    style={{ width: 240 }}
                    onChange={changeCluster}
                    options={dataOption}
                    key={dataOption[0]?.children[0]?.label}
                    defaultValue={[dataOption[0]?.value,dataOption[0]?.children[0]?.value]}
                />
                  
                <DatePicker onChange={onChange} defaultValue={date} />
                <Button type="primary" className={styles.firstButton} onClick={()=>getEchartsData(goalId)}>
                    {t('查询')}
                </Button>
                <Button type="primary" style={{ backgroundColor: token.defaultBg }} >
                    {t('导出')} Excel
                </Button>
            </div>
            <div className={styles.echartPart}>
                <CardModel
                    title={t('监测曲线')+`(${unit})`}
                    content={
                        <div className={styles.echartPartCardwrap}>
                            <ReactECharts option={optionEchart} style={{ height: '100%' }} />
                        </div>
                    }
                />
            </div>
        </div>
    )
}

export default Com