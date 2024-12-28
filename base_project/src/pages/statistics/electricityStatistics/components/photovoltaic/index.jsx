import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DatePicker, Button, theme, Radio, Table } from 'antd';
import dayjs from 'dayjs';
import styles from './index.less'
import { CardModel } from "@/components";
import ReactECharts from "echarts-for-react";
// import Table from '@/components/Table.jsx'
import { useSelector, FormattedMessage, useIntl } from "umi";
import { getEnergyFeeByTime } from '@/services/report'
import {  downLoadExcelMode } from "@/utils/utils";

function Com(props) {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const [mode, setMode] = useState('date');
    const [time, setTime] = useState(dayjs(new Date()));
    const [format, setFormat] = useState('YYYY-MM-DD');
    const [data, setData] = useState([]);
    const [dayIn, setDayIn] = useState([]);
    const [dayOut, setDayOut] = useState([]);
    const [dateX, setDateX] = useState([]);
    const [excelData, setExcelData] = useState([]);

    const { theme: currentTheme } = useSelector(function (state) {
        return state.global
    });
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const [scrollY, setScrollY] = useState('');
    useEffect(() => {
        const Y = document.getElementById('table')?.clientHeight;
        if (Y) setScrollY(Y - 180); // 32为表头的高，应用时减去自己表格的表头高
    }, []);
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

                textStyle: {//图例文字的样式
                    color: token.titleColor,
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: dateX,
                    axisTick: {
                        alignWithLabel: true
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
                    name: '发电量',
                    type: 'bar',
                    barMaxWidth: '10%',
                    itemStyle: {
                        normal: {
                            color: token.barColor[0]
                        }
                    },
                    data: dayIn
                },
                {
                    name: '上网电量',
                    type: 'bar',
                    barMaxWidth: '10%',
                    itemStyle: {
                        normal: {
                            color: token.barColor[4]
                        }
                    },
                    data: dayOut
                }
            ]
        });
    };
    const profitTable = [
     {  
        title:'',
        children:[ {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

            render: (text, record, index) => index + 1,
        },

        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
            width: 100,
            className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',
        },
    ]
    },
        {
            title: '发电量（kWh）',
            children: [
                {
                    title: '尖电',
                    dataIndex: 'tipInEnergy',
                    key: 'tipInEnergy',
                    width: 150,
                    className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

                },
                {
                    title: '峰电',
                    dataIndex: 'peakInEnergy',
                    key: 'peakInEnergy',
                    width: 150,
                    className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

                },
                {
                    title: '平电',
                    dataIndex: 'flatInEnergy',
                    key: 'flatInEnergy',
                    width: 150,
                    className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

                },
                {
                    title: '谷电',
                    dataIndex: 'valleyInEnergy',
                    key: 'valleyInEnergy',
                    width: 150,
                    className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

                },
                {
                    title: '总计',
                    dataIndex: 'dayInEnergy',
                    key: 'dayInEnergy',
                    width: 150,
                    className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

                },
            ],
        },
        {
            title: '上网电量（kWh）',
            children: [
                {
                    title: '尖电',
                    dataIndex: 'tipOutEnergy',
                    key: 'tipOutEnergy',
                    width: 150,
                    className: currentTheme === 'default' ? 'lightTitleColorLeft' : 'darkTitleColorLeft',

                },
                {
                    title: '峰电',
                    dataIndex: 'peakOutEnergy',
                    key: 'peakOutEnergy',
                    width: 150,
                    className: currentTheme === 'default' ? 'lightTitleColorLeft' : 'darkTitleColorLeft',

                },
                {
                    title: '平电',
                    dataIndex: 'flatOutEnergy',
                    key: 'flatOutEnergy',
                    width: 150,
                    className: currentTheme === 'default' ? 'lightTitleColorLeft' : 'darkTitleColorLeft',

                },
                {
                    title: '谷电',
                    dataIndex: 'valleyOutEnergy',
                    key: 'valleyOutEnergy',
                    width: 150,
                    className: currentTheme === 'default' ? 'lightTitleColorLeft' : 'darkTitleColorLeft',

                },
                {
                    title: '总计',
                    dataIndex: 'dayOutEnergy',
                    key: 'dayOutEnergy',
                    width: 150,
                    className: currentTheme === 'default' ? 'lightTitleColorLeft' : 'darkTitleColorLeft',

                },

            ],
        },
    ];
    const downLoadExcelModel = () => {
        let fileName = t('电量统计');
        let sheetData = excelData;
        let sheetFilter = ['date', 'dayInEnergy', 'dayOutEnergy','efit',];
        let sheetHeader = [t("日期"),t("发电量")+'(kWh)',t("上网电量")+'(kWh)', ];
        downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader,t('光伏'))
    };
    const getData = async () => {
        let httpData = {
            time: time.format(format),
            type: mode === 'date' ? 0 : mode === 'month' ? 2 : 3,
            plantId: localStorage.getItem('plantId'),
            valueType: 2
        };
        
        let arrIn = [];
        let arrOut = [];
        let arrX = [];
        let excel=[];
        let { data } = await getEnergyFeeByTime(httpData);
        data?.data.map((it) => {
            arrIn.push(it.dayInEnergy);
            arrOut.push(it.dayOutEnergy);
            it.date=dayjs(it?.date).format('YYYY-MM-DD')
            arrX.push(it?.date);
            excel.push({
                dayInEnergy:it.dayInEnergy,
                dayOutEnergy:it.dayOutEnergy,
                date:it.date
            })
        })
        setExcelData(excel);
        setDayIn(arrIn);
        setDayOut(arrOut);
        setDateX(arrX);
        setData(data.data);
    }
    useEffect(() => {
        getOptions();
    }, [currentTheme, dayIn, dayOut, dateX]);
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
                    <DatePicker picker={mode}  onChange={(val)=>setTime(val)} defaultValue={time} format={format} style={{ marginRight: "20px" }} />
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
                    <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={
                        downLoadExcelModel
                    }>
                        <FormattedMessage id='app.Export' /> excel
                    </Button>
                </div>

            </div>
            <div className={styles.profitStaus}>
                <CardModel
                    title={
                        t('光伏电量(kWh)')
                    }
                    content={
                        // <div className={styles.eletric}>
                        <ReactECharts option={options} style={{ height: '100%', marginBottom: '5vh' }} />

                        // </div>
                    }
                />

            </div>
            <div className={styles.profitList} id="table" style={{ backgroundColor: token.titleCardBgc, }}>
                <Table
                    columns={profitTable}
                    dataSource={data}
                    scroll={{
                        y: scrollY,
                    }}
                />
            </div>
        </div>
    )
}

export default Com