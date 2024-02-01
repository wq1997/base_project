import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DatePicker, Button, theme, Radio } from 'antd';
import dayjs from 'dayjs';
import styles from './index.less'
import { CardModel } from "@/components";
import ReactECharts from "echarts-for-react";
import { useSelector, FormattedMessage, useIntl } from "umi";
import {getEnergyFeeByTime} from '@/services/report'
function Com(props) {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const [mode, setMode] = useState('date');
    const [time, setTime] = useState(dayjs(new Date()));
    const [format, setFormat] = useState('YYYY-MM-DD');
    const { theme: currentTheme } = useSelector(function (state) {
        return state.global
    });
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
                data: [getTranslation('statistics.InternetPower'),
                getTranslation('statistics.TheGridBuysElectricity'),
                getTranslation('statistics.EnergyStorageCharge'),
                getTranslation('statistics.EnergyStorageDischarge'),
                getTranslation('statistics.PhotovoltaicPowerGeneration'),
                getTranslation('statistics.TheAmountOfCharging'),
                ],
                textStyle: {//图例文字的样式
                    color: token.titleColor,
                }
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
                    name: getTranslation('statistics.InternetPower'),
                    // label: <FormattedMessage id='statistics.InternetPower' />,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[0]

                        }
                    },
                    barWidth: '8%',
                    data: [0.8, 1.1, 0.4, 2.2, 0.8, 1.2, 1.5, 1.7, 1.6]
                },
                {
                    name: getTranslation('statistics.TheGridBuysElectricity'),
                    // label:<FormattedMessage id='statistics.TheGridBuysElectricity' />,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[1]

                        }
                    },
                    barWidth: '8%',
                    data: [0.8, 1.6, 0.4, 2.2, 0.8, 1.2, 1.5, 1.7, 1.6]
                },
                {
                    name: getTranslation('statistics.EnergyStorageCharge'),
                    // label: <FormattedMessage id='statistics.EnergyStorageCharge' />,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[2]

                        }
                    },
                    barWidth: '8%',
                    data: [0.8, 1.6, 0.4, 2.2, 0.8, 1.2, 1.5, 1.7, 1.6]
                },
                {
                    name: getTranslation('statistics.EnergyStorageDischarge'),
                    // label: <FormattedMessage id='statistics.EnergyStorageDischarge' />,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[3]

                        }
                    },
                    barWidth: '8%',
                    data: [0.8, 1.6, 0.4, 2.2, 0.8, 1.2, 1.5, 1.7, 1.6]
                },
                {
                    name: getTranslation('statistics.PhotovoltaicPowerGeneration'),
                    // label: <FormattedMessage id='statistics.PhotovoltaicPowerGeneration' />,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[4]

                        }
                    },
                    barWidth: '8%',
                    data: [0.8, 1.6, 0.4, 2.2, 0.8, 1.2, 1.5, 1.7, 1.6]
                },
                {
                    name: getTranslation('statistics.TheAmountOfCharging'),
                    // label:<FormattedMessage id='statistics.TheAmountOfCharging' />,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[5]
                        }
                    },
                    barWidth: '8%',
                    data: [0.8, 1.6, 0.4, 2.2, 0.8, 1.2, 1.5, 1.7, 1.6]
                }
            ]
        });

    };
    const getData=async()=>{
        let httpData={
            startTime: mode==='date'?time:null,
            endTime: mode==='date'?time:null,
            time:mode==='date'?null:time.format(format),
            type:mode==='date'?0:mode==='month'?2:3,
            plantId:localStorage.getItem('plantId'),
            // valueType:
        }
        let {data}=await getEnergyFeeByTime(httpData);
    }

    useEffect(() => {
        getOptions();
    }, [currentTheme]);
    const handleModelChange = e => {
        setMode(e.target.value);
        if (e.target.value == 'date') {
            setFormat('YYYY-MM-DD');
        } 
        else if (e.target.value ==='month') {
            setFormat('YYYY-MM');
        } else {
            setFormat('YYYY');
        }
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
            title: '上网电量',
            dataIndex: 'date',
            key: 'date',
            width: 100,
        },
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
            width: 100,
        },
      
      

    ];
    return (
        <div className={styles.content}>
            <div className={styles.heard} style={{ backgroundColor: token.titleCardBgc }}>
                <div className={styles.date}>
                    <DatePicker picker={mode}  defaultValue={time} format={format} style={{ marginRight: "20px" }}  />
                    <Radio.Group value={mode} onChange={handleModelChange}>
                        <Radio.Button value="date">日</Radio.Button>
                        <Radio.Button value="month">月</Radio.Button>
                        <Radio.Button value="year">年</Radio.Button>
                    </Radio.Group>
                </div>

                <div className={styles.buttons}>
                    <Button type="primary" className={styles.firstButton} onClick={getData}>
                        <FormattedMessage id='app.Query' />
                    </Button>
                    <Button type="primary" style={{ backgroundColor: token.defaultBg }} >
                        <FormattedMessage id='app.Export' />excel
                    </Button>
                </div>

            </div>
            <div className={styles.profitWrap}>
                <div className={styles.profitStaus}>
                    <CardModel
                        title={
                            <FormattedMessage id='app.ElectricityStatistics' />
                        }
                        content={
                            <ReactECharts option={options} style={{ height: '100%' }} />
                        }
                    />

                </div>

            </div>

        </div>
    )
}

export default Com