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
import { obtainBMSClustersList, getMonCurHistoryData, getDataParams } from '@/services/deviceTotal'
import { getQueryString, downLoadExcelMode } from "@/utils/utils";

const { Option } = Select;
function Com({ id }) {
    const { token } = theme.useToken();
    const [type, setType] = useState();
    const [dataOption, setDataOption] = useState('');
    const [optionEchart, setOptionEchart] = useState({})
    const activitesRef = useRef([]);
    const [goalId, setGoalId] = useState(id);
    const [title, setTitle] = useState('');
    const [unit, setUnit] = useState('V')
    const [date, setDate] = useState(dayjs(new Date()));
    const [excelData, setExcelData] = useState([]);
    const [optionsSelect, setOptionSelect] = useState([]);
    const [dateStr, setDateStr] = useState([dayjs(new Date()).format('YYYY-MM-DD')]);

    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    function onChange(val, str) {
        setDateStr(str);
        setDate(val);
    }

    useEffect(() => {
        // getOptions();
        getInitData();
    }, [id]);
    useEffect(() => {
            getEchartsData(id);
    }, [id])

    const getEchartsData = async () => {
        let { data } = await getMonCurHistoryData({
            devId:id||getQueryString("id"),
            dataId:type,
            dateList:dateStr
        });
        let excelData = [];
        let dataX = []
        let nowY = [];
        let toY = [];
        data.data?.nowDay?.map((it, index) => {
            dataX.push(dayjs(it.time).format('HH:mm'));
            nowY.push(it.value);
            excelData.push({
                time: dayjs(it.time).format('HH:mm'),
                nowDay: it.value,
                toDay: data.data?.toDay[index].value
            })
        })
        dataX.length === 0 ? data.data?.toDay?.map(it => {
            toY.push(it.value);
            dataX.push(dayjs(it.time).format('HH:mm'))
        }) : data.data?.toDay?.map(it => {
            toY.push(it.value);
        });
        setExcelData([...excelData]);

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
                    color: token.smallTitleColor,
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
    const downLoadFoodModel = () => {
        let fileName = title;
        let sheetData = excelData;
        let sheetFilter = ['time', 'nowDay', 'toDay'];
        let sheetHeader = ["时刻", dayjs(new Date()).format('YYYY-MM-DD'), dayjs(date)?.format('YYYY-MM-DD')];
        downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader,)
    };

    const changeDataType = (val, label) => {
        setType(val);
        setTitle(label?.label);

    }
    const getInitData = async () => {
        let { data } = await getDataParams({ devId: id || props?.id });
        if (data.data) {
            setOptionSelect([...data?.data]);
            setTitle(data?.data?.[0]?.dataTypeDesc);
            setType(data?.data?.[0]?.dataType)
        }

    }
    return (
        <div className={styles.monitoringCurves}>
            <div className={styles.searchHead}>
                {t('数据项')}:
                {type && <Select
                    className={styles.margRL}
                    style={{ width: 240 }}
                    onChange={changeDataType}
                    options={optionsSelect.map(it => {
                        return {
                            value: it.dataType,
                            label: it.dataTypeDesc
                        }
                    })}
                    defaultValue={type}
                >

                </Select>}
                <DatePicker 
                    style={{ width: 240 }}
                    maxTagCount={1}
                    multiple onChange={(val, str) => onChange(val, str)} defaultValue={date} />
                <Button type="primary" className={styles.firstButton} onClick={() => getEchartsData(goalId)}>
                    {t('查询')}
                </Button>
                <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={downLoadFoodModel} >
                    {t('导出')}excel
                </Button>
            </div>
            <div className={styles.echartPart}>
                <CardModel
                    title={title?t(title):''}
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