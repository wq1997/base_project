// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, DatePicker, Button } from "antd";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { CardModel } from "@/components";
import dayjs from 'dayjs';
import { useSelector, useIntl } from "umi";
import { BmsDataType, BmcDataType } from '@/utils/constants'
import { obtainBMSClustersList, obtainBMSParameterData } from '@/services/deviceTotal'
import { getQueryString } from "@/utils/utils";

const { Option } = Select;
function Com({ id }) {
    const { token } = theme.useToken();
    const [type, setType] = useState(BmsDataType[0].value);
    const [dataOption, setDataOption] = useState('');
    const [optionEchart, setOptionEchart] = useState({})
    const activitesRef = useRef([]);
    const [goalId, setGoalId] = useState(id);
    const [title, setTitle] = useState('电压');
    const [unit, setUnit] = useState('V')
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
        // getOptions();
    }, [token]);
    useEffect(() => {
        getClustersData().then(() => {
            getEchartsData(id);
        });
    }, [id])
    const getClustersData = async () => {
        let { data } = await obtainBMSClustersList({ id })
        getClusters(data.data);
    }
    const getEchartsData = async (id) => {
        let { data } = await obtainBMSParameterData({
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
        dataX.length===0? data.data?.toDay?.map(it => {
            toY.push(it.value);
            dataX.push(dayjs(it.time).format('HH:mm'))
        }):data.data?.toDay?.map(it => {
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
                        formatter: `{value}${unit}`
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
    const getClusters = (data) => {
        data.map(it => {
            it.value = it.id;
            it.label = it.name;
        })
        activitesRef.current = data;
        setDataOption(BmsDataType);
        setGoalId(data[0].id);
    }

    const changeCluster = (val) => {
        let goal = activitesRef.current.find(it => it.id == val);
        setGoalId(goal.id);
        if (goal.type == '101') {
            setDataOption(BmsDataType);
            setType(BmsDataType[0].value)
        } else {
            setDataOption(BmcDataType);
            setType(BmcDataType[0].value)
        }
    }
    const changeDataType = (val, label) => {
        setType(val);
        setTitle(label?.label.props?.id);
        setUnit(label?.unit)
    } 
    return (
        <div className={styles.monitoringCurves}>
            <div className={styles.searchHead}>
                <span >{t('数据类型')}:</span>
                <Select
                    className={styles.margRL}
                    style={{ width: 240 }}
                    onChange={changeCluster}
                    key={activitesRef.current[0]?.value}
                    defaultValue={activitesRef.current[0]?.value}
                >
                    {activitesRef.current && activitesRef.current.map(item => {
                        return (<Option key={item.value} value={item.value}>{t(item.label)}</Option>);
                    })
                    }
                </Select>
                {t('数据项')}:
                <Select
                    className={styles.margRL}
                    style={{ width: 240 }}
                    onChange={changeDataType}
                    options={dataOption}
                    defaultValue={type}
                >

                </Select>
                <DatePicker onChange={onChange} defaultValue={date} />
                <Button type="primary" className={styles.firstButton} onClick={() => getEchartsData(goalId)}>
                    {t('查询')}
                </Button>
                <Button type="primary" style={{ backgroundColor: token.defaultBg }} >
                    {t('导出')}excel
                </Button>
            </div>
            <div className={styles.echartPart}>
                <CardModel
                    title={t('监测曲线')}
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