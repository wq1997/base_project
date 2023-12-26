import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DatePicker, Button, theme } from 'antd';
import dayjs from 'dayjs';
import styles from './index.less'
import {
    DownloadOutlined,
} from '@ant-design/icons';
import { CardModel } from "@/components";
import ReactECharts from "echarts-for-react";
function Com(props) {
    const [xxx, setXxx] = useState('')
    const { RangePicker } = DatePicker;
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
                    barWidth: '60%',
                    data: [0.8, 1.6, 0.4, 2.2, 0.8, 1.2, 1.5, 1.7, 1.6]
                }
            ]
        });
    };

    useEffect(() => {
        getOptions();
    }, []);
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };
    return (
        <div className={styles.content}>
            <div className={styles.heard} style={{ backgroundColor: token.cardBgc }}>
                <div>
                    <RangePicker disabledDate={disabledDate} />
                </div>
                <div className={styles.buttons}>
                    <Button type="primary" className={styles.firstButton}>
                        查询
                    </Button>
                    <Button type="primary" style={{ backgroundColor: token.defaultBg }} >
                        导出excel
                    </Button>
                </div>

            </div>
            <div className={styles.profitStaus}>
                <div className={styles.leftEchart}>
                <CardModel
                    title={
                        "收益统计"
                    }
                    content={
                        <ReactECharts option={options} style={{ height: '100%' }} />
                    }
                />
                </div>
                <div className={styles.rightCardData} style={{backgroundColor:token.cardBgc}}></div>
        
            </div>
            <div className={styles.profitList}>
                
            </div>
        </div>
    )
}

export default Com