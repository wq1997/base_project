import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DatePicker, Button, theme, Radio } from 'antd';
import dayjs from 'dayjs';
import styles from './index.less'
import { CardModel } from "@/components";
import ReactECharts from "echarts-for-react";
import LineEcharts from '@/components/LineEcharts'
import Table from '@/components/Table.jsx'
import { useSelector, FormattedMessage, useIntl } from "umi";
import { getEnergyFeeByTime } from '@/services/report'

function Com(props) {
    const { token } = theme.useToken();
    const [mode, setMode] = useState('date');
    const [time, setTime] = useState(dayjs(new Date()));
    const [format, setFormat] = useState('YYYY-MM-DD');
    const [data, setData] = useState([]);
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
    const getData = async () => {
        let httpData = {
            time:  time.format(format),
            type: mode === 'date' ? 0 : mode === 'month' ? 2 : 3,
            plantId: localStorage.getItem('plantId'),
            valueType: 0
        }
        let { data } = await getEnergyFeeByTime(httpData);
        setData(data.data);
    }
    const profitTable = [
        {
            title: 'id',
            dataIndex: 'idx',
            key: 'idx',
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
                    dataIndex: 'tipInEnergy',
                    key: 'tipInEnergy',
                    width: 150,
                },
                {
                    title: '峰电',
                    dataIndex: 'peakInEnergy',
                    key: 'peakInEnergy',
                    width: 150,
                },
                {
                    title: '平电',
                    dataIndex: 'flatInEnergy',
                    key: 'flatInEnergy',
                    width: 150,
                },
                {
                    title: '谷电',
                    dataIndex: 'valleyInEnergy',
                    key: 'valleyInEnergy',
                    width: 150,
                },
                {
                    title: '总计',
                    dataIndex: 'dayInEnergy',
                    key: 'dayInEnergy',
                    width: 150,
                },
            ],
        },
        {
            title: '放电量（kWh）',
            className: currentTheme === 'default' ? 'lightTitleColorLeft' : 'darkTitleColorLeft',
            children: [
                {
                    title: '尖电',
                    dataIndex: 'tipOutEnergy',
                    key: 'tipOutEnergy',
                    width: 150,
                },
                {
                    title: '峰电',
                    dataIndex: 'peakOutEnergy',
                    key: 'peakOutEnergy',
                    width: 150,
                },
                {
                    title: '平电',
                    dataIndex: 'flatOutEnergy',
                    key: 'flatOutEnergy',
                    width: 150,
                },
                {
                    title: '谷电',
                    dataIndex: 'valleyOutEnergy',
                    key: 'valleyOutEnergy',
                    width: 150,
                },
                {
                    title: '总计',
                    dataIndex: 'dayOutEnergy',
                    key: 'dayOutEnergy',
                    width: 150,
                },

            ],
        },
    ];
    useEffect(() => {
        getOptions();
    }, [currentTheme]);
    useEffect(() => {
        getData();
    }, []);
    const handleModelChange = e => {
        setMode(e.target.value);
        if (e.target.value == 'date') {
            setFormat('YYYY-MM-DD');
        }
        else if (e.target.value === 'month') {
            setFormat('YYYY-MM');
        } else {
            setFormat('YYYY');
        }
    };
    return (
        <div className={styles.content}>
            <div className={styles.heard} style={{ backgroundColor: token.titleCardBgc }}>
                <div className={styles.date}>
                    <DatePicker picker={mode} defaultValue={time} format={format} style={{ marginRight: "20px" }} />
                    <Radio.Group value={mode} onChange={handleModelChange}>
                        <Radio.Button value="date">日</Radio.Button>
                        <Radio.Button value="month">月</Radio.Button>
                        <Radio.Button value="year">年</Radio.Button>
                    </Radio.Group>
                </div>
                <div className={styles.buttons}>
                    <Button type="primary" className={styles.firstButton} onClick={getData}>
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
                            "储能电量"
                        }
                        content={
                            <ReactECharts option={options} style={{ height: '100%' }} />
                        }
                    />
                </div>
                <div className={styles.rightCardData} style={{ backgroundColor: token.titleCardBgc }}>
                    <CardModel
                        title={
                            "充放电效率"
                        }
                        content={
                            <LineEcharts name='充放电效率' style={{ height: '100%' }} yData={[12, 32, 11, 14, 90, 30, 10, 82, 91, 34, 90, 33]} />

                        }
                    />

                </div>
            </div>
            <div className={styles.profitList} style={{ backgroundColor: token.titleCardBgc }}>
                <Table
                    columns={profitTable}
                    data={data}
                />
            </div>
        </div>
    )
}

export default Com