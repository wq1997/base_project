import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DatePicker, Button, theme, Radio, Table } from 'antd';
import dayjs from 'dayjs';
import styles from './index.less'
import { CardModel } from "@/components";
import ReactECharts from "echarts-for-react";
import { downloadFile } from '@/utils/utils'
import { useSelector, useIntl } from "umi";
import { getEnergyFeeByTime, getEarningsDistribution } from '@/services/report'
import {  downLoadExcelMode } from "@/utils/utils";

function Com(props) {
    const [optionsPie, setOptionsPie] = useState({})
    const { token } = theme.useToken();
    const [mode, setMode] = useState('date');
    const [options, setOptions] = useState({});
    const [format, setFormat] = useState('YYYY-MM-DD');
    const [data, setData] = useState([]);
    const [dateX, setDateX] = useState([]);
    const [time, setTime] = useState(dayjs(new Date()));
    const [dataY, setDataY] = useState({
        totalEarning: [],
        pvEarning: [],
        energyEarning: [],
        chargeEarning: []
    });
    const [pieData, setPieData] = useState();

    const { theme: currentTheme } = useSelector(function (state) {
        return state.global
    });
    var colorList = ['#528AEB', '#F3CE55', '#03B4B4',];
    const intl = useIntl();
    const getTranslation = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const getOptions = () => {
        setOptions({
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
            legend: {
                data: [
                getTranslation('总收益'),
                getTranslation('光伏收益'),
                getTranslation('储能收益'),
                getTranslation('充电桩收益'),
                ],
                textStyle: {//图例文字的样式
                    color: token.titleColor,
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: dateX,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    },

                }
            ],
            series: [
                {
                    name: getTranslation('总收益'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[0]

                        }
                    },
                    barWidth: '8%',
                    data: dataY.totalEarning
                },
                {
                    name: getTranslation('光伏收益'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[2]

                        }
                    },
                    barWidth: '8%',
                    data: dataY.pvEarning
                },
                {
                    name: getTranslation('储能收益'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[3]

                        }
                    },
                    barWidth: '8%',
                    data: dataY.energyEarning
                },
                {
                    name: getTranslation('充电桩收益'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[4]

                        }
                    },
                    barWidth: '8%',
                    data: dataY.chargeEarning
                },

            ]
        });
        setOptionsPie({
            title: {
                text: pieData?.totalEarning,
                subtext: getTranslation('总收益'),
                x: 'center',
                y: 'center',
                textStyle: {
                    fontSize: '30px',
                    fontWeight: 500,
                    color: token.titleColor
                },
                subtextStyle: {
                    color: token.titleColor,
                    fontSize: '12px',
                },
            },
            legend: {
                show: true,
                icon: "circle",
                top: "55%",
                left: '80%',
                width: 50,
                padding: [0, 5],
                itemGap: 25,
                textStyle: {
                    color: token.smallTitleColor,
                    rich: {
                        title: {
                            fontSize: 16,
                            lineHeight: 15,
                            color: token.smallTitleColor
                        },
                        value: {
                            fontSize: 18,
                            lineHeight: 20,
                            color: token.smallTitleColor
                        }
                    }
                },
            },
            series: [
                {

                    radius: ['40%', '70%'],
                    center: ['50%', '50%'],
                    type: 'pie',
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 5,
                            length2: 12,
                            lineStyle: {
                                color: token.smallTitleColor
                            },
                            align: 'right'
                        },
                        color: token.smallTitleColor,
                        emphasis: {
                            show: true
                        }
                    },
                    label: {
                        normal: {
                            formatter: function (params) {
                                var str = '';
                                switch (params.name) {
                                    case '光伏收益': str = '{a|}\n{nameStyle|' + getTranslation('光伏') + '}' + '{rate|' + params.value + '%}'; break;
                                    case '储能收益': str = '{b|}\n{nameStyle|' + getTranslation('储能') + '}' + '{rate|' + params.value + '%}'; break;
                                    case '充电桩收益': str = '{c|}\n{nameStyle|' + getTranslation('充电桩') + '}' + '{rate|' + params.value + '%}'; break;
                                }
                                return str
                            },
                            padding: [0, -10],
                            rich: {
                                nameStyle: {
                                    fontSize: 12,
                                    color: token.smallTitleColor,
                                    align: 'left'
                                },
                                rate: {
                                    fontSize: 12,
                                    color: token.smallTitleColor,
                                    align: 'left'
                                }
                            }
                        }
                    },
                    data: [
                        { value: (pieData?.pvProportion * 100).toFixed(2), name: '光伏收益' },
                        { value: (pieData?.energyProportion * 100).toFixed(2), name: '储能收益' },
                        { value: (pieData?.chargeProportion * 100).toFixed(2), name: '充电桩收益' },
                    ]
                }
            ]
        })
    };
    const profitTable = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (text, record, index) => index + 1,
        },

        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
            width: 100,
            // render:(val)=>{
            //     return val ? dayjs(val).format('YYYY-MM-DD') : ''
            // }
        },
        {
            title: '储能收益',
            dataIndex: 'energyEarning',
            key: 'energyEarning',
            width: 100,
        },
        {
            title: '光伏收益',
            dataIndex: 'pvEarning',
            key: 'pvEarning',
            width: 100,
        },
        {
            title: '充电桩收益',
            dataIndex: 'chargeEarning',
            key: 'chargeEarning',
            width: 100,
        },
        {
            title: '总收益',
            dataIndex: 'totalEarning',
            key: 'totalEarning',
            width: 100,
        },


    ];
    const [scrollY, setScrollY] = useState('');
    useEffect(() => {
        const Y = document.getElementById('table')?.clientHeight;
        if (Y) setScrollY(Y - 180); // 32为表头的高，应用时减去自己表格的表头高
    }, []);
    useEffect(() => {
        getOptions();
    }, [dateX, dataY, currentTheme, pieData]);
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        let httpData = {
            time: time.format(format),
            type: mode === 'date' ? 0 : mode === 'month' ? 2 : 3,
            plantId: localStorage.getItem('plantId'),
        }
        let arrX = [];
        let chargeEarning = [];
        let energyEarning = [];
        let pvEarning = [];
        let totalEarning = [];
        let { data } = await getEnergyFeeByTime(httpData);
        data?.data.map((it,i) => {
            totalEarning.push(it.totalEarning);
            pvEarning.push(it.pvEarning);
            energyEarning.push(it.energyEarning);
            chargeEarning.push(it.chargeEarning);
            it.date=dayjs(time).subtract(data?.data?.length-i, 'day').format('YYYY-MM-DD')
            arrX.push(it?.date);
        })
        setData(data.data);
        setDateX(arrX);
        setDataY({ chargeEarning, energyEarning, pvEarning, totalEarning })
        let { data: pieData } = await getEarningsDistribution(httpData);
        setPieData(pieData.data)

    }
    const downLoadExcelModel = () => {
        let fileName = getTranslation('收益统计');
        let sheetData = data;
        let sheetFilter = ['date', 'totalEarning', 'energyEarning','pvEarning','chargeEarning',];
        let sheetHeader = [getTranslation("日期"),getTranslation("总收益"),getTranslation("储能收益"),getTranslation("光伏收益"), getTranslation("充电桩收益"),];
        downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader,getTranslation('总览'))
    };
    const queryData = () => {
        getData();
        getOptions();
    }
    const handleModelChange = e => {
        setMode(e.target.value);
        if (e.target.value == 'date') {
            setFormat('YYYY-MM-DD');
        }
        else if (e.target.value === 'month') {
            setFormat('YYYY-MM');
        } else {
            setFormat('YYYY');
        }
    };
  const disabledDate = (current) => { return current && current > dayjs().endOf('day') }

    return (
        <div className={styles.content}>
            <div className={styles.heard} style={{ backgroundColor: token.titleCardBgc }}>
                <div className={styles.date}>
                    <DatePicker onChange={(val)=>setTime(val)} picker={mode} defaultValue={time} 
                    disabledDate={disabledDate}
                    style={{ marginRight: "20px" }} />
                    <Radio.Group value={mode} onChange={handleModelChange}>
                        <Radio.Button value="date">日</Radio.Button>
                        <Radio.Button value="month">月</Radio.Button>
                        <Radio.Button value="year">年</Radio.Button>
                    </Radio.Group>
                </div>
                <div className={styles.buttons}>
                    <Button type="primary" className={styles.firstButton} onClick={queryData}>
                        {getTranslation('查询')}
                    </Button>
                    <Button type="primary" style={{ backgroundColor: token.defaultBg }}
                        onClick={
                            downLoadExcelModel
                       }
                    >
                        导出excel
                    </Button>
                </div>

            </div>
            <div className={styles.profitWrap}>
                <div className={styles.profitStaus}>
                    <CardModel
                        title={
                            "收益统计(元)"
                        }
                        content={
                            <div className={styles.contentsWrap}>
                                <div className={styles.leftEchart}>
                                    <ReactECharts option={options} style={{ height: '100%' }} />
                                </div>
                                {/* <div className={styles.profitPie} style={{ backgroundColor: token.titleCardBgc }}>
                                    <ReactECharts option={optionsPie} style={{ height: '100%' }} />
                                </div> */}

                            </div>
                        }
                    />

                </div>

            </div>

            <div className={styles.profitList} id="table">
                <CardModel
                    title={
                        "收益明细"
                    }
                    content={
                        <Table
                            columns={profitTable}
                            dataSource={data}
                            scroll={{
                                y: scrollY,
                            }}
                        />
                    }
                />
            </div>
        </div>
    )
}

export default Com