// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { CardModel } from "@/components";
import useIcon from "@/hooks/useIcon";
import { useSelector, useIntl } from "umi";
import { theme, } from "antd";
import ReactECharts from "echarts-for-react";
import Light from '../../assets/svg/lightHome.svg'
import Img from '../react/Meta2d'
function OverView(props) {
    const { token } = theme.useToken();
    const Icon = useIcon();
    const [options, setOptions] = useState({});
    const [optionsPower, setOptionsPower] = useState({});
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
        // console.log('函数组件来咯')
        getOptions();
    }, [token])
    const electricityStatistics = [
        {
            value: '30041',
            label: '储能累计充电量',
            unit: 'kWh',
            color: '#F3DF2E'
        },
        {
            value: '27053',
            label: '储能累计放电量',
            unit: 'kWh',
            color: '#D53D3D'
        },
        {
            value: '8462',
            label: '光伏累计发电量',
            unit: 'kWh',
            color: '#3072E1'
        },
        {
            value: '12296',
            label: '充电桩累计充电量',
            unit: 'kWh',
            color: '#03B4B4'
        },
    ];
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
                t('储能日充'),
                t('储能日放'),
                t('光伏日发电量'),
                t('充电桩电量'),
                ],
                textStyle: {//图例文字的样式
                    color: token.titleColor,
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['2024-04-02','2024-04-03','2024-04-04','2024-04-05','2024-04-06'],
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
                    name: t('储能日充'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[0]

                        }
                    },
                    barWidth: '8%',
                    data: [1321,6317,6185,6401,6804]
                },
                {
                    name: t('储能日放'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[2]

                        }
                    },
                    barWidth: '8%',
                    data:[1173,5766.4,5610.14,5806.82,6179.07]
                },
                {
                    name: t('光伏日发电量'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[3]

                        }
                    },
                    barWidth: '8%',
                    data:[1145,1145,604.44,803.44,886.5,187.79]
                },
                {
                    name: t('充电桩电量'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[4]

                        }
                    },
                    barWidth: '8%',
                    data:[8755,4668,3622,5422,1233,4423,2236]
                },
                
            ]
        });
        setOptionsPower({
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
                t('储能'),
                t('电网'),
                t('光伏'),
                t('负载'),
                ],
                textStyle: {//图例文字的样式
                    color: token.titleColor,
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
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
                    name: t('储能'),
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: token.barColor[0]

                        }
                    },
                    data: [120,221,152,164,232,213,234,243,235,256,222,210,232,213,234,243,235,256,222,210,234,243,235,256,222,210]
                },
                {
                    name: t('电网'),
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: token.barColor[2]

                        }
                    },
                    data: [120,221,152,164,232,213,234,243,235,256,222,210,232,213,234,243,235,256,222,210,234,243,235,256,222,210]

                },
                {
                    name: t('光伏'),
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: token.barColor[3]

                        }
                    },
                    data: [120,221,152,164,232,213,234,243,235,256,222,210,232,213,234,243,235,256,222,210,234,243,235,256,222,210]

                },
                {
                    name: t('负载'),
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: token.barColor[4]

                        }
                    },
                    data: [120,221,152,164,232,213,234,243,235,256,222,210,232,213,234,243,235,256,222,210,234,243,235,256,222,210]

                },
                
            ]
        });
    };
    const profit = [
        {
            value: '5298',
            label: '今日收益',
            unit: '元',
            color: '#E9641C',
            icon: 'icon-qushi'
        },
        {
            value: '63372',
            label: '累计收益',
            unit: '元',
            color: '#03B4B4',
            icon: 'icon-qian'
        },
    ]

    return (
        <div className={styles.container} style={{color:token.titleColor}}>
            <div className={styles.imgPart} style={{backgroundColor:token.titleCardBgc}}>
                <Img />
                {/* <img src={Light} alt="" style={{}} /> */}
                
                 {/* <Light/> */}
            </div>
            <div className={styles.card}>
                <div className={styles.dataLeft} style={{ backgroundColor: token.titleCardBgc }}>
                    {electricityStatistics.map(it => {
                        return <>
                            <div className={styles.wrap} >
                                <div className={styles.value} >
                                    <span style={{ color: it.color }}>{it.value}</span>
                                    <span className={styles.unit}>{it.unit}</span>
                                </div>
                                <div className={styles.label}>
                                    {t(it.label)}
                                </div>
                            </div>
                        </>
                    })}
                </div>
                <div className={styles.dataRight} style={{ backgroundColor: token.titleCardBgc }}>
                    {
                        profit.map(it => {
                            return <>
                                <div className={styles.wrap} >
                                    <div className={styles.title}>
                                        <Icon
                                            type={it.icon}
                                            style={{
                                                fontSize: 20,
                                                color: it.color
                                            }}
                                        />
                                        {t(it.label)}
                                    </div>
                                    <div className={styles.value} >
                                            <span style={{color:it.color}}>{it.value}</span>
                                            <span className={styles.unit}>{it.unit}</span>

                                    </div>
                                </div>

                            </>
                        })

                    }

                </div>
                <div className={styles.echarLeft}>
                    <CardModel
                        title={t('电量统计')+'(kWh)'}
                        content={
                            <div className={styles.echartPartCardwrap}>
                            <ReactECharts option={options} style={{ height: '100%' }} />
                            </div>
                        }
                    />
                </div>
                <div className={styles.echarRight}>
                    <CardModel
                        title={t('功率')+'(kW)'}
                        content={
                            <div className={styles.echartPartCardwrap}>
                            <ReactECharts option={optionsPower} style={{ height: '100%' }} />
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default OverView