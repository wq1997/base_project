// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, DatePicker, Button, Cascader, message } from "antd";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import { CardModel } from "@/components";
import { getBmsAnalyticsInitData, analyticsBmsDiffData, analyticsBmsData } from '@/services/deviceTotal'
import dayjs from 'dayjs';
import { getQueryString } from "@/utils/utils";
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
    const [packReq, setPackReq] = useState([['0', '0-0']]);
    const [packList, setPackList] = useState([]);
    const [cellList, setCellList] = useState([]);
    const [cellReq, setCellReq] = useState(['0-0', '0-0-0']);
    const [optionEchartTem, setOptionEchartTem] = useState({})
    const [optionEchartVol, setOptionEchartVol] = useState({})
    const [optionEchartVolBot, setOptionEchartVolBot] = useState({})
    const [optionEchartTemBot, setOptionEchartTemBot] = useState({});


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
        getChartData();
        getBottomChartData();
    }, [token, id]);

    const getInitData = async () => {
        let { data } = await getBmsAnalyticsInitData({ id });
        setPackList(data?.data.packList);
        setCellList(data?.data.cellList)
    }
    const getChartData = async () => {
        let dataTypeList = [];
        let dateList = [];
        if (way === 1) {
            dataTypeList = packReq?.map(it => {
                return it[1];
            });
            dateList = [dateStr];
            if (dataTypeList.length > 3) {
                message.warning(t('最多选择3个对比项'));
                return
            }
        } else {
            dataTypeList = [packReq[1]];
            dateList = dateStr;
            if (dateList.length > 3) {
                message.warning(t('最多选择3个对比项'));
                return
            }
        }
        let { data } = await analyticsBmsDiffData({
            id,
            dataTypeList,
            dateList
        });
        let { tempInfo, volInfo } = data;
        handelData(volInfo, setOptionEchartVol, 1);
        handelData(tempInfo, setOptionEchartTem, 2);

    }
    const getBottomChartData = async () => {
        let { data } = await analyticsBmsData({
            id,
            dataType: cellReq[1],
            date: dateBottom.format('YYYY-MM-DD')
        });
        dealDataBot(data.data?.tData, setOptionEchartTemBot, t("温度"));
        dealDataBot(data.data?.vData, setOptionEchartVolBot, t("电压"));

    }
    const dealDataBot = (data, setHandel, title) => {
        let arr = [];
        data?.map(it => {
            arr.push([dayjs(it.time).format('HH:mm:ss'), it.value])
        })
        setHandel({
            ...baseOption, series: [{
                name: title,
                type: 'line',
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
                data: arr
            }]
        });

    }
    const handelData = (data, setHandel, val) => {
        let series = []
        data?.map((one, index) => {
            let seriesData = [];
            one.data?.map(it => {
                seriesData.push([
                    it.time,
                    it.diff,
                ])
            })
            series.push({
                name: one.date,
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
        })
        setHandel({
            ...baseOption,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: (params) => getToolTip(params, data, val),
            }, legend: { ...baseOption.legend, data: series?.map(item => item.name),
             }, series: [...series]
        });
    }
    const changePack = (val,la) => {
        setPackReq(val)
    }
    const changeWay = (val) => {
        setWay(val);
        setDate(dayjs(new Date()));
        setOptionEchartVol(baseOption);
        val === 1 ? setPackReq([['0', '0-0']]) : setPackReq(['0', '0-0']);
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
                      ${data[seriesIndex].date}：${time} <br/>
                      ${t('电压差')}：${diff||""} <br/>
                      ${t("最大电压")}：${maxPackValue||""} (${t(
                        "第"
                    )}${maxPackNo||""}${t("节")})<br/>
                      ${t("最小电压")}：${minPackValue||""} (${t(
                        "第"
                    )}${minPackNo||""}${t("节")})<br/>
                      </div>
                    `);
                } else {
                    text = text.concat(`
                    <div>
                      <span style="background:${color};width:10px;height:10px;border-radius:50%;display:inline-block"></span>
                      ${data[seriesIndex].date}：${time} <br/>
                      ${t('温差')}：${diff||""} <br/>
                      ${t("最高温度")}：${maxPackValue||""} (${t(
                        "采样点"
                    )}${maxPackNo||""})<br/>
                      ${t("最低温度")}：${minPackValue||""} (${t(
                        "采样点"
                    )}${minPackNo||""})<br/>
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
                color:token.smallTitleColor,
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
                    <Cascader
                        className={styles.margRL}
                        style={{ width: 240 }}
                        onChange={ changePack}
                        options={packList}
                        multiple={way === 1 ? true : false}
                        maxTagCount={1}
                        showCheckedStrategy={SHOW_CHILD}
                        defaultValue={[['0', '0-0']]}
                        key={way}
                        allowClear={false}
                    >
                    </Cascader>
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
                    <Button type="primary" style={{ backgroundColor: token.defaultBg }} >
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
                    <span >{t('PACK电芯')}:</span>
                    <Cascader
                        className={styles.margRL}
                        style={{ width: 240 }}
                        onChange={(val) => { setCellReq(val) }}
                        options={cellList}
                        showCheckedStrategy={SHOW_CHILD}
                        defaultValue={
                            ['0-0', '0-0-0']
                        }
                    >
                    </Cascader>
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
                    <Button type="primary" style={{ backgroundColor: token.defaultBg }} >
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