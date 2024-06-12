// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, DatePicker, Button } from "antd";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { CardModel } from "@/components";
import { pcsDataType } from '@/utils/constants';
import { getQueryString, downLoadExcelMode } from "@/utils/utils";
import { getMonCurHistoryData,getDataParams } from '@/services/deviceTotal';
import dayjs from 'dayjs';
import { useSelector, useIntl } from "umi";
const { Option } = Select;
function Com(props) {
    const { token } = theme.useToken();
    const [optionEchart, setOptionEchart] = useState({})
    const [date, setDate] = useState(dayjs(new Date()));
    const [type, setType] = useState(pcsDataType[0].value);
    const [title, setTitle] = useState('实时功率');
    const [excelData, setExcelData] = useState([]);
    const [optionsSelect,setOptionSelect]=useState([]);
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
    }
    const changeType = (value, label) => {
        setType(value);
        setTitle(label?.children);
    }
    useEffect(()=>{
        getInitData();
        console.log(id,props,'ayk');
    },[])
    const getInitData=async()=>{
        let {data}=await getDataParams({devId:id||props.id});
        setOptionSelect([...data?.data]);
        setTitle(data?.data?.[0].dataTypeDesc)
    }
    const queryData = async () => {
        let { data } = await getMonCurHistoryData({
            devId: props.id||id,
            dataId:type,
            dateList:[dayjs(new Date()).format('YYYY-MM-DD'),date.format('YYYY-MM-DD')]
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
        dataX.length === 0 ? data.data?.toDay?.map((it, index) => {
            toY.push(it.value);
            dataX.push(dayjs(it.time).format('HH:mm'));

        }) : data.data?.toDay?.map((it, index) => {
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
                textStyle: {
                    color: token.smallTitleColor,
                },
                data: [`今日${title}`, `${date.format('YYYY-MM-DD')}${title}`]
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
                        formatter: '{value} kW'
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
    }
    const downLoadFoodModel = () => {
        let fileName = title;
        let sheetData = excelData;
        let sheetFilter = ['time', 'nowDay', 'toDay'];
        let sheetHeader = ["时刻", dayjs(new Date()).format('YYYY-MM-DD'), dayjs(date)?.format('YYYY-MM-DD')];
        downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader,)
    };

    useEffect(() => {
        queryData();
    }, [token]);
    console.log(optionsSelect,'optionsSelect');
    return (
        <div className={styles.monitoringCurves}>
            <div className={styles.searchHead}>
                <span className={styles.margRL}> {t('对比日期')}:</span>
                <DatePicker onChange={onChange} defaultValue={date} />
                <span className={styles.margRL}>{t('数据项')}:</span>
               {optionsSelect.length && <Select
                    className={styles.margR}
                    style={{ width: 240 }}
                    defaultValue={optionsSelect?.[0]?.dataType}
                    onChange={changeType}
                >
                    { optionsSelect?.map(item => {
                        return (<Option key={item.dataType} value={item.dataType}>{item.dataTypeDesc}</Option>);
                    })
                    }
                </Select>}
                <Button type="primary" className={styles.firstButton} onClick={queryData}>
                    {t('查询')}
                </Button>
                <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={downLoadFoodModel}>
                    {t('导出')}excel
                </Button>
            </div>
            <div className={styles.echartPart}>
                <CardModel
                    title={t(title)}
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