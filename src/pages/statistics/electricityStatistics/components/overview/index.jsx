import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DatePicker, Button, theme, Radio, Table, Select,message } from 'antd';
// import Table from '@/components/Table.jsx'
import dayjs from 'dayjs';
import styles from './index.less'
import { CardModel } from "@/components";
import ReactECharts from "echarts-for-react";
import { useSelector, FormattedMessage, useIntl } from "umi";
import { getEnergyFeeByTime } from '@/services/report'
import { downLoadExcelMode } from "@/utils/utils";
const { RangePicker } = DatePicker;
function Com(props) {
    const global = useSelector(state => state.global);
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const [mode, setMode] = useState('date');
    const [time, setTime] = useState(dayjs(new Date()));
    const [startTime, setStartTime] = useState(dayjs(new Date()).subtract(6, 'day'));
    const [endTime, setEndTime] = useState(dayjs(new Date()) );
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

    let flag=0;//控制初次选中
    // useEffect(() => {
    //     if(mode=='month'&&flag<1){
    //         console.log('999',dayjs().format('YYYY-MM'));
    //         console.log(22,dayjs().subtract(2, 'month').format('YYYY-MM'))
    //
    //         setStartTime(dayjs(dayjs().subtract(2, 'month').format('YYYY-MM')));
    //         setEndTime(dayjs(dayjs().format('YYYY-MM')));
    //         flag++;
    //     }
    // }, [mode]);
    // console.log('999',dayjs().format('YYYY-MM'));
    // console.log(22,dayjs().subtract(2, 'month').format('YYYY-MM'))
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
                data: [
                getTranslation('充电电量'),
                getTranslation('放电电量'),
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
                    splitLine: {
                        lineStyle: {
                            color: global.theme=='dark'?'#666':'#ddd',
                        }
                    },
                }
            ],
            series: [
                {
                    name: getTranslation('充电电量'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[0]
                        }
                    },
                    barWidth: '20%',
                    data: dataY.energyInEnergy
                },
                {
                    name: getTranslation('放电电量'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[2]

                        }
                    },
                    barWidth: '20%',
                    data: dataY.energyOutEnergy
                },
              
            ]
        });

    };
    const getData = async () => {
        if(mode=='date'){
            const diff = dayjs(endTime).diff(dayjs(startTime), 'day');
            if(diff>30){
                message.warning(getTranslation("日期范围不能超过31天，请重新选择"));
                return;
            }
        }else if(mode=='month'){
            const diff = dayjs(endTime).diff(dayjs(startTime), 'month');
            if(diff>11){
                message.warning(getTranslation("日期范围不能超过12个月，请重新选择"));
                return;
            }
        }else{
            const diff = dayjs(endTime).diff(dayjs(startTime), 'year');
            if(diff>4){
                message.warning(getTranslation("日期范围不能超过5年，请重新选择"));
                return;
            }
        }

        let currentDateStart = dayjs(startTime);
        let currentDateEnd = dayjs(endTime);
        if(mode=='date'){
            currentDateStart=currentDateStart.format('YYYY-MM-DD');
            currentDateEnd=currentDateEnd.format('YYYY-MM-DD');
        }else if(mode=='month'){
            let firstDayOfMonthStart = dayjs(currentDateStart).startOf('month');
            let lastDayOfMonthEnd = dayjs(currentDateEnd).endOf('month');
            currentDateStart=firstDayOfMonthStart.format('YYYY-MM-DD');
            currentDateEnd=lastDayOfMonthEnd.format('YYYY-MM-DD');
        }else {
            let firstDayOfYearStart = dayjs(currentDateStart).startOf('year');
            let lastDayOfYearEnd = dayjs(currentDateEnd).endOf('year');
            currentDateStart=firstDayOfYearStart.format('YYYY-MM-DD');
            currentDateEnd=lastDayOfYearEnd.format('YYYY-MM-DD');
        }

        let httpData = {
            type: mode === 'date' ? 0 : mode === 'month' ? 2 : 3,
            plantId: localStorage.getItem('plantId'),
            startTime: currentDateStart,
            endTime: currentDateEnd,
        }
        let energyInEnergy = [];
        let energyOutEnergy = [];
        let arrX = [];
        let { data } = await getEnergyFeeByTime(httpData);
        data?.data?.map((it) => {
            energyInEnergy.push(it.charge);
            energyOutEnergy.push(it.discharge);
            // it.date = dayjs(it?.date).format('YYYY-MM-DD')
            arrX.push(it?.date);

        });
        setData(data.data);
        setDateX(arrX);
        setDataY({  energyInEnergy, energyOutEnergy,  });
    }

    useEffect(() => {
        getOptions();
    }, [token,currentTheme, dataY, dateX]);
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
            setStartTime(dayjs(dayjs().subtract(2, 'month').format('YYYY-MM')));
            setEndTime(dayjs(dayjs().format('YYYY-MM')));
        } else {
            setFormat('YYYY');
        }
    };

    const downLoadExcelModel = () => {
        let fileName = getTranslation('电量统计');
        let sheetData = data.map(it=>{
            it.efficiency=+it.efficiency
            return it
        });
        let sheetFilter = ['date', 'charge', 'discharge', 'efficiency',];
        let sheetHeader = [getTranslation("日期"),`${getTranslation('充电电量')}(kWh)`, `${getTranslation('放电电量')}(kWh)`,  `${getTranslation('充放电效率')}(%)`, ];
        downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader, getTranslation('总览'))
    };
    const profitTable = [
        {
            title: getTranslation('序号'),
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
        },
        {
            title: `${getTranslation('充电电量')}(kWh)`,
            dataIndex: 'charge',
            key: 'charge',
            width: 100,
        }, 
        {
            title: `${getTranslation('放电电量')}(kWh)`,
            dataIndex: 'discharge',
            key: 'discharge',
            width: 100,
        },
        {
            title: `${getTranslation('充放电效率')}(%)`,
            dataIndex: 'efficiency',
            key: 'efficiency',
            width: 100,
           
        },
    ];
    const changeGrid = (e) => {
        setCurrntGrid(e);
    };
    const getGrid = async () => {
        let { data: grid } = await getGridPointList({
            plantId: localStorage.getItem('plantId')
        })
        setGrids([{id:"ALL",gridPointName:getTranslation('电站总计')},...res?.data?.grid?.data]);
        setCurrntGrid('ALL');
        getData();
    }
    const changeRangeDate = (val, str) => {
        setStartTime(dayjs(str?.[0]));
        setEndTime(dayjs(str?.[1]));
    }


    return (
        <div className={styles.content} >
            <div className={styles.heard} style={{ backgroundColor: token.titleCardBgc, color: token.colorNormal }}>
                {/* <div>
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
                </div> */}
                <div className={styles.date}>
                    {/*{mode == 'date' ?*/}
                {/*}*/}
                    <Radio.Group value={mode} onChange={handleModelChange} style={{ marginRight: "20px" }}>
                        <Radio.Button value="date"> <FormattedMessage id='日' /></Radio.Button>
                         <Radio.Button value="month"><FormattedMessage id='月' /></Radio.Button>
                        <Radio.Button value="year"><FormattedMessage id='年' /></Radio.Button>
                    </Radio.Group>

                    <RangePicker
                        allowClear={false}
                        picker={mode}
                        onChange={changeRangeDate}
                        value={[ startTime,endTime]}
                        format={format}
                        />
                </div>

                <div className={styles.buttons}>
                    <Button type="primary" className={styles.firstButton} onClick={getData}>
                        <FormattedMessage id='查询' />
                    </Button>
                    <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={downLoadExcelModel} >
                        {getTranslation('导出')}{" Excel"}
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
                            <ReactECharts option={options} style={{
                                // width: data.length <= 7 ? '100%' : `${100 + (data.length - 7) * 10}%`,
                                width: '100%',
                                height: '100%' }}
                            />
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