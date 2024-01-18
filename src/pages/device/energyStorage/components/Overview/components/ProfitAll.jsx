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
              data: [t('收益')],
              right:'1%',
              textStyle:{
                color: token.titleColor//字体颜色
                },
            }, 
            xAxis: [
                {
                    type: 'category',
                    data: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                    axisTick: {
                        alignWithLabel: true,
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
                    name:t('收益'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[0]

                        }
                    },
                    data: [0.8, 1.1, 0.4, 2.2, 0.8, 1.2, 1.5, 1.7, 1.6]
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