
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import styles from './index.less'
import { DatePicker } from 'antd';
import ReactECharts from "echarts-for-react";
import { theme } from "antd";

function Com(props) {
    const [xxx, setXxx] = useState('')

    useEffect(() => {
        console.log('函数组件来咯')
    }, [])
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
        const data = [200, 400, 500, 800, 700, 500, 400]
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
                    // barWidth: '60%',
                    data: [0.8, 1.6, 0.4, 2.2, 0.8, 1.2, 1.5, 1.7, 1.6]
                }
            ]
        });
    };

    useEffect(() => {
        getOptions();
    }, []);
    return (
        <div className={styles.content}>
            <CardModel
                title={
                    "发电量统计"
                }
                filterPart={
                    <DatePicker />
                }
                content={
                    <ReactECharts option={options} style={{height: '100%'}}  />
                }
            />

        </div>
    )
}

export default Com