import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DatePicker, Button, theme, Radio, Table } from 'antd';
import dayjs from 'dayjs';
import styles from './index.less'
import { CardModel } from "@/components";
import ReactECharts from "echarts-for-react";
// import Table from '@/components/Table.jsx'
import { useSelector } from "umi";
import { getEnergyFeeByTime } from '@/services/report'

function Com({ typeNum, dataTable, dataYM,clum }) {
    const [mode, setMode] = useState('date');
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const [format, setFormat] = useState('YYYY-MM-DD');
    const [data, setData] = useState([]);
    const [dateX, setDateX] = useState([]);
    const [time, setTime] = useState(dayjs(new Date()));
    const [dataY, setDataY] = useState();
    const { theme: currentTheme } = useSelector(function (state) {
        return state.global
    });
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
            xAxis: [
                {
                    type: 'category',
                    data: ['2024-04-01', '2024-04-02', '2024-04-03',],
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
                            color: token.colorPrimary
                        }
                    },
                    // barWidth: '60%',
                    data: dataYM
                }
            ]
        });
    };

    useEffect(() => {
        getOptions();
    }, [dateX, dataY, currentTheme,]);
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
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        let httpData = {
            time: time.format(format),
            type: mode === 'date' ? 0 : mode === 'month' ? 2 : 3,
            plantId: localStorage.getItem('plantId'),
            valueType: typeNum
        }
        let arrX = [];
        let chargeEarning = [];
        let energyEarning = [];
        let pvEarning = [];
        let totalEarning = [];
        let { data } = await getEnergyFeeByTime(httpData);
        data?.data.map((it) => {
            totalEarning.push(it.totalEarning);
            pvEarning.push(it.pvEarning);
            energyEarning.push(it.energyEarning);
            chargeEarning.push(it.chargeEarning);
            arrX.push(it.date)
        })
        setData(data.data);
        setDateX(arrX);


    }
    return (
        <div className={styles.content}>
            <div className={styles.heard} style={{ backgroundColor: token.titleCardBgc }}>
                <div className={styles.date}>
                    <DatePicker picker={mode} defaultValue={time} style={{ marginRight: "20px" }} />
                    <Radio.Group value={mode} onChange={handleModelChange}>
                        <Radio.Button value="date">日</Radio.Button>
                        <Radio.Button value="month">月</Radio.Button>
                        <Radio.Button value="year">年</Radio.Button>
                    </Radio.Group>
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
                            "收益统计(元)"
                        }
                        content={
                            <ReactECharts option={options} style={{ height: '100%' }} />
                        }
                    />
                </div>
                {/* <div className={styles.rightCardData} style={{ backgroundColor: token.titleCardBgc }}>
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

                </div> */}

            </div>
            <div className={styles.profitList} id="table">
                <CardModel
                    title={
                        "收益明细"
                    }
                    content={
                        <Table
                            columns={clum}
                            dataSource={dataTable}
                            scroll={{
                                y: scrollY,
                            }}
                        />
                    }
                />
            </div>
        </div>
    )
}

export default Com