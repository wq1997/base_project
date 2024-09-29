import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DatePicker, Button, theme, Radio, Table} from 'antd';
// import Table from '@/components/Table.jsx'
import dayjs from 'dayjs';
import styles from './index.less'
import { CardModel } from "@/components";
import ReactECharts from "echarts-for-react";
import { useSelector, FormattedMessage, useIntl } from "umi";
import {getEnergyFeeByTime} from '@/services/report'
import {  downLoadExcelMode } from "@/utils/utils";

function Com(props) {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const [mode, setMode] = useState('date');
    const [time, setTime] = useState(dayjs(new Date()));
    const [format, setFormat] = useState('YYYY-MM-DD');
    const [data, setData] = useState([]);
    const [dateX,setDateX]=useState([]);
    const [dataY,setDataY]=useState({
        pvOutEnergy:[],
        energyInEnergy:[],
        energyOutEnergy:[],
        pvInEnergy:[],
        chargeInEnergy:[]
    });
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
     if (Y) setScrollY(Y-180); // 32为表头的高，应用时减去自己表格的表头高
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
                data: [getTranslation('上网电量'),
                getTranslation('电网买电量'),
                getTranslation('储能充电量'),
                getTranslation('储能放电量'),
                getTranslation('光伏发电量'),
                getTranslation('充电桩充电量'),
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
                    name: getTranslation('上网电量'),
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
                    name: getTranslation('储能充电量'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[2]

                        }
                    },
                    barWidth: '8%',
                    data:dataY.energyInEnergy
                },
                {
                    name: getTranslation('储能放电量'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[3]

                        }
                    },
                    barWidth: '8%',
                    data:dataY.energyOutEnergy
                },
                {
                    name: getTranslation('光伏发电量'),
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
                    name: getTranslation('充电桩充电量'),
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
    const getData=async()=>{
        let httpData={
            time:time.format(format),
            type:mode==='date'?0:mode==='month'?2:3,
            plantId:localStorage.getItem('plantId'),
        }
        let pvOutEnergy=[];
        let energyInEnergy=[];
        let energyOutEnergy=[];
        let pvInEnergy=[];
        let chargeInEnergy=[];
        let arrX=[];
        let {data}=await getEnergyFeeByTime(httpData);
        data?.data.map((it,i)=>{
            pvOutEnergy.push(it.pvOutEnergy);
            energyInEnergy.push(it.energyInEnergy);
            energyOutEnergy.push(it.energyOutEnergy);
            pvInEnergy.push(it.pvInEnergy);
            chargeInEnergy.push(it.chargeInEnergy);
            it.date=dayjs().subtract( data?.data?.length-i, 'day').format('YYYY-MM-DD')
            arrX.push(it?.date);
            
        })
        setData(data.data);
        setDateX(arrX);
        setDataY({pvOutEnergy,energyInEnergy,energyOutEnergy,pvInEnergy,chargeInEnergy});
    }

    useEffect(() => {
        getOptions();
    }, [currentTheme,dataY,dateX]);
    useEffect(()=>{
        getData();
    },[])
    const handleModelChange = e => {
        setMode(e.target.value);
        if (e.target.value == 'date') {
            setFormat('YYYY-MM-DD');
        } 
        else if (e.target.value ==='month') {
            setFormat('YYYY-MM');
        } else {
            setFormat('YYYY');
        }
    };
    const downLoadExcelModel = () => {
        let fileName = getTranslation('电量统计');
        let sheetData = data;
        let sheetFilter = ['date', 'pvOutEnergy', 'energyInEnergy','energyOutEnergy','pvInEnergy','chargeInEnergy'];
        let sheetHeader = [getTranslation("日期"),getTranslation("上网电量"),getTranslation("储能充电量"),getTranslation("光伏发电量"), getTranslation("充电桩充电量"),];
        downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader,getTranslation('总览'))
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
            title:getTranslation('日期'),
            dataIndex: 'date',
            key: 'date',
            width: 100,
            // render:(val)=>{
            //     return val ? dayjs(val).format('YYYY-MM-DD') : ''
            // }
        },
        {
            title: getTranslation('上网电量'),
            dataIndex: 'pvOutEnergy',
            key: 'pvOutEnergy',
            width: 100,
        },
        {
            title: getTranslation('储能充电量'),
            dataIndex: 'energyInEnergy',
            key: 'energyInEnergy',
            width: 100,
        },
        {
            title: getTranslation('储能放电量'),
            dataIndex: 'energyOutEnergy',
            key: 'energyOutEnergy',
            width: 100,
        },
        {
            title: getTranslation('光伏发电量'),
            dataIndex: 'pvInEnergy',
            key: 'pvOutEnergy',
            width: 100,
        },
        {
            title:getTranslation('充电桩充电量'),
            dataIndex: 'chargeInEnergy',
            key: 'chargeInEnergy',
            width: 100,
        },
    ];
    return (
        <div className={styles.content}>
            <div className={styles.heard} style={{ backgroundColor: token.titleCardBgc }}>
                <div className={styles.date}>
                    <DatePicker picker={mode} onChange={(val)=>setTime(val)}  defaultValue={time} format={format} style={{ marginRight: "20px" }}  />
                    <Radio.Group value={mode} onChange={handleModelChange}>
                        <Radio.Button value="date">日</Radio.Button>
                        <Radio.Button value="month">月</Radio.Button>
                        <Radio.Button value="year">年</Radio.Button>
                    </Radio.Group>
                </div>

                <div className={styles.buttons}>
                    <Button type="primary" className={styles.firstButton} onClick={getData}>
                        <FormattedMessage id='查询' />
                    </Button>
                    <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={downLoadExcelModel} >
                        <FormattedMessage id='导出' />excel
                    </Button>
                </div>

            </div>
            <div className={styles.profitWrap}>
                <div className={styles.profitStaus}>
                    <CardModel
                        title={
                            getTranslation('电量统计')+
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