import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DatePicker, Button, theme } from 'antd';
import dayjs from 'dayjs';
import styles from './index.less'
import {
    CalendarOutlined,
    DatabaseOutlined,
} from '@ant-design/icons';
import { CardModel } from "@/components";
import ReactECharts from "echarts-for-react";
import { useSelector,FormattedMessage,useIntl  } from "umi";

function Com(props) {
    const { RangePicker } = DatePicker;
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const { theme: currentTheme } = useSelector(function (state) {
        return state.global
    });
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
            legend: {
                data: [getTranslation('statistics.InternetPower'), 
                getTranslation('statistics.TheGridBuysElectricity'),
                getTranslation('statistics.EnergyStorageCharge'), 
                getTranslation('statistics.EnergyStorageDischarge'), 
                getTranslation('statistics.PhotovoltaicPowerGeneration'),
                getTranslation('statistics.TheAmountOfCharging'),
            ]

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
                    name:getTranslation('statistics.InternetPower'),
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
                    name:getTranslation('statistics.TheGridBuysElectricity'),
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
                    name:getTranslation('statistics.EnergyStorageCharge'),
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
                    name:getTranslation('statistics.EnergyStorageDischarge'),
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
                    name:getTranslation('statistics.PhotovoltaicPowerGeneration'),
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
                    name:getTranslation('statistics.TheAmountOfCharging'),
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
    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };
    return (
        <div className={styles.content}>
            <div className={styles.heard} style={{ backgroundColor: token.titleCardBgc }}>
                <div>
                    <RangePicker disabledDate={disabledDate} />
                </div>
                <div className={styles.buttons}>
                    <Button type="primary" className={styles.firstButton}>
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