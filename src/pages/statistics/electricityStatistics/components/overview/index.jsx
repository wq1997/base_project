import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DatePicker, Button, theme, Radio, Table, Select,message } from 'antd';
// import Table from '@/components/Table.jsx'
import dayjs from 'dayjs';
import styles from './index.less'
import { CardModel } from "@/components";
import ReactECharts from "echarts-for-react";
import { useSelector, FormattedMessage, useIntl } from "umi";
import { getEnergyFeeByTime } from '@/services/report'
import { getGridPointList, } from '@/services/plant'
import { downLoadExcelMode } from "@/utils/utils";
const { RangePicker } = DatePicker;
function Com(props) {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const [mode, setMode] = useState('date');
    const [time, setTime] = useState(dayjs(new Date()));
    const [startTime, setStartTime] = useState(dayjs(new Date()));
    const [endTime, setEndTime] = useState(dayjs(new Date()).add(5, 'day'));
    const [format, setFormat] = useState('YYYY-MM-DD');
    const [data, setData] = useState([]);
    const [dateX, setDateX] = useState([]);
    const [dataY, setDataY] = useState({
        pvOutEnergy: [],
        energyInEnergy: [],
        energyOutEnergy: [],
        pvInEnergy: [],
        chargeInEnergy: []
    });
    const [currntGrid, setCurrntGrid] = useState();
    const [grids, setGrids] = useState([]);

    const [scrollY, setScrollY] = useState('');

    const { theme: currentTheme } = useSelector(function (state) {
        return state.global
    });
    const intl = useIntl();
    const getTranslation = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }

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
                data: [getTranslation('statistics.InternetPower'),
                getTranslation('statistics.TheGridBuysElectricity'),
                getTranslation('statistics.EnergyStorageCharge'),
                getTranslation('statistics.EnergyStorageDischarge'),
                getTranslation('statistics.PhotovoltaicPowerGeneration'),
                getTranslation('statistics.TheAmountOfCharging'),
                ],
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
                    name: getTranslation('statistics.InternetPower'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[0]

                        }
                    },
                    barWidth: '8%',
                    data: dataY.pvOutEnergy
                },
                {
                    name: getTranslation('statistics.EnergyStorageCharge'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[2]

                        }
                    },
                    barWidth: '8%',
                    data: dataY.energyInEnergy
                },
                {
                    name: getTranslation('statistics.EnergyStorageDischarge'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[3]

                        }
                    },
                    barWidth: '8%',
                    data: dataY.energyOutEnergy
                },
                {
                    name: getTranslation('statistics.PhotovoltaicPowerGeneration'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[4]

                        }
                    },
                    barWidth: '8%',
                    data: dataY.pvInEnergy
                },
                {
                    name: getTranslation('statistics.TheAmountOfCharging'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[5]
                        }
                    },
                    barWidth: '8%',
                    data: dataY.chargeInEnergy
                }
            ]
        });

    };
    const getData = async () => {
        let start = dayjs(startTime);
        if (Math.abs(start.diff(endTime, 'day'))>=5&&Math.abs(start.diff(endTime, 'day'))<=15||mode!=='date') {
            let httpData = {
                time: mode === 'date' ?undefined:time.format('YYYY'),
                type: mode === 'date' ? 0 : mode === 'month' ? 2 : 3,
                plantId: localStorage.getItem('plantId'),
                gridPointId: currntGrid,
                startTime: mode === 'date' ?startTime.format('YYYY-MM-DD'):undefined,
                endTime: mode === 'date' ?endTime.format('YYYY-MM-DD'):undefined,
            }
            let pvOutEnergy = [];
            let energyInEnergy = [];
            let energyOutEnergy = [];
            let pvInEnergy = [];
            let chargeInEnergy = [];
            let arrX = [];
            let { data } = await getEnergyFeeByTime(httpData);
            data?.data?.map((it) => {
                pvOutEnergy.push(it.pvOutEnergy);
                energyInEnergy.push(it.energyInEnergy);
                energyOutEnergy.push(it.energyOutEnergy);
                pvInEnergy.push(it.pvInEnergy);
                chargeInEnergy.push(it.chargeInEnergy);
                it.date = dayjs(it?.date).format('YYYY-MM-DD')
                arrX.push(it?.date);
    
            })
            setData(data.data);
            setDateX(arrX);
            setDataY({ pvOutEnergy, energyInEnergy, energyOutEnergy, pvInEnergy, chargeInEnergy });
        }else{
            message.warning(getTranslation('时间段应在5至15天'));
            return
        }
    
    }

    useEffect(() => {
        getOptions();
    }, [currentTheme, dataY, dateX]);
    useEffect(() => {
        getData();
    }, [currntGrid])
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
    const downLoadExcelModel = () => {
        let fileName = getTranslation('电量统计');
        let sheetData = data;
        let sheetFilter = ['date', 'pvOutEnergy', 'energyInEnergy', 'energyOutEnergy', 'pvInEnergy', 'chargeInEnergy'];
        let sheetHeader = [getTranslation("日期"), getTranslation("上网电量"), getTranslation("储能充电量"), getTranslation("光伏发电量"), getTranslation("充电桩充电量"),];
        downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader, getTranslation('总览'))
    };
    const profitTable = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (text, record, index) => index + 1,
        },

        {
            title: getTranslation('日期'),
            dataIndex: 'date',
            key: 'date',
            width: 100,
            // render:(val)=>{
            //     return val ? dayjs(val).format('YYYY-MM-DD') : ''
            // }
        },
        {
            title: `${getTranslation('充电电量')}(kWh)`,
            dataIndex: 'pvOutEnergy',
            key: 'pvOutEnergy',
            width: 100,
        },
        {
            title: `${getTranslation('放电电量')}(kWh)`,
            dataIndex: 'energyInEnergy',
            key: 'energyInEnergy',
            width: 100,
        },
        {
            title: getTranslation('充放电效率'),
            dataIndex: 'energyOutEnergy',
            key: 'energyOutEnergy',
            width: 100,
        },
    ];
    const changeGrid = (e) => {
        setCurrntGrid(e.target.value);
    };
    const getGrid = async () => {
        let { data: grid } = await getGridPointList({
            plantId: localStorage.getItem('plantId')
        })
        setGrids(grid?.data);
        setCurrntGrid(grid?.data?.[0]?.id);
        getData();
    }
    const changeRangeDate = (val, str) => {
        setStartTime(str?.[0]);
        setEndTime(str?.[1]);
       
        console.log(val, str, 'rangdate');
    }
    useEffect(() => {
        getGrid();
    }, [token,])

    return (
        <div className={styles.content}>
            <div className={styles.heard} style={{ backgroundColor: token.titleCardBgc, color: token.colorNormal }}>
                <div>
                    {getTranslation('并网点')}:
                    <Select
                        style={{
                            width: 200,
                            marginRight: '20px',
                            marginLeft: '10px'

                        }}
                        key={grids[0]?.id}
                        defaultValue={grids[0]?.id}
                        onChange={changeGrid}
                    >
                        {grids && grids.map(item => {
                            return (<Option key={item.id} value={item.id}>{item.gridPointName}</Option>);
                        })
                        }
                    </Select>
                </div>
                <div className={styles.date}>
                    {mode == 'date' ? <RangePicker onChange={changeRangeDate} defaultValue={[dayjs(new Date()), dayjs(new Date()).add(5, 'day')]} format={format} style={{ marginRight: "20px" }} /> : <DatePicker picker={mode} onChange={(val) => setTime(val)} defaultValue={time} format={format} style={{ marginRight: "20px" }} />}
                    <Radio.Group value={mode} onChange={handleModelChange}>
                        <Radio.Button value="date">日</Radio.Button>
                        {/* <Radio.Button value="month">月</Radio.Button> */}
                        <Radio.Button value="year">年</Radio.Button>
                    </Radio.Group>
                </div>

                <div className={styles.buttons}>
                    <Button type="primary" className={styles.firstButton} onClick={getData}>
                        <FormattedMessage id='app.Query' />
                    </Button>
                    <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={downLoadExcelModel} >
                        <FormattedMessage id='app.Export' />excel
                    </Button>
                </div>

            </div>
            <div className={styles.profitWrap}>
                <div className={styles.profitStaus}>
                    <CardModel
                        title={
                            getTranslation('电量统计') +
                            getTranslation('(kWh)')
                        }
                        content={
                            <ReactECharts option={options} style={{ height: '100%' }} />
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

        </div>
    )
}

export default Com