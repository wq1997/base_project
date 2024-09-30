// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, DatePicker, Button, message } from "antd";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { CardModel } from "@/components";
import { pcsDataType } from '@/utils/constants';
import { getQueryString, downLoadExcelMode } from "@/utils/utils";
import { getMonCurHistoryData, getDataParams,getPcsDevList} from '@/services/deviceTotal';
import dayjs from 'dayjs';
import { useSelector, useIntl } from "umi";
const { Option } = Select;
function Com(props) {
    const { token } = theme.useToken();
    const [optionEchart, setOptionEchart] = useState({})
    const [date, setDate] = useState([dayjs(new Date()).format('YYYY-MM-DD')]);
    const [dateObj, setDateObj] = useState([dayjs(new Date())]);
    const [type, setType] = useState(pcsDataType[0].value);
    const [title, setTitle] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');
    const [excelData, setExcelData] = useState([]);
    const [optionsSelect, setOptionSelect] = useState([]);
    const [pcsIds, setPcsIds] = useState([]);
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
    function onChange(date, val) {
        setDate(val);
        setDateObj(date)
    }
    const changeType = (value, label) => {
        setType(value);
        setCurrentTitle(label?.children);
    }
   
    const handleChange = (val, res) => {
        setPcsIds(val);
    };

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
    }, [token,pcsIds ]);
    useEffect(() => {
        queryData();
    }, [title]);
    useEffect(()=>{
        init();
    },[])
    const init=async()=>{
        let { data:res = {} } = await getPcsDevList({
            plantId: localStorage.getItem('plantId')
        });
        setOption(res?.data);
        setPcsIds([res?.data?.[0]?.id]);
    }
    const getInitData = async () => {
        let { data } = await getDataParams({ devId: pcsIds  });
        if (data?.data) {
            setOptionSelect([...data?.data]);
            setTitle(data?.data?.[0]?.dataTypeDesc);
            queryData();
            setType(data?.data?.[0]?.dataType)
        }
    }
    const queryData = async () => {
        if (!dateObj) {
            message.warning(t('请选择日期'));
            return
        }
        if (dateObj?.length > 7) {
            message.warning(t('时间最多选7天'));
            return
        }
        currentTitle ? setTitle(currentTitle) : null;
        let { data } = await getMonCurHistoryData({
            devId: pcsIds[0] ,
            dataId: type,
            dateList: date
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
        console.log(data,dataX,1212);
    }
    const downLoadFoodModel = () => {
        let fileName = title;
        let sheetData = excelData;
        let sheetFilter = ['time',];
        let sheetHeader = [t("时间"), ];
        date?.map((it,i)=>{
            sheetHeader.push(it);
            sheetFilter.push(i)
        })
        downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader,)
    };
    return (
        <div className={styles.monitoringCurves}>
            <div className={styles.searchHead} style={{color:token.titleColor}}>
                <span className={styles.margRL}> {t('对比日期')}:</span>
                <DatePicker
                    onChange={onChange}
                    defaultValue={dateObj}
                    multiple
                    maxTagCount={1}
                    style={{ width: 240 }}
                />
                <span className={styles.margRL}>{t('设备')}:</span>
                <Select
                    style={{
                        width: '10.4167rem',
                    }}
                    placeholder="Please select"
                    value={pcsIds}
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
                {optionsSelect.length && <Select
                    className={styles.margR}
                    style={{ width: 240 }}
                    value={type}
                    onChange={changeType}

                >
                    {optionsSelect?.map(item => {
                        return (<Option key={item.dataType} value={item.dataType}>{item.dataTypeDesc}</Option>);
                    })
                    }
                </Select>}
                <Button type="primary" className={styles.firstButton} onClick={queryData}>
                    {t('查询')}
                </Button>
                <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={downLoadFoodModel}>
                {t('导出')}{" "}Excel
                </Button>
            </div>
            <div className={styles.echartPart}>
                <CardModel
                    title={title}
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