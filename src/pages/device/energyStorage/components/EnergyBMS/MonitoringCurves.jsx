// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, DatePicker, Button,message } from "antd";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { CardModel } from "@/components";
import dayjs from 'dayjs';
import { useSelector, useIntl } from "umi";
import { BmsDataType, BmcDataType } from '@/utils/constants'
import { getBmsDevList, getMonCurHistoryData, getDataParams } from '@/services/deviceTotal'
import { getQueryString, downLoadExcelMode } from "@/utils/utils";

function Com({ id }) {
    const { token } = theme.useToken();
    const [type, setType] = useState();
    const [optionEchart, setOptionEchart] = useState({})
    const [goalId, setGoalId] = useState(id);
    const [title, setTitle] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');
    const [date, setDate] = useState(dayjs(new Date()));
    const [excelData, setExcelData] = useState([]);
    const [optionsSelect, setOptionSelect] = useState([]);
    const [dateStr, setDateStr] = useState([dayjs(new Date()).format('YYYY-MM-DD')]);
    const [bmsIds, setBmsIds] = useState([]);
    const [option, setOption] = useState([]);
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
        getInitData();
        setOptionEchart({
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
                    data: [],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} '
                    },

                }
            ],
            series: [

            ]
        });
    }, [bmsIds, token]);
    useEffect(() => {
        getEchartsData();
    }, [title])

    const getEchartsData = async () => {
        if (!dateStr) {
            message.warning(t('请选择日期'));
            return
        }
        if (dateStr?.length > 7) {
            message.warning(t('时间最多选7天'));
            return
        }
        currentTitle ? setTitle(currentTitle) : null;
        let { data } = await getMonCurHistoryData({
            devId: bmsIds[0],
            dataId: type,
            dateList: dateStr
        });
        let ser = [];
        let dataLegend = [];
        let unit = '';
        let dataX = [];
        let excelData = [];
        data?.data?.map((it, i) => {
            dataLegend.push(it.label);
            unit = it?.unit;
            let data = [];
            it?.value?.map((item, index) => {
                data.push([dayjs(item.time).format('HH:mm'), item.value]);
                it?.value.length !== 0 &&dataX.length!==it?.value.length? dataX.push(dayjs(item.time).format('HH:mm')) : null;
                excelData[index] = {
                    ...excelData[index],
                    time: dayjs(item.time).format('HH:mm'),
                    [i]: `${item.value}${unit}`,
                }
            })
            ser.push({
                name: it.label,
                type: 'line',
                // stack: 'total',
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: token.chartLineColor[i],
                        lineStyle: {
                            color: token.chartLineColor[i],
                            width: 1
                        },

                    }
                },
                markPoint: {
                    itemStyle: {
                        normal: {
                            color: 'red'
                        }
                    }
                },
                data: [...data]
            },)
        })
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
                data: [...dataLegend]
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
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: dataX
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: `{value} ${unit}`
                    },

                }
            ],
            series: [
                ...ser
            ]
        });
    };
    const downLoadFoodModel = () => {
        let fileName = title;
        let sheetData = excelData;
        let sheetFilter = ['time',];
        let sheetHeader = ["时间", ];
        dateStr?.map((it,i)=>{
            sheetHeader.push(it);
            sheetFilter.push(i)
        })
        downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader,)
    };

    const changeDataType = (val, label) => {
        setType(val);
        setCurrentTitle(label?.label);
    }
    const getInitData = async () => {
        let { data } = await getDataParams({ devId: bmsIds  });
        if (data?.data) {
            setOptionSelect([...data?.data]);
            setTitle(data?.data?.[0]?.dataTypeDesc);
            setType(data?.data?.[0]?.dataType);
            // getEchartsData();
        }

    }
    useEffect(() => {
        init();
    }, []);
    const init=async()=>{
        let { data:res = {} } = await getBmsDevList({
            plantId: localStorage.getItem('plantId')
        });
        setOption(res?.data);
        setBmsIds([res?.data?.[0]?.id]);
    }
    const handleChange = (val, res) => {
        setBmsIds([val]);
    };
    return (
        <div className={styles.monitoringCurves}>
            <div className={styles.searchHead} style={{color:token.titleColor}}>
                <span className={styles.margRL}> {t('对比日期')}:</span>
                <DatePicker
                    style={{ width: 240 }}
                    maxTagCount={1}
                    multiple
                    onChange={(val, str) => onChange(val, str)}
                    defaultValue={date} />
                      <span className={styles.margRL}>{t('设备')}:</span>
                <Select
                    style={{
                        width: '10.4167rem',
                    }}
                    placeholder="Please select"
                    value={bmsIds}
                    onChange={handleChange}
                    options={
                        option?.map(it => {
                            return {
                                label: it.name,
                                value: it.id
                            }
                        })
                    }
                />
                <span className={styles.margRL}>{t('数据项')}:</span>
                {type && <Select
                    className={styles.margR}
                    style={{ width: 240 }}
                    onChange={changeDataType}
                    options={optionsSelect.map(it => {
                        return {
                            value: it.dataType,
                            label: it.dataTypeDesc
                        }
                    })}
                    value={type}
                >
                </Select>}

                <Button type="primary" className={styles.firstButton} onClick={() => getEchartsData(goalId)}>
                    {t('查询')}
                </Button>
                <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={downLoadFoodModel} >
                {t('导出')}{" "}Excel
                </Button>
            </div>
            <div className={styles.echartPart}>
                <CardModel
                    title={title ? t(title) : ''}
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