// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, DatePicker, Button, Cascader, message } from "antd";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import { CardModel } from "@/components";
import { getBmsAnalyticsInitData, analyticsBmsDiffData, analyticsBmsData, getBmsDevList } from '@/services/deviceTotal'
import dayjs from 'dayjs';
import { getQueryString, downLoadExcelMode } from "@/utils/utils";
import { useSelector, useIntl } from "umi";
const { SHOW_CHILD } = Cascader;
function Com(props) {
    const { token } = theme.useToken();
    const [option, setOption] = useState([]);
    const [dateBottom, setDateBottom] = useState(dayjs(new Date()));
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

    const intl = useIntl();

    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }



    useEffect(() => {
        dataInit();
    }, []);
    const dataInit = async () => {
        let { data = {} } = await getBmsDevList({
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
        let { data } = await getBmsAnalyticsInitData({ id: bmsIds[0] });
        setPackList(data?.data?.clusterPackList);
        setCellList(data?.data?.cellList);
        setPackValueBottom(data?.data?.clusterPackList?.[0]?.value);
        setCellReq(data?.data?.cellList?.[0]?.value)
        getBottomChartData();
        setVAndTExcelTitle(`${data?.data?.clusterPackList?.[0]?.label}/${data?.data?.cellList?.[0]?.label}`)
    }
 
    const getBottomChartData = async () => {
        let { data } = await analyticsBmsData({
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
        ser.push(dealTemp(data.data?.temp, t("采样点温度"), 0));
        ser.push(dealTemp(data.data?.leftTemp, t("左侧熔断器温度"), 1));
        ser.push(dealTemp(data.data?.rightTemp, t("右侧熔断器温度"), 2));
        ser.push(dealTemp(data.data?.negativeTemp, t("负极极柱温度"), 3));
        ser.push(dealTemp(data.data?.positiveTemp, t("正极极柱温度"), 4));
        setOptionEchartTemBot({
            ...baseOption,
            series: [...ser]
        })
        dealDataBot(data.data?.vol, setOptionEchartVolBot, t("电压"));

    }
    const dealDataBot = (data, setHandel, title) => {
        let arr = [];
        data?.map((it, index) => {
            arr.push([dayjs(it.time).format('HH:mm:ss'), it.value]);
        });
        setHandel({
            ...baseOption, series: [...(option?.series || []), {
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
        let sheetName = dateBottom.format('YYYY-MM-DD');
        let sheetFilter = ['time', 'volInfo', 'tempInfo', 'leftTemp', 'rightTemp', 'negativeTemp', 'positiveTemp'];
        let sheetHeader = [t("时间"), `${t('电压')}V`, `${t('采样点温度')}℃`, `${t('左侧熔断器温度')}℃`, `${t('右侧熔断器温度')}℃`, `${t('负极极柱温度')}℃`, `${t('正极极柱温度')}℃`];
        downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader, sheetName)
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
            top: '5%',
            left: '5%',
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
            }
        ],
        series: []
    }
    return (
        <>
            <div className={styles.advancedAnalytics}>
                <div className={styles.searchHead}>
                <span >{t('设备')}:</span>
                    <Select
                        style={{
                            width: '10.4167rem',
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
                    <span >{t('电池PACK')}:</span>
                    <Select
                        className={styles.margRL}
                        style={{ width: 240 }}
                        onChange={(val, arr) => { setPackValueBottom(val); setVAndTExcelTitle(`${arr.label}/${cellList.find(it => it.value == cellReq)?.label}`); console.log(`${arr.label}/${cellList.find(it => it.value == cellReq)?.label}`); }}
                        options={packList}
                        defaultValue={[packList?.[0]?.value]}
                        key={packList?.[0]?.value}
                    >
                    </Select>
                    <span >{t('电芯')}:</span>
                    <Select
                        className={styles.margRL}
                        style={{ width: 240 }}
                        onChange={(val, arr) => { setCellReq(val); setVAndTExcelTitle(`${packList.find(it => it.value == packValueBottom)?.label}/${arr.label}`); console.log(val, arr); }}
                        options={cellList}
                        defaultValue={
                            cellList?.[0]?.value
                        }
                        key={cellList?.[0]?.value}

                    >
                    </Select>
                    <span >{t('对比日期')}:</span>
                    <DatePicker
                        className={styles.margRL}
                        style={{ width: 240 }}
                        onChange={(val, str) => { setDateBottom(val); }}
                        defaultValue={dateBottom}
                    />
                    <Button type="primary" className={styles.firstButton} onClick={getBottomChartData}>
                        {t('查询')}
                    </Button>
                    <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={downLoadVAndT}>
                        {t('导出')}{" "}Excel
                    </Button>
                </div>
                <div className={styles.echartPart}>
                    <CardModel
                        title={t('电压') + '(V)'}
                        content={
                            <div className={styles.echartPartCardwrap}>
                                <ReactECharts layUpdate={false} notMerge={true} option={optionEchartVolBot} style={{ height: '100%' }} />
                            </div>
                        }
                    />
                    <CardModel
                        title={t('温度') + '(℃)'}
                        content={
                            <div className={styles.echartPartCardwrap}>
                                <ReactECharts layUpdate={false} notMerge={true} option={optionEchartTemBot} style={{ height: '100%' }} />
                            </div>
                        }
                    />

                </div>
            </div>
        </>

    )
}

export default Com