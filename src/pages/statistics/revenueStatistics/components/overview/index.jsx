import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DatePicker, Button, theme,Radio } from 'antd';
import dayjs from 'dayjs';
import styles from './index.less'
import {
    CalendarOutlined,
    DatabaseOutlined,
} from '@ant-design/icons';
import { CardModel } from "@/components";
import ReactECharts from "echarts-for-react";
import Table from '@/components/Table.jsx'
import { useSelector,useIntl } from "umi";

function Com(props) {
    const [optionsPie, setOptionsPie] = useState({})
    const { token } = theme.useToken();
    const [mode, setMode] = useState('date');
    const [options, setOptions] = useState({});
    const { theme: currentTheme } = useSelector(function (state) {
        return state.global
    });
    var  colorList=['#528AEB', '#F3CE55', '#03B4B4',];
    const intl = useIntl();
    const getTranslation=(id)=>{
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
            xAxis: [
                {
                    type: 'category',
                    data: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} kWh'
                    },

                }
            ],
            series: [
                {
                    name: '发电量',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.colorPrimary
                        }
                    },
                    barWidth: '60%',
                    data: [0.8, 1.6, 0.4, 2.2, 0.8, 1.2, 1.5, 1.7, 1.6]
                }
            ]
        });
        setOptionsPie({
            title: {
                text: '80',
                subtext: '总收益',
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
                top: "70%",
                left: '75%',
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
                                    case '光伏收益': str = '{a|}\n{nameStyle|光伏 }' + '{rate|' + params.value + '%}'; break;
                                    case '储能收益': str = '{b|}\n{nameStyle|储能 }' + '{rate|' + params.value + '%}'; break;
                                    case '充电桩收益': str = '{c|}\n{nameStyle|充电桩 }' + '{rate|' + params.value + '%}'; break;
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
                        { value: 50, name: '光伏收益' },
                        { value: 25, name: '储能收益' },
                        { value: 25, name: '充电桩收益' },
                    ]
                }
            ]
        })
    };
    const profitTable = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
            width: 100,
        },
        {
            title: '充电成本（元）',
            className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',
            children: [
                {
                    title: '尖电',
                    dataIndex: 'street',
                    key: 'street',
                    width: 150,
                },
                {
                    title: '峰电',
                    dataIndex: 'street',
                    key: 'street',
                    width: 150,
                },
                {
                    title: '平电',
                    dataIndex: 'street',
                    key: 'street',
                    width: 150,
                },
                {
                    title: '谷电',
                    dataIndex: 'street',
                    key: 'street',
                    width: 150,
                },
                {
                    title: '总计',
                    dataIndex: 'street',
                    key: 'street',
                    width: 150,
                },
            ],
        },
        {
            title: '放电收益（元）',
            className: currentTheme === 'default' ? 'lightTitleColorLeft' : 'darkTitleColorLeft',
            children: [
                {
                    title: '尖电',
                    dataIndex: 'street',
                    key: 'street',
                    width: 150,
                },
                {
                    title: '峰电',
                    dataIndex: 'street',
                    key: 'street',
                    width: 150,
                },
                {
                    title: '平电',
                    dataIndex: 'street',
                    key: 'street',
                    width: 150,
                },
                {
                    title: '谷电',
                    dataIndex: 'street',
                    key: 'street',
                    width: 150,
                },
                {
                    title: '总计',
                    dataIndex: 'street',
                    key: 'street',
                    width: 150,
                },

            ],
        },
        {
            title: '实际收益',
            dataIndex: 'date',
            key: 'date',
            width: 100,
        },

    ];

    const cardData = [
        {
            icon: <CalendarOutlined />,
            name: "平均收益",
            color: '#03B4B4',
            value: '10',
            unit: 'kWh'
        },
        {
            icon: <DatabaseOutlined />,
            name: "累计收益",
            color: '#FF9239',
            value: '9999',
            unit: 'kWh'
        },
    ]
    useEffect(() => {
        getOptions();
    }, []);
    const handleModelChange = e => {
        setMode(e.target.value);
    };
    return (
        <div className={styles.content}>
            <div className={styles.heard} style={{ backgroundColor: token.titleCardBgc }}>
            <div className={styles.date}>
                    <DatePicker picker={mode} style={{marginRight:"20px"}}/>
                    <Radio.Group value={mode} onChange={handleModelChange}>
                    <Radio.Button value="date">日</Radio.Button>
                    <Radio.Button value="month">月</Radio.Button>
                    <Radio.Button value="year">年</Radio.Button>
                </Radio.Group>
                </div>
                <div className={styles.buttons}>
                    <Button type="primary" className={styles.firstButton}>
                   { getTranslation('app.Query')}
                    </Button>
                    <Button type="primary" style={{ backgroundColor: token.defaultBg }} >
                        导出excel
                    </Button>
                </div>

            </div>
            <div className={styles.profitWrap}>
                <div className={styles.profitStaus}>
                    <CardModel
                        title={
                            "收益统计"
                        }
                        content={
                            <div className={styles.contentsWrap}>
                                <div className={styles.leftEchart}>
                                    <ReactECharts option={options} style={{ height: '100%' }} />
                                </div>
                                {/* <div className={styles.rightCardData} style={{ backgroundColor: token.titleCardBgc }}>
                                    {cardData.map((it) => {
                                        return <div className={styles.profitCard} style={{ color: it.color, backgroundColor: token.cardBgc, boxShadow: token.cardShadow }}>
                                            <div className={styles.cardItemTitle}>
                                                {it.icon}
                                                <span style={{ color: token.smallTitleColor, fontWeight: 500, fontSize: '16px', marginLeft: '3px' }}>{it.name}</span>
                                            </div>
                                            <div className={styles.cardItemVaue} style={{ color: token.titleColor }}>
                                                {it.value}
                                                <span style={{ color: token.smallTitleColor, fontSize: '16px', fontWeight: 400, marginLeft: '10px' }}>{it.unit}</span>
                                            </div>
                                        </div>
                                    })}

                                </div> */}
                                <div className={styles.profitPie} style={{ backgroundColor: token.titleCardBgc }}>
                                    <ReactECharts option={optionsPie} style={{ height: '100%' }} />
                                </div>

                            </div>
                        }
                    />

                </div>

            </div>

            <div className={styles.profitList}>
                <CardModel
                    title={
                        "收益明细"
                    }
                    content={
                        <Table
                            columns={profitTable}
                        // data={data.records}
                        />
                    }
                />
            </div>
        </div>
    )
}

export default Com