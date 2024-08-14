// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, DatePicker, Button, Cascader, message } from "antd";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import { CardModel } from "@/components";
import { getMonitorTypeInitData2, monitorDataWithTime2, } from '@/services/deviceTotal'
import dayjs from 'dayjs';
import { getQueryString, downLoadExcelMode } from "@/utils/utils";
import { useSelector, useIntl } from "umi";
const { Option } = Select;

function Com(props) {
    const { token } = theme.useToken();
    const [options, setOptions] = useState([]);
    const [unit, setUnit] = useState('%');
    const id = getQueryString('id') || 0;
    const [date, setDate] = useState(dayjs(new Date()));
    const [dateStr, setDateStr] = useState([dayjs(new Date()).format('YYYY-MM-DD')]);
    const [dataType, setDataType] = useState(0);
    const [title, setTitle] = useState('');
    const [optionEchart, setOptionEchart] = useState({});
    const [data, setData] = useState();
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }

    const initOption = () => {
        setOptionEchart(baseOption);
    };
    useEffect(() => {
        initOption();
        getInitData();
    }, [token, id]);
    useEffect(() => {
        setDataType(options[0]?.value);
    }, [options])
    const getInitData = async () => {
        let { data } = await getMonitorTypeInitData2({deviceType:getQueryString('type')});
        setOptions(data?.data);
        setTitle(data?.data?.[0]?.label);
        setDataType(data?.data?.[0]?.value);
        getChartData(data?.data?.[0]?.value);
    }
    const getChartData = async (initDataType) => {
        let dateList = dateStr;
        if (dateList.length > 7) {
            message.warning(t('最多选择7个对比项'));
            return
        }
        let { data } = await monitorDataWithTime2({
            dtuId: id,
            dataType: dataType||initDataType,
            dateList: dateStr
        });
        dealDataBot(data?.data, setOptionEchart)
        setData(data?.data);
        let title = options.find(it => it.value == dataType).label
        setTitle(title);
    }

    const dealDataBot = (data, setHandel) => {
        if (dataType == 999) {
            let dataX = [];
            let dataYD = [];
            let dataYC = [];
            data.map((it, index) => {
                dataX.push(it.date);
                dataYD.push(it.energyData?.discharge);
                dataYC.push(it.energyData?.charge);
            });
            let series = [{
                name: t('充电电量'),
                type: 'bar',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: token.chartLineColor[0],
                        lineStyle: {
                            color: token.chartLineColor[0],
                            width: 2
                        },
                    }
                },
                data: dataYC
            }, {
                name: t('放电电量'),
                type: 'bar',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: token.chartLineColor[1],
                        lineStyle: {
                            color: token.chartLineColor[1],
                            width: 2
                        },
                    }
                },
                data: dataYD
            }]
            setHandel({
                ...baseOption, xAxis: [
                    {
                        type: 'category',
                        name: t("时间"),
                        splitNumber: 12,
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: [...dataX]

                    }
                ], legend: { ...baseOption.legend, data: series?.map(item => item.name) }, series: [...series]
            });
        } else {
            let series = [];
            data.map((it, index) => {
                series.push({
                    name: it.date,
                    type: 'line',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: token.chartLineColor[index],
                            lineStyle: {
                                color: token.chartLineColor[index],
                                width: 2
                            },
                        }
                    },
                    data: it.data
                })
            })
            setHandel({
                ...baseOption, legend: { ...baseOption.legend, data: series?.map(item => item.name) }, series: [...series]
            });
        }

    }
    const changeDataType = (val, a) => {
        let unit = options.find(it => it.value == val).unit
        setDataType(val);
        setUnit(unit);
    }
    const changeDate = (val, str) => {
        setDateStr(str);
        setDate(val);
    }
    const downLoadFoodModel = () => {  // 菜品模板下载
        let fileName = options.find(it => it.value == dataType)?.label;
        let sheetName = options.find(it => it.value == dataType)?.label;
        if (dataType==999) {
            let sheetFilter = ['time','charge','discharge'];
            let sheetHeader = ["Time",t('充电电量'),t('放电电量')];
            let exportData=[];
            data.map((it, i) => {
                exportData.push({...it.energyData,time:it.date});
            })
            downLoadExcelMode(fileName, exportData, sheetFilter, sheetHeader, sheetName);
            
        }else{
            let sheetFilter = ['time',];
            let sheetHeader = ["Time"];
            let exportData=[];
            data.map((it, i) => {
                sheetHeader.push(it.date);
                sheetFilter.push(it.date)
               it.data.map((item,index)=>{
                exportData[index]={
                    ... exportData[index],
                    [it.date]:item[1],
                    time:item[0]
                };
               })
            })
            downLoadExcelMode(fileName, exportData, sheetFilter, sheetHeader, sheetName);
        }
      
    };
    const baseOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        grid: {
            left: '3%',
            right: '5%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            icon: 'circle',
            top: '0%',
            left: '5%',
            itemWidth: 6,
            itemGap: 20,
            textStyle: {
                color: '#fff'
            }
        },
        xAxis: [
            {
                type: 'category',
                name: t("时间"),
                splitNumber: 12,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    // interval: 0,
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
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: `{value}${unit}`
                }
            }
        ],
        series: []
    }
    return (
        <>
            <div className={styles.advancedAnalytics}>
                <div className={styles.searchHead}>
                    <span >{t('数据项')}:</span>
                    <Select
                        className={styles.margRL}
                        style={{ width: 180 }}
                        onChange={changeDataType}
                        defaultValue={options[0]?.value}
                        key={options[0]?.value}
                    >
                        {options && options?.map(item => {
                            return (<Option key={item.value} value={item.value}>{item.label}</Option>);
                        })
                        }
                    </Select>
                    <span >{t('日期')}:</span>
                    <DatePicker className={styles.margRL}
                        style={{ width: 240 }}
                        multiple
                        maxTagCount={1}
                        onChange={(val, str) => changeDate(val, str)}
                        defaultValue={date}
                        allowClear={false}
                        needConfirm

                    />
                    <Button type="primary" className={styles.firstButton} onClick={getChartData}>
                        {t('查询')}
                    </Button>
                    <Button type="primary" onClick={downLoadFoodModel} style={{ backgroundColor: token.defaultBg }} >
                        {t('导出')} Excel
                    </Button>
                </div>
                <div className={styles.echartPart}>
                    <CardModel
                        title={title}
                        content={
                            <div className={styles.echartPartCardwrap}>
                                <ReactECharts layUpdate={false} notMerge={true} option={optionEchart} style={{ height: '100%' }} />
                            </div>
                        }
                    />

                </div>
            </div>

        </>

    )
}

export default Com