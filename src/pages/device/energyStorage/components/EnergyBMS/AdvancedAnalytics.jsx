// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, DatePicker, Button, Cascader, message } from "antd";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import { CardModel } from "@/components";
import { getBmsAnalyticsInitData, analyticsBmsDiffData, analyticsBmsData } from '@/services/deviceTotal'
import dayjs from 'dayjs';
import { getQueryString, downLoadExcelMode } from "@/utils/utils";
import { useSelector, useIntl } from "umi";
const { SHOW_CHILD } = Cascader;
function Com(props) {
    const { token } = theme.useToken();
    const [option, setOption] = useState([]);
    const [way, setWay] = useState(1);
    const id = getQueryString('id') || 0;
    const [date, setDate] = useState(dayjs(new Date()));
    const [dateStr, setDateStr] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [dateBottom, setDateBottom] = useState(dayjs(new Date()));
    const [packReq, setPackReq] = useState([]);
    const [packList, setPackList] = useState([]);
    const [cellList, setCellList] = useState([]);
    const [cellReq, setCellReq] = useState([]);
    const [optionEchartTem, setOptionEchartTem] = useState({})
    const [optionEchartVol, setOptionEchartVol] = useState({})
    const [optionEchartVolBot, setOptionEchartVolBot] = useState({})
    const [optionEchartTemBot, setOptionEchartTemBot] = useState({});
    const [vAndTExcelTitle, setVAndTExcelTitle] = useState('');
    const [vAndTExcelData, setVAndTExcelData] = useState([]);
    const [diffData, setDiffData] = useState({});
    const [packValueBottom, setPackValueBottom] = useState();


    const intl = useIntl();

    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const wayOption = [{
        label: t('相同时间 不同数据项'),
        value: 1,
    },
    {
        label: t('不同时间  相同数据项'),
        value: 2,
    },]



    const initOption = () => {
        setOptionEchartTem(baseOption);
    };
    useEffect(() => {
        initOption();
        getInitData();
    }, [token, id]);
    useEffect(() => {
        getChartData();
    }, [packReq]);
    useEffect(() => {
        getBottomChartData();

    }, [packValueBottom, cellReq]);
    const getInitData = async () => {
        let { data } = await getBmsAnalyticsInitData({ id });
        setPackList(data?.data?.clusterPackList);
        setCellList(data?.data.cellList);
        setPackReq([data?.data?.clusterPackList?.[0]?.value]);
        setPackValueBottom(data?.data?.clusterPackList?.[0]?.value);
        setCellReq(data?.data.cellList?.[0]?.value)
        getChartData();
        getBottomChartData();
        setVAndTExcelTitle(`${data?.data?.clusterPackList?.[0]?.label}/${data?.data?.cellList?.[0]?.label}`)
    }
    const getChartData = async () => {
        let dataTypeList = [];
        let dateList = [];
        if (way === 1) {
            dataTypeList = packReq;
            dateList = [dateStr];
            if (dataTypeList.length > 3) {
                message.warning(t('最多选择3个对比项'));
                return
            }
        } else {
            dataTypeList = [packReq];
            dateList = dateStr;
            if (dateList.length > 3) {
                message.warning(t('最多选择3个对比项'));
                return
            }
        }
        let { data } = await analyticsBmsDiffData({
            packValue: dataTypeList,
            dateList,
            type: way == 1 ? 2 : 1
        });
        let { tempDiff, volDiff } = data?.data;
        handelData(volDiff, setOptionEchartVol, 1);
        handelData(tempDiff, setOptionEchartTem, 2);
        setDiffData(data?.data);
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
                time: dayjs(it.time).format('HH:mm') ,
                tempInfo: it.value,
                volInfo: data.data?.vol[index]?.value,
                leftTemp:data.data?.leftTemp[index]?.value,
                rightTemp:data.data?.rightTemp[index]?.value,
                negativeTemp:data.data?.negativeTemp[index]?.value,
                positiveTemp:data.data?.positiveTemp[index]?.value,
            })
        });
        setVAndTExcelData([...excelArr]);
        let ser = [];
        ser.push(dealTemp(data.data?.temp, t("采样点温度"),0));
        ser.push(dealTemp(data.data?.leftTemp, t("左侧熔断器温度"),1));
        ser.push(dealTemp(data.data?.rightTemp, t("右侧熔断器温度"),2));
        ser.push(dealTemp(data.data?.negativeTemp, t("负极极柱温度"),3));
        ser.push(dealTemp(data.data?.positiveTemp, t("正极极柱温度"),4));
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
    const dealTemp = (data, title,i) => {
        let arr = [];
        data?.map((it, index) => {
            arr.push([dayjs(it.time).format('HH:mm:ss'), it.value]);
        });
        return( {
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
    let sheetFilter = ['time', 'volInfo', 'tempInfo','leftTemp','rightTemp','negativeTemp','positiveTemp'];
    let sheetHeader = [t("时刻"), `${t('电压')}V`, `${t('采样点温度')}℃`,`${t('左侧熔断器温度')}℃`,`${t('右侧熔断器温度')}℃`,`${t('负极极柱温度')}℃`,`${t('正极极柱温度')}℃`];
    downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader, sheetName)
};
const downLoadVAndTDiff = () => {
    var option = {
        datas: []
    };
    option.fileName = t('温差压差');
    diffData?.tempDiff?.map((item, index) => {
        let data = [];
        item?.data?.map((it, i) => {
            data.push({
                time: it.time,
                tempInfo: it?.diff,
                volInfo: diffData?.volDiff[index]?.data[i]?.diff,
            })
        })
        option.datas.push({
            sheetData: data,
            sheetName: item?.desc,
            sheetFilter: ['time', 'volInfo', 'tempInfo'],
            sheetHeader: [t("时刻"), `${t('压差')}V`, `${t('温差')}℃`],
            columnWidths: ['8', '4'],
        })
    })
    const ExportJsonExcel = require("js-export-excel");
    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
}
const handelData = (data, setHandel, val) => {
    let series = [];
    data?.map((one, index) => {
        let seriesData = [];
        one.data?.map(it => {
            seriesData.push([
                it.time,
                it.diff,
            ])
        })
        series.push({
            name: one.desc,
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
            data: seriesData
        })
        console.log(series?.map(item => item.name), 111111);

    });
    setHandel({
        ...baseOption,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: (params) => getToolTip(params, data, val),
        }, legend: {
            ...baseOption.legend, data: series?.map(item => item.name),
        }, series: [...series]
    });
}
const changePack = (val, la) => {
    setPackReq(val);
}
const changeWay = (val) => {
    setWay(val);
    setDate(dayjs(new Date()));
    setOptionEchartVol(baseOption);
    val === 1 ? setPackReq([packList?.[0]?.value]) : setPackReq(packList?.[0]?.value);
    val === 1 ? setDateStr(dayjs(new Date()).format('YYYY-MM-DD')) : setDateStr([dayjs(new Date()).format('YYYY-MM-DD')]);
    getChartData();
}
const changeDate = (val, str) => {
    setDateStr(str);
    setDate(val);
}
const getToolTip = (params, data, val) => {
    let text = '';
    if (data.length == params.length) {
        params?.forEach(({ seriesName, dataIndex, seriesIndex, color }) => {
            let {
                diff,
                maxPackNo,
                maxPackValue,
                minPackNo,
                minPackValue,
                time,
            } = data[seriesIndex].data[dataIndex];
            if (val === 1) {
                text = text.concat(`
                    <div>
                      <span style="background:${color};width:10px;height:10px;border-radius:50%;display:inline-block"></span>
                      ${data[seriesIndex].desc}：${time} <br/>
                      ${t('电压差')}：${diff || ""} <br/>
                      ${t("最大电压")}：${maxPackValue || ""} (${t(
                    "第"
                )}${maxPackNo || ""}${t("节")})<br/>
                      ${t("最小电压")}：${minPackValue || ""} (${t(
                    "第"
                )}${minPackNo || ""}${t("节")})<br/>
                      </div>
                    `);
            } else {
                text = text.concat(`
                    <div>
                      <span style="background:${color};width:10px;height:10px;border-radius:50%;display:inline-block"></span>
                      ${data[seriesIndex].desc}：${time} <br/>
                      ${t('温差')}：${diff || ""} <br/>
                      ${t("最高温度")}：${maxPackValue || ""} (${t(
                    "采样点"
                )}${maxPackNo || ""})<br/>
                      ${t("最低温度")}：${minPackValue || ""} (${t(
                    "采样点"
                )}${minPackNo || ""})<br/>
                      </div>
                    `);
            }

        })

        return text
    }

}
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
                <span >{t('对比方式')}:</span>
                <Select
                    className={styles.margRL}
                    style={{ width: 180 }}
                    onChange={(val) => changeWay(val)}
                    options={wayOption}
                    defaultValue={wayOption[0].value}

                >
                </Select>
                <span >{t('电池pack')}:</span>
                <Select
                    className={styles.margRL}
                    style={{ width: 240 }}
                    onChange={changePack}
                    options={packList}
                    mode={way === 1 ? 'multiple' : null}
                    maxTagCount={1}
                    defaultValue={[packList?.[0]?.value]}
                    key={`${way}${packList?.[0]?.value}`}
                    allowClear={false}
                >
                </Select>
                <span >{t('对比日期')}:</span>
                <DatePicker className={styles.margRL}
                    style={{ width: 240 }}
                    multiple={way === 1 ? false : true}
                    maxTagCount={1}
                    onChange={(val, str) => changeDate(val, str)}
                    defaultValue={date}
                    key={way + 1}
                    allowClear={false}
                    needConfirm

                />
                <Button type="primary" className={styles.firstButton} onClick={getChartData}>
                    {t('查询')}
                </Button>
                <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={downLoadVAndTDiff}>
                    {t('导出')}excel
                </Button>
            </div>
            <div className={styles.echartPart}>
                <CardModel
                    title={t('压差') + '(V)'}
                    content={
                        <div className={styles.echartPartCardwrap}>
                            <ReactECharts layUpdate={false} notMerge={true} option={optionEchartVol} style={{ height: '100%' }} />
                        </div>
                    }
                />
                <CardModel
                    title={t('温差') + '(℃)'}
                    content={
                        <div className={styles.echartPartCardwrap}>
                            <ReactECharts layUpdate={false} notMerge={true} option={optionEchartTem} style={{ height: '100%' }} />
                        </div>
                    }
                />

            </div>
        </div>
        <div className={styles.advancedAnalytics}>
            <div className={styles.searchHead}>
                <span >{t('电池PACK')}:</span>
                <Select
                    className={styles.margRL}
                    style={{ width: 240 }}
                    onChange={(val, arr) => { setPackValueBottom(val); setVAndTExcelTitle(`${arr.label}/${cellList.find(it=>it.value==cellReq)?.label}`); console.log(`${arr.label}/${cellList.find(it=>it.value==cellReq)?.label}`); }}
                    options={packList}
                    defaultValue={[packList?.[0]?.value]}
                    key={packList?.[0]?.value}
                >
                </Select>
                <span >{t('电芯')}:</span>
                <Select
                    className={styles.margRL}
                    style={{ width: 240 }}
                    onChange={(val, arr) => { setCellReq(val); setVAndTExcelTitle(`${packList.find(it=>it.value==packValueBottom)?.label}/${arr.label}`); console.log(val, arr); }}
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
                    {t('导出')}excel
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