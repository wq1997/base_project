// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, DatePicker, Button } from "antd";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { CardModel } from "@/components";
import { MgOcInitDataType } from '@/utils/constants';
import { getQueryString } from "@/utils/utils";
import { obtainMgOcParameterData } from '@/services/deviceTotal';
import dayjs from 'dayjs';
import { useSelector, useIntl } from "umi";
const { Option } = Select;
function Com(props) {
    const { token } = theme.useToken();
    const [optionEchart, setOptionEchart] = useState({})
    const [date, setDate] = useState(dayjs(new Date()));
    const [type, setType] = useState(MgOcInitDataType[0].value);
    const [title,setTitle]=useState('电表总功率');
    const [unit, setUnit] = useState('kW');
    const intl = useIntl();
    const id = getQueryString("id");
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    function onChange(date) {
        setDate(date);
        // console.log(date, dateString, dayjs(new Date()).format('YYYY-MM-DD'));
    }
    const changeType = (value,label) => {
        setType(value);
        setTitle(label.children.props?.id);
        let unit=MgOcInitDataType.find(it=>it.value==value).unit;
        setUnit(unit);
    }
    const queryData = async () => {
        let { data } = await obtainMgOcParameterData({
            id: id,
            type,
            dateOne: dayjs(new Date()).format('YYYY-MM-DD'),
            dateTwo: date.format('YYYY-MM-DD'),
            // dateList:[dayjs(new Date()).format('YYYY-MM-DD'),date.format('YYYY-MM-DD'),]
        });
        let dataX = []
        let nowY = [];
        let toY = [];
        data.nowDay?.map(it => {
            dataX.push(dayjs(it.time).format('HH:mm:ss'));
            nowY.push(it.value);
        })
        data.toDay?.map(it => {
            toY.push(it.value);
        })
        setOptionEchart({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: [ `今日${title}`,`${date.format('YYYY-MM-DD')}${title}`],
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
                    name: `${t('今日')}${t(title)}`,
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
                    name: `${date.format('YYYY-MM-DD')}${t(title)}`,
                    type: 'line',
                    // stack: 'total',
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#FF8E07',
                            lineStyle: {
                                color:'#FF8E07',
                                width: 1
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: token.sub_innerBgc
                                }, {
                                    offset: 0.7,
                                    color:' #FF8E07'
                                }]),
                            }
                        }
                    },
                    data: toY
                },
            ]
        });
    }
    useEffect(() => {
        queryData();
    }, [token]);
    return (
        <div className={styles.monitoringCurves}>
            <div className={styles.searchHead}>
                <span className={styles.margRL}> {t('对比日期')}:</span>
                <DatePicker onChange={onChange} defaultValue={date} />
               <span  className={styles.margRL}>{t('数据项')}:</span> 
                <Select
                className={styles.margR}
                    style={{ width: 240 }}
                    defaultValue={MgOcInitDataType[0]?.value}
                    onChange={changeType}
                >
                    {MgOcInitDataType && MgOcInitDataType.map(item => {
                        return (<Option key={item.value} value={item.value}>{item.label}</Option>);
                    })
                    }
                </Select>
                <Button type="primary" className={styles.firstButton} onClick={queryData}>
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