import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DatePicker, Button, theme } from 'antd';
import dayjs from 'dayjs';
import styles from './index.less'
import { CardModel } from "@/components";
import ReactECharts from "echarts-for-react";
import Table from '@/components/Table.jsx'
import { useSelector, FormattedMessage, useIntl } from "umi";

function Com(props) {
    const { RangePicker } = DatePicker;
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const { theme: currentTheme } = useSelector(function (state) {
        return state.global
    });
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
                            color: token.barColor[0]

                        }
                    },
                    data: [0.8, 1.6, 0.4, 2.2, 0.8, 1.2, 1.5, 1.7, 1.6]
                },
                {
                    name: '上网量',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[5]
                        }
                    },
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
            title: '充电量（kWh）',
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
        
    ];
    useEffect(() => {
        getOptions();
    }, []);
    const disabledDate = (current) => {
        // Can not select days before today and today
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
            <div className={styles.profitStaus}>
                <div className={styles.leftEchart}>
                    <CardModel
                        title={
                            "充电桩电量"
                        }
                        content={
                            <ReactECharts option={options} style={{ height: '100%' }} />
                        }
                    />
                </div>
           

            </div>
            <div className={styles.profitList} style={{ backgroundColor: token.titleCardBgc }}>
                <Table
                    columns={profitTable}
                // data={data.records}
                />
            </div>
        </div>
    )
}

export default Com