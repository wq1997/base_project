import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme } from 'antd';
import ReactECharts from "echarts-for-react";
import {  useIntl } from "umi";

function Com({dataX,dataY}) {
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
                    data: dataX,
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLabel: {
                        interval: 0,
                        rotate:0
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
                    name:t('收益'),
                    type: 'bar',
                    barMaxWidth: '20%',
                    itemStyle: {
                        normal: {
                            color: token.barColor[0]
                        }
                    },
                    data: dataY
                },

            ]
        });

    };



    useEffect(() => {
        getOptions();
    }, [token,dataX,dataY]);

    return (
        <ReactECharts option={options} style={{ height: '100%' }} />
    )
}

export default Com