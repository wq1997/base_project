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
// import { profitTable } from '@/utils/constants'
import Table from '@/components/Table.jsx'
import { useSelector} from "umi";

function Com(props) {
    const [xxx, setXxx] = useState('')
    const { RangePicker } = DatePicker;
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const { theme:currentTheme } = useSelector(function (state) {
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
                            color: token.colorPrimary
                        }
                    },
                    barWidth: '60%',
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
            className:currentTheme==='default'?'lightTitleColorRight':'darkTitleColorRight',
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
            className:currentTheme==='default'?'lightTitleColorLeft':'darkTitleColorLeft',
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
                <div className={styles.rightCardData} style={{ backgroundColor: token.titleCardBgc }}>
                    {cardData.map((it) => {
                        return <div className={styles.profitCard} style={{ color: it.color, backgroundColor: token.cardBgc, boxShadow: token.cardShadow }}>
                            <div className={styles.cardItemTitle}>
                                {it.icon}
                                <span style={{ color: token.smallTitleColor, fontWeight: 500, fontSize: '16px', marginLeft: '3px' }}>{it.name}</span>
                            </div>
                            <div className={styles.cardItemVaue} style={{ color: token.titleColor }}>
                                {it.value}
                                <span style={{ color: token.smallTitleColor, fontSize: '16px', fontWeight: 400, marginLeft: '10px' }}>{it.unit}</span>
                            </div>
                        </div>
                    })}

                </div>

            </div>
            <div className={styles.profitList}>
                <CardModel
                    title={
                        "收益明细"
                    }
                    content={
                        <Table
                        columns={profitTable}
                        // data={data.records}
                      />
                    }
                />
            </div>
        </div>
    )
}

export default Com