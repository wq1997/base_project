import React, { useState, useEffect, useMemo, useRef } from 'react';
import styles from "./index.less";
import { useSelector, useIntl } from "umi";
import { theme} from "antd"
import classNames from 'classnames';
import ReactECharts from "echarts-for-react";

function Com({ dataX, dataY }) {
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
                },
                formatter: function (params) {
                    let tooltipStr = params.map(param => {
                        return `${param.seriesName}: ${param.value}%`;
                    }).join('<br/>');
                    return tooltipStr;
                }
            },
            legend: {
                right: '1%',
                textStyle: {
                    color:token.smallTitleColor,
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                axisLabel: {
                    formatter: function (value) {
                        return value + '%';
                    }
                }
            },
            yAxis: {
                type: 'category',
                data: dataX
            },
            series: [
                {
                    name: t('充放电效率'),
                    type: 'bar',
                    barWidth: '24px',
                    itemStyle: {
                        barBorderRadius:[0, 50, 50, 0],
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: '#FFFFFF'},
                                {offset: 1, color: '#03B4B4'}
                            ]
                        )
                    },
                    data: dataY
                }
            ]
        });
    };



    useEffect(() => {
        getOptions();
    }, [token, dataX, dataY]);

    return (
        <ReactECharts option={options} style={{ marginRight:'5px',height: 'calc(100% - 28px)' }} />
    )
}

export default Com