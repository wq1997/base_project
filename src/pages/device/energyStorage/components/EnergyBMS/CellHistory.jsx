// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {theme, Select, DatePicker, Button, Cascader, message,Tooltip} from "antd";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import {CardModel} from "@/components";
import {getBmsAnalyticsInitData, analyticsBmsDiffData, analyticsBmsData, getBmsDevList} from '@/services/deviceTotal'
import dayjs from 'dayjs';
import {getQueryString, downLoadExcelMode} from "@/utils/utils";
import {useSelector, useIntl} from "umi";

const {SHOW_CHILD} = Cascader;

function Com(props) {
    const {token} = theme.useToken();
    const [option, setOption] = useState([]);
    const [dateBottom, setDateBottom] = useState(dayjs(new Date()));
    const [dateBottomStr, setDateBottomStr] = useState([dayjs(new Date()).format('YYYY-MM-DD')]);
    const [packList, setPackList] = useState([]);
    const [cellList, setCellList] = useState([]);
    const [cellReq, setCellReq] = useState([]);
    const [optionEchartVolBot, setOptionEchartVolBot] = useState({})
    const [optionEchartTemBot, setOptionEchartTemBot] = useState({});
    const [vAndTExcelTitle, setVAndTExcelTitle] = useState('');
    const [vAndTExcelData, setVAndTExcelData] = useState([]);
    const [packValueBottom, setPackValueBottom] = useState();
    const [optionBms, setOptionBms] = useState([]);
    const [bmsIds, setBmsIds] = useState([]);
    const [flag,setFlag] = useState(0);
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }

    const [options, setOptions] = useState([
        {label:t('单体电压'),value:0},
        {label:t('单体温度'),value:1},
        {label:t('熔断器温度'),value:2},
        {label:t('极柱温度'),value:3},
    ]);
    const [value, setValue] = useState(0);


    useEffect(() => {
        dataInit();
    }, []);
    const dataInit = async () => {
        let {data = {}} = await getBmsDevList({
            plantId: localStorage.getItem('plantId')
        });
        setOptionBms(data?.data);
        setBmsIds([data?.data?.[0]?.id]);
    }
    const handleChange = (val, res) => {
        setBmsIds([val]);
    };

    useEffect(() => {
        getInitData();
    }, [token, bmsIds]);
    useEffect(() => {
        getBottomChartData();
    }, [packValueBottom, cellReq]);
    const getInitData = async () => {
        let {data} = await getBmsAnalyticsInitData({id: bmsIds[0]});
        setPackList(data?.data?.clusterPackList);
        setCellList(data?.data?.cellList);
        setPackValueBottom(data?.data?.clusterPackList?.[0]?.value);
        setCellReq(data?.data?.cellList?.[0]?.value)
        // getBottomChartData();
        setVAndTExcelTitle(`${data?.data?.clusterPackList?.[0]?.label}/${data?.data?.cellList?.[0]?.label}`)
    }
    const getBottomChartData = async () => {
        if(dateBottomStr?.length>3){
            message.warning(t('日期最多选3天'));
            return
        }
        setFlag(value);
        let response = await analyticsBmsData({
            type:value+1,
            packValue: packValueBottom,
            cellValue: cellReq,
            date: dateBottomStr
        });
        let excelArr = [];
        let ser = [];
        let tempData=[],left=[],right=[];
        if(response?.data?.code==200){
            if(value==2||value==3){
                left=response?.data?.data?.map(item=>({
                    label:item?.label,
                    value:item?.value?.one,
                    unit:item?.unit
                }));
                right=response?.data?.data?.map(item=>({
                    label:item?.label,
                    value:item?.value?.two,
                    unit:item?.unit
                }));
                if (left && left[0]?.value) {
                    left[0]?.value.forEach((item, index) => {
                        let newObj = { time: dayjs(item.time).format('HH:mm'),label: value==2?t("左侧熔断器温度"):t("负极极柱温度")};
                        left.forEach(dateItem => {
                            newObj[dateItem.label] = dateItem.value[index].value;
                        });
                        excelArr.push(newObj);
                    });
                }
                if (right && right[0]?.value) {
                    right[0]?.value.forEach((item, index) => {
                        let newObj = { time: dayjs(item.time).format('HH:mm'),label: value==2?t("右侧熔断器温度"):t("正极极柱温度")  };
                        right.forEach(dateItem => {
                            newObj[dateItem.label] = dateItem.value[index].value;
                        });
                        excelArr.push(newObj);
                    });
                }
                setVAndTExcelData([...excelArr]);
            }
            else{
                tempData=response?.data?.data?.map(item=>({
                    label:item?.label,
                    value:item?.value,
                    unit:item?.unit
                }));

                if (tempData && tempData[0]?.value) {
                    tempData[0]?.value.forEach((item, index) => {
                        let newObj = { time: dayjs(item.time).format('HH:mm') };

                        tempData.forEach(dateItem => {
                            if (dateItem.value && dateItem.value[index]) {
                                newObj[dateItem.label] = dateItem.value[index].value;
                            } else {
                                newObj[dateItem.label] = null;
                            }
                        });

                        excelArr.push(newObj);
                    });
                }
                setVAndTExcelData([...excelArr]);
            }
            if(value==0){
                let newSeries = [];
                let yAxis = [];
                tempData?.forEach((item, i) => {
                    const result = dealDataBot2(item?.value, setOptionEchartVolBot, `${item.label}/${t("单体电压")}`, item.unit);

                    newSeries.push({
                        name: result.title,
                        type: 'line',
                        symbolSize: 8,
                        itemStyle: {
                            normal: {
                                color: token.chartLineColor[i],
                                lineStyle: {
                                    color: token.chartLineColor[i],
                                    width: 2
                                },
                            }
                        },
                        data: result.data
                    });

                    yAxis.push({
                        name: result.unit,
                        type: 'value',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: [token.microgridsLine],
                                width: 0.3,
                                type: 'solid'
                            }
                        },
                    });
                });
                setOptionEchartVolBot({
                    ...baseOption,
                    yAxis: yAxis,
                    series: newSeries,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: function (params) {
                            let result = `${params[0].axisValue}<br/>`;
                            params.forEach(item => {
                                result += `${item.marker} ${item.seriesName}: ${item.data[1]} V<br/>`;
                            });
                            return result;
                        },
                    },
                });
            }else if(value==1){
                tempData?.forEach((item,i)=>{
                    ser.push(dealTemp(item.value, `${item.label}/${t("单体温度")}`, i))
                })
            }else if(value==2){
                left?.forEach((item,i)=>{
                    ser.push(dealTemp(item.value, `${item.label}/${t("左侧熔断器温度")}`, i));
                    ser.push(dealTemp(right[i]?.value, `${item.label}/${t("右侧熔断器温度")}`, i));
                })
            }else if(value==3){
                left?.forEach((item,i)=>{
                    ser.push(dealTemp(item.value, `${item.label}/${t("负极极柱温度")}`, i));
                    ser.push(dealTemp(right[i]?.value, `${item.label}/${t("正极极柱温度")}`, i));
                })
            }

            let yAxis= [
                {
                    name:`${value==0?t('V') :t('℃')}`,
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: [token.microgridsLine],
                            width: 0.3,
                            type: 'solid'
                        }
                    },
                }
            ];
            setOptionEchartTemBot({
                ...baseOption,
                yAxis:yAxis,
                series: [...ser],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params) {
                        let result = `${params[0].axisValue}<br/>`;
                        params.forEach(item => {
                            result += `${item.marker} ${item.seriesName}: ${item.data[1]} ℃<br/>`;
                        });
                        return result;
                    },
                },
            })

        }
        getOption();
    }
    const dealDataBot2 = (data, setHandel, title, unit) => {
        let arr = [];
        data?.map((it) => {
            arr.push([dayjs(it.time).format('HH:mm:ss'), it.value]);
        });
        return {
            title: title,
            data: arr,
            unit: unit
        };
    };
    const getBottomChartData2 = async () => {
        console.log('dateBottomStr',dateBottomStr,'dateBottom',dateBottom)
        // if(dateBottomStr?.length>3){
        //     message.warning(t('日期最多选3天'));
        //     return
        // }
        setFlag(value);
        let {data} = await analyticsBmsData({
            packValue: packValueBottom,
            cellValue: cellReq,
            date: dateBottom.format('YYYY-MM-DD')
        });
        let excelArr = [];
        data.data?.temp?.map((it, index) => {
            excelArr?.push({
                time: dayjs(it.time).format('HH:mm'),
                tempInfo: it.value,
                volInfo: data.data?.vol[index]?.value,
                leftTemp: data.data?.leftTemp[index]?.value,
                rightTemp: data.data?.rightTemp[index]?.value,
                negativeTemp: data.data?.negativeTemp[index]?.value,
                positiveTemp: data.data?.positiveTemp[index]?.value,
            })
        });
        setVAndTExcelData([...excelArr]);
        let ser = [];
        if(value==1){
            ser.push(dealTemp(data.data?.temp, t("单体温度"), 0));
        }else if(value==2){
            ser.push(dealTemp(data.data?.leftTemp, t("左侧熔断器温度"), 1));
            ser.push(dealTemp(data.data?.rightTemp, t("右侧熔断器温度"), 2));
        }else if(value==3){
            ser.push(dealTemp(data.data?.negativeTemp, t("负极极柱温度"), 3));
            ser.push(dealTemp(data.data?.positiveTemp, t("正极极柱温度"), 4));
        }
        // ser.push(dealTemp(data.data?.temp, t("单体温度"), 0));
        // ser.push(dealTemp(data.data?.leftTemp, t("左侧熔断器温度"), 1));
        // ser.push(dealTemp(data.data?.rightTemp, t("右侧熔断器温度"), 2));
        // ser.push(dealTemp(data.data?.negativeTemp, t("负极极柱温度"), 3));
        // ser.push(dealTemp(data.data?.positiveTemp, t("正极极柱温度"), 4));
        let yAxis= [
            {
                name:`${value==0?t('V') :t('℃')}`,
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: [token.microgridsLine], // 网格线颜色
                        width: 0.3, // 网格线宽度
                        type: 'solid' // 网格线类型
                    }
                },
            }
        ];
        setOptionEchartTemBot({
            ...baseOption,
            yAxis:yAxis,
            series: [...ser]
        })
        dealDataBot(data.data?.vol, setOptionEchartVolBot, t("单体电压"));

        getOption();
    }
    const dealDataBot = (data, setHandel, title) => {
        let arr = [];
        data?.map((it, index) => {
            arr.push([dayjs(it.time).format('HH:mm:ss'), it.value]);
        });
        let yAxis= [
                {
                    name:`${value==0?t('V') :t('℃')}`,
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: [token.microgridsLine], // 网格线颜色
                            width: 0.3, // 网格线宽度
                            type: 'solid' // 网格线类型
                        }
                    },
                }
            ];
        setHandel({
            ...baseOption,yAxis:yAxis, series: [...(option?.series || []), {
                name: title,
                type: 'line',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: token.chartLineColor[option?.series?.length || 0],
                        lineStyle: {
                            color: token.chartLineColor[option?.series?.length || 0],
                            width: 2
                        },
                    }
                },
                data: arr
            },]
        });
    };
    const dealTemp = (data, title, i) => {
        let arr = [];
        data?.map((it, index) => {
            arr.push([dayjs(it.time).format('HH:mm:ss'), it.value]);
        });
        return ({
            name: title,
            type: 'line',
            symbolSize: 8,
            itemStyle: {
                normal: {
                    color: token.chartLineColor[i],
                    lineStyle: {
                        color: token.chartLineColor[i],
                        width: 2
                    },
                }
            },
            data: arr
        })
    }

    const downLoadVAndT = () => {
        let fileName = vAndTExcelTitle;
        let sheetData = vAndTExcelData;
        let sheetName;

        let sheetFilter = ['time'];
        let sheetHeader = [t("时间")];

        if(value==0){
            sheetName = t("单体电压")+'(V)';
        }else if(value==1){
            sheetName = t("单体温度")+'(℃)';
        }else if(value==2){
            sheetName = t("熔断器温度")+'(℃)';
            sheetHeader.push(t('数据项'));
            sheetFilter.push('label');
        }else{
            sheetName = t("极柱温度")+'(℃)';
            sheetHeader.push(t('数据项'));
            sheetFilter.push('label');
        }
        dateBottomStr?.map((it,i)=>{
        sheetHeader.push(it);
        sheetFilter.push(it)
        })
        // console.log('sheetData',sheetData)
        // console.log('sheetFilter',sheetFilter)
        // return
        downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader, sheetName)
    };

    const baseOption = {
        grid: {
            left: '3%',
            right: '5%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            icon: 'circle',
            // top: '5%',
            itemWidth: 6,
            itemGap: 20,
            textStyle: {
                color: token.smallTitleColor,
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
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: [token.microgridsLine], // 网格线颜色
                        width: 0.3, // 网格线宽度
                        type: 'solid' // 网格线类型
                    }
                },
            }
        ],
        dataZoom: [{type: "inside"}],
        toolbox: {
            show: true,
            right: 25,
            feature: {
                magicType: {type: ["line", "bar"], title: "", default: "line"},
                dataZoom: {
                    yAxisIndex: "none",
                },
                saveAsImage: {},
            },
        },
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: [token.microgridsLine], // 网格线颜色
                        width: 1, // 网格线宽度
                        type: 'solid' // 网格线类型
                    }
                },
            }
        ],
        series: []
    };
    const onChange = (value, selectedOptions) => {
        setValue(value);
    };
    const getOption=()=>{
        if(flag==0){
            return optionEchartVolBot;
        }else{
            return optionEchartTemBot;
        }
    };
    return (
        <>
            <div className={styles.advancedAnalytics}>
                <div className={styles.searchHead} style={{color: token.titleColor}}>
                    <span>{t('数据项')}:</span>
                    <Select
                        className={styles.margRL}
                        style={{width: "10%"}}
                        onChange={onChange}
                        options={options}
                        value={value}
                    >

                    </Select>
                    <span>{t('设备')}:</span>
                    <Select
                        style={{
                            width: "10%",
                        }}
                        className={styles.margRL}
                        placeholder="Please select"
                        value={bmsIds}
                        onChange={handleChange}
                        options={
                            optionBms?.map(it => {
                                return {
                                    label: it.name,
                                    value: it.id
                                }
                            })
                        }
                    />
                    <span>{t('电池PACK')}:</span>
                    <Select
                        className={styles.margRL}
                        style={{width: "10%"}}
                        onChange={(val, arr) => {
                            setPackValueBottom(val);
                            setVAndTExcelTitle(`${arr.label}/${cellList.find(it => it.value == cellReq)?.label}`);
                            console.log(`${arr.label}/${cellList.find(it => it.value == cellReq)?.label}`);
                        }}
                        options={packList}
                        defaultValue={[packList?.[0]?.value]}
                        key={packList?.[0]?.value}
                    >
                    </Select>
                    {
                        (value==0||value==1)&&
                        <>
                            <span>{t('电芯')}:</span>
                            <Select
                                className={styles.margRL}
                                style={{width: "10%"}}
                                onChange={(val, arr) => {
                                    setCellReq(val);
                                    setVAndTExcelTitle(`${packList.find(it => it.value == packValueBottom)?.label}/${arr.label}`);
                                    console.log(val, arr);
                                }}
                                options={cellList}
                                defaultValue={
                                    cellList?.[0]?.value
                                }
                                key={cellList?.[0]?.value}
                            >
                            </Select>
                        </>
                    }
                    <span>{t('日期')}:</span>
                    {/*<Tooltip title={t("最多选择3个日期")}>*/}
                        <DatePicker
                            needConfirm
                            multiple
                            className={styles.margRL}
                            style={{ width: 250 }}
                            onChange={(val, str) => {
                                setDateBottom(val);
                                setDateBottomStr(str);
                            }}
                            defaultValue={dateBottom}
                        />
                    {/*</Tooltip>*/}

                    <Button type="primary" className={styles.firstButton} onClick={getBottomChartData}>
                        {t('查询')}
                    </Button>
                    <Button type="primary" style={{backgroundColor: token.defaultBg}} onClick={downLoadVAndT}>
                    {t('导出')}{" "}Excel
                    </Button>
                </div>
                <div className={styles.echartPart}>
                    {/*<CardModel*/}
                    {/*    title={t('电压') + '(V)'}*/}
                    {/*    content={*/}
                    {/*        <div className={styles.echartPartCardwrap}>*/}
                    {/*            <ReactECharts layUpdate={false} notMerge={true} option={optionEchartVolBot}*/}
                    {/*                          style={{height: '100%'}}/>*/}
                    {/*        </div>*/}
                    {/*    }*/}
                    {/*/>*/}
                    <div className={styles.echartPartCardwrap}>
                        <ReactECharts layUpdate={false} notMerge={true} option={getOption()}
                                      style={{height: '100%'}}/>
                    </div>
                    {/*<CardModel*/}
                    {/*    title={t('温度') + '(℃)'}*/}
                    {/*    content={*/}
                    {/*        <div className={styles.echartPartCardwrap}>*/}
                    {/*            <ReactECharts layUpdate={false} notMerge={true} option={optionEchartTemBot}*/}
                    {/*                          style={{height: '100%'}}/>*/}
                    {/*        </div>*/}
                    {/*    }*/}
                    {/*/>*/}

                </div>
            </div>
        </>

    )
}

export default Com