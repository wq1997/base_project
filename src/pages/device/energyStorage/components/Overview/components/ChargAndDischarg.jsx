import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme } from 'antd';
import ReactECharts from "echarts-for-react";
import {  useIntl } from "umi";

function Com(props) {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const intl = useIntl();
    const t = (id) => {
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
                data: [t('并网点')+1,t('并网点')+2,t('并网点')+3],
                textStyle:{
                    color: token.titleColor//字体颜色
                    },
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
                        // formatter: '{value} kWh'
                    },

                }
            ],
            series: [
                {
                    name:t('并网点')+1,
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: token.barColor[0]

                        }
                    },
                    data: [0.8, 1.1, 0.4, 2.2, 0.8, 1.2, 1.5, 1.7, 1.6]
                },
                {
                    name:t('并网点')+2,
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: token.barColor[1]

                        }
                    },
                    data: [1.8, 0.1, 0.4, 3.2, 0.4, 2.2, 0.5, 3.7, 5.6]
                },
                {
                    name:t('并网点')+3,
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: token.barColor[2]
                        }
                    },
                    data: [0.8, 4, 2.4, 1.2, 0.8, 2.2, 3.5, 1.7, 0.6]
                },
            ]
        });

    };



    useEffect(() => {
        getOptions();
    }, [token]);

    return (
        <ReactECharts option={options} style={{ height: '100%' }} />
    )
}

export default Com