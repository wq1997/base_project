import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DatePicker, Button, theme, Radio,Table } from 'antd';
import dayjs from 'dayjs';
import styles from './index.less'
import { CardModel } from "@/components";
import ReactECharts from "echarts-for-react";
import LineEcharts from '@/components/LineEcharts'
import { useSelector, FormattedMessage, useIntl } from "umi";
import { getEnergyFeeByTime } from '@/services/report'
import {  downLoadExcelMode } from "@/utils/utils";

function Com(props) {
    const { token } = theme.useToken();
    const [mode, setMode] = useState('date');
    const [time, setTime] = useState(dayjs(new Date()));
    const [format, setFormat] = useState('YYYY-MM-DD');
    const [data, setData] = useState([]);
    const [dayIn, setDayIn] = useState([]);
    const [dayOut, setDayOut] = useState([]);
    const [dateX, setDateX] = useState([]);
    const [efficiency, setEfficiency] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const [options, setOptions] = useState({});
    const { theme: currentTheme } = useSelector(function (state) {
        return state.global
    });
    const [scrollY, setScrollY] = useState('');
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
                    name: '充电电量',
                    type: 'bar',
                    barMaxWidth:'20%',
                    itemStyle: {
                        normal: {
                            color: token.barColor[0]

                        }
                    },
                    data: dayIn
                },
                {
                    name: '放电电量',
                    type: 'bar',
                    barMaxWidth:'20%',
                    itemStyle: {
                        normal: {
                            color: token.barColor[5]
                        }
                    },
                    data: dayOut
                }
            ]
        });
    };
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const getData = async () => {
        let httpData = {
            time: time.format(format),
            type: mode === 'date' ? 0 : mode === 'month' ? 2 : 3,
            plantId: localStorage.getItem('plantId'),
            valueType: 0
        }
        let arrIn = [];
        let arrOut = [];
        let arrX = [];
        let arrEfit=[];
        let excel=[];
        let { data } = await getEnergyFeeByTime(httpData);
        data?.data.map((it,i) => {
            arrIn.push(it.dayInEnergy);
            arrOut.push(it.dayOutEnergy);
            it.date=dayjs().subtract( data?.data?.length-i, 'day').format('YYYY-MM-DD')
            arrX.push(it?.date);
            if (it.dayInEnergy===0) {
                arrEfit.push(0);
                excel.push({
                    dayInEnergy:it.dayInEnergy,
                    dayOutEnergy:it.dayOutEnergy,
                    date:it.date,
                    efit:0
                })
            }else{
                arrEfit.push((+it.dayOutEnergy/+it.dayInEnergy).toFixed(2));
                excel.push({
                    dayInEnergy:it.dayInEnergy,
                    dayOutEnergy:it.dayOutEnergy,
                    date:it.date,
                    efit:(+it.dayOutEnergy/+it.dayInEnergy).toFixed(2)
                });
                it.efficiency=(+it.dayOutEnergy/+it.dayInEnergy).toFixed(2)
            }
        })
        setExcelData(excel);
        setDayIn(arrIn);
        setDayOut(arrOut);
        setDateX(arrX);
        setEfficiency(arrEfit);
        setData(data.data);
    }
    const downLoadExcelModel = () => {
        let fileName = t('电量统计');
        let sheetData = excelData;
        let sheetFilter = ['date', 'dayInEnergy', 'dayOutEnergy','efit',];
        let sheetHeader = [t("日期"),t("充电电量")+'(kWh)',t("放电电量")+'(kWh)',t("充放电效率"), ];
        downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader,t('储能'))
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
               title: '充电量（kWh）',
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
               title: '放电量（kWh）',
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
                   {
                    title: '充放电效率',
                    dataIndex: 'efficiency',
                    key: 'efficiency',
                    width: 150,
                    className: currentTheme === 'default' ? 'lightTitleColorLeft' : 'darkTitleColorLeft',
                   }
               ],
           },
          
       ];
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
                        <FormattedMessage id='查询' />
                    </Button>
                    <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={downLoadExcelModel} >
                        <FormattedMessage id='导出'  />excel
                    </Button>
                </div>

            </div>
            <div className={styles.profitStaus}>
                <div className={styles.leftEchart}>
                    <CardModel
                        title={
                            "储能电量(kWh)"
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
                            <LineEcharts name='充放电效率' style={{ height: '100%' }} 
                            xData={dateX}
                            yData={efficiency} 
                            barMaxWidth={'20%'}
                            />

                        }
                    />

                </div>
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