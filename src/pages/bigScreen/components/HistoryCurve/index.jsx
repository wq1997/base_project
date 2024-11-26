import React, { useState, useEffect, useMemo, useRef } from 'react';
import styles from "./index.less";
import { useSelector, useIntl } from "umi";
import { theme} from "antd"
import classNames from 'classnames';
import ReactECharts from "echarts-for-react";

function Com({ dataX, charge,disCharge }) {
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
    const grid = {
        left: 100,
        right: 100,
        top: 50,
        bottom: 50
    };

    const series=[{
        name:t('充电量'),
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        label: {
            show: false,
        },
        itemStyle: {
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#56A4FF'},
                    {offset: 1, color: '#96C6FF'}
                ]
            )
        },
        data: charge
    },{
        name:t('放电量'),
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        label: {
            show: false,
        },
        itemStyle: {
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#7ADEF7'},
                    {offset: 1, color: '#36CEDB'}
                ]
            )
        },
        data: disCharge
    }
    ];
    const getOptions = () => {
        setOptions({
            legend: {
                selectedMode: false,
                right: '1%',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid,
            yAxis: {
                type: 'value',
                name:`${t('电量')}(kWh)`
            },
            xAxis: {
                type: 'category',
                data: dataX
            },
            series
        });

    };



    useEffect(() => {
        getOptions();
    }, [token, dataX, charge,disCharge]);

    return (
        <ReactECharts option={options} style={{ height: 'calc(100% - 28px)' }} />
    )
}

export default Com