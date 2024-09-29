
// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { theme, } from "antd";
import { CardModel } from "@/components";
import { useSelector, FormattedMessage, useIntl } from "umi";
import { Tooltip, Table } from 'antd';
import useIcon from "@/hooks/useIcon";
import LineEcharts from '@/components/LineEcharts'
import Charge from './components/Charge';
import ProfitAll from './components/ProfitAll'
import ChargAndDischarg from './components/ChargAndDischarg'
import AllEfficiency from './components/AllEfficiency'
import {
    getEnergySummary,
    getRunMetrics,
    getChargeDischargeEnergySevenDaysByPlantId,
    getChargeDischargeEnergySevenDaysDtuId,
    getNowAlarmsByDtu,
    getRunMetricsj,
    getIncomeByDtuId,
    getEnergySummaryByDtu,
    getNowAlarmsByEnergy,
    getIncomeByPlantId
} from '@/services/deviceTotal'
import dayjs from 'dayjs';
import { getQueryString } from "@/utils/utils";
import { alarmTableColums } from '@/utils/constants'
import { useEmotionCss } from '@ant-design/use-emotion-css';
import classNames from 'classnames';

let clum = [...alarmTableColums];
clum.splice(-1, 1) ;
function Overview(props) {
    const [dataX, setDataX] = useState([]);
    const [dataCharge, setDataCharge] = useState({ dayChargeEnergy: [], dayDischargeEnergy: [] });
    const [dataEfficiency, setDataEfficiency] = useState([]);
    const [dayEarning, setDayEarning] = useState([]);
    const [energySummary, setEnergySummaryg] = useState({});
    const [income, setIncome] = useState({});
    const [alarms, setAlarms] = useState([]);
    const [running, setRunning] = useState([]);
    const [screenH, setScreenH] = useState('');
    const [scroolY, setScroolY] = useState(200);
    let currentPlant = JSON.parse(localStorage.getItem('current'));
    const { token } = theme.useToken();
    const Icon = useIcon();
    const intl = useIntl();
    const pageType = getQueryString('pageType') || 'ALL';
    const id = getQueryString('id') || 0;
    const dtuId = getQueryString('dtuId') || 0;
    const title = decodeURI(getQueryString('title')) || '储能总览';
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    };


    const eleData = [
        {
            label: '今日充电量',
            name: 'dayChargeEnergy',
            value: '',
            unit: 'kWh',
            color: '#03B4B4'
        },
        {
            label: '今日放电量',
            name: 'dayDischargeEnergy',
            value: '',
            unit: 'kWh',
            color: '#FF9D4F'
        },
        {
            label: '累计充电量',
            name: 'totalChargeEnergy',
            value: '',
            unit: 'kWh',
            color: '#71B4F2'
        },
        {
            label: '累计放电量',
            name: 'totalDischargeEnergy',
            value: '',
            unit: 'kWh',
            color: '#EEC830'
        },
        {
            label: '今日充放电效率',
            name: 'dayEfficiency',
            value: '',
            unit: '%',
            color: '#03B4B4'
        },
        {
            label: '累计充放电效率',
            name: 'totalEfficiency',
            value: '',
            unit: '%',
            color: '#DE83C4'
        },
    ];
    const profitData = [
        {
            label: '日收益',
            name: 'todayIncome',
            unit: currentPlant?.priceUnit,
            color: '#03B4B4',
            icon: 'icon-qian'
        },
        {
            label: '周收益',
            name: 'weekIncome',
            unit: currentPlant?.priceUnit,
            color: '#FF9D4F',
            icon: 'icon-qian1'

        },
        {
            label: '月收益',
            name: 'monthIncome',
            unit: currentPlant?.priceUnit,
            color: '#EEC830',
            icon: 'icon-fenxiangzhuanshouyi'

        },
        {
            label: '累计收益',
            name: 'totalIncome',
            unit: currentPlant?.priceUnit,
            color: '#71B4F2',
            icon: 'icon-qushi'

        },

    ];
    useEffect(() => {
        setScreenH(document.documentElement.clientHeight || document.body.clientHeight)
        window.addEventListener("resize", handleWindowResize)
        return () => {
            window.removeEventListener("resize", handleWindowResize)
        }
    }, [])

    const handleWindowResize = () => {
        setScreenH(document.documentElement.clientHeight || document.body.clientHeight)
    }
    useEffect(() => {
        if (screenH < 1000) {
            setScroolY(60);
        } else if (screenH > 1000 && screenH < 1500) {
            setScroolY(130);
        }
    }, [screenH])

    useEffect(() => {
        getEnergy();
        getRun();
        getAllElecty();
        getIncome();
        getAlarms();
    }, [pageType, id]);
    const getEnergy = async () => {
        let { data } = pageType === 'ALL' ? await getEnergySummary({ plantId: localStorage.getItem('plantId') }) :
            await getEnergySummaryByDtu({ dtuId:id});
        setEnergySummaryg(data.data);
    }
    const getRun = async () => {
        let { data } = pageType === 'ALL' ? await getRunMetrics({ plantId: localStorage.getItem('plantId') }) :
            await getRunMetricsj({ gridPointId: id });
        setRunning(data.data);
    }
    const getIncome = async () => {
        let res = pageType === 'ALL' ? await getIncomeByPlantId({ plantId: localStorage.getItem('plantId') }) :
            await getIncomeByDtuId({dtuId: id });
        setIncome(res?.data?.data);
    }
    const getAlarms = async () => {
        let { data } = pageType === 'ALL' ? await getNowAlarmsByEnergy({ plantId: localStorage.getItem('plantId') }) :
            await getNowAlarmsByDtu({ dtuId:id });
        setAlarms(data.data);
    }
    const getAllElecty = async () => {
        let { data } = pageType === 'ALL' ? await getChargeDischargeEnergySevenDaysByPlantId({ plantId: localStorage.getItem('plantId') }) :
            await getChargeDischargeEnergySevenDaysDtuId({ dtuId:id });
        let arrA = [];
        let arrB = [];
        let arrC = [];
        let arrD = [];
        let arrE = [];
        data?.data?.map((it,i) => {
            arrA.push(dayjs().subtract(data?.data.length-i,'day').format('MM-DD'));
            arrB.push(it?.dayChargeEnergy);
            arrC.push(it?.dayDischargeEnergy);
            arrD.push(it?.dayEarning);
            arrE.push(it?.efficiency)
        })
        setDataX([...arrA]);
        setDataCharge(
            {
                dayChargeEnergy: [...arrB],
                dayDischargeEnergy: [...arrC]
            }
        );
        setDayEarning([...arrD]);
        setDataEfficiency([...arrE]);
    }
    let siderContentStyle = {
        width: '100%',
        height: 'calc(100% - 76px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)) ',
        gridTemplateRows: '1fr 1.375fr 1.375fr',
        gap: '8px 8px',
        gridTemplateAreas:
            `"electric running profit"
            "charge chargebit profitAll"
            "chargAndDischarg alarm alarm"`
    }
    let ContentStyle = useEmotionCss(({ token }) => {
        return {
            ...siderContentStyle,
            gridTemplateAreas:
                `'electric running profit'' charge chargebit profitAll' '${pageType === 'ALL' ? 'alarm' : 'chargAndDischarg'} alarm alarm'`,
        }

    })
    return (
        <div className={styles.overview}>
            <div className={styles.heard} style={{ backgroundColor: token.titleCardBgc }}>{title}</div>
            <div className={classNames(styles.overContent, ContentStyle)} >
                <div className={styles.electric}>
                    <CardModel
                        title={
                            t("电量")
                        }
                        content={
                            <div className={styles.elewrap} style={{ backgroundColor: token.lightTreeLineBgc }}>
                                {eleData.map(it => {
                                    return (<div className={styles.item} style={{ backgroundColor: token.lightTreeBgc }}>
                                        <Tooltip title={t(it.label)} >
                                            <div className={styles.itemTitle} style={{ color: token.titleColor }}>{t(it.label)}</div>
                                        </Tooltip>
                                        <Tooltip title={energySummary?.[it?.name] + it.unit} >
                                            <div className={styles.itemValue} style={{ color: it.color }}>{energySummary?.[it.name]}<span className={styles.itemUnit} style={{ color: token.titleColor }}>{it.unit}</span></div>
                                        </Tooltip>

                                    </div>)
                                })}
                            </div>
                        } />
                </div>
                <div className={styles.running}>
                    <CardModel
                        title={
                            t("运行指标")
                        }
                        content={
                            <div className={styles.runningWrap}>
                                <div className={styles.realPower} style={{ backgroundColor: token.lightTreeBgc }}>
                                    <Icon
                                        type="icon-gongyezujian-yibiaopan"
                                        style={{
                                            fontSize: 20,
                                            color: '#03B4B4'
                                        }}
                                    />
                                    <span className={styles.label} style={{ color: token.titleColor }}>{t('当前总功率')}</span>{':'}<span className={styles.value} style={{marginLeft:'8px'}}>{ running?.totalPower?.split(' ')[0]
                                        || 0}</span><span className={styles.unit} style={{ color: token.titleColor }}>{running?.totalPower?.split(' ')[1] || 'kW'}</span>
                                </div>
                                <div className={styles.realStaus} style={{ backgroundColor: token.lightTreeBgc }}>
                                    <div>{t('设备状态')}</div>
                                    <div>{t('正常')}<span className={styles.value} style={{ color: '#2BC50E' }}>{running?.onlineDevices}</span>{t('个')}</div>
                                    <div>{t('故障')}<span className={styles.value} style={{ color: '#D41818' }}>{running?.faultDevices}</span>{t('个')}</div>

                                </div>
                            </div>
                        } />
                </div>
                <div className={styles.profit}>
                    <CardModel
                        title={
                            t("收益")
                        }
                        content={
                            <div className={styles.profitWrap}>
                                {profitData.map(it => {
                                    return (
                                        <>
                                            <div className={styles.itemProfit} style={{ backgroundColor: token.lightTreeBgc }}>
                                                <Tooltip title={t(it.label)} >
                                                    <div className={styles.titleProfit}>
                                                        <Icon type={it.icon} style={{ color: it.color }}></Icon>
                                                        {t(it.label)}
                                                    </div>
                                                </Tooltip>


                                                <div className={styles.valueProfit} style={{ color: it.color }}>
                                                    {income?.[it.name]||'--'}<span style={{ color: token.titleColor }}>{it.unit}</span>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                            </div>
                        } />
                </div>
                <div className={styles.charge}>
                    <CardModel
                        title={
                            t("充放电量") + "(kWh)"
                        }
                        content={
                            <div className={styles.chargeWrap}>
                                <Charge dataX={dataX} dataY={dataCharge} />
                            </div>
                        } />
                </div>
                <div className={styles.chargebit}>
                    <CardModel
                        title={
                            t("充放电效率")+"(%)"
                        }
                        content={
                            <div className={styles.chargebitWrap}>
                                {pageType === 'ALL' ?
                                    <AllEfficiency />
                                    :
                                    <LineEcharts name={t('充放电效率')+"(%)"} style={{ height: '100%' }}
                                        xData={dataX}
                                        yData={dataEfficiency}
                                        barMaxWidth={'20%'}
                                    />}
                            </div>
                        } />
                </div>
                <div className={styles.profitAll}>
                    <CardModel
                        title={
                            t("收益统计") + '(元)'
                        }
                        content={
                            <div className={styles.profitAllWrap}>
                                <ProfitAll dataX={dataX} dataY={dayEarning} />
                            </div>
                        } />
                </div>
                {pageType !== 'ALL' && <div className={styles.chargAndDischarg}>
                    <CardModel
                        title={
                            t("充放电功率") + '(kW)'
                        }
                        content={
                            <div className={styles.chargAndDischargWrap}>
                                <ChargAndDischarg />
                            </div>
                        } />
                </div>}
                <div className={styles.alarm}>
                    <CardModel
                        title={
                            t("告警")
                        }
                        content={
                            <div className={styles.alarmWrap}>
                                {/* {alarmData.map(it => {
                                    return (
                                        <div className={styles.itemAlarm}>
                                            <Icon type={it.icon} style={{ color: it.color }} />
                                            <span>{t(it.label)}:</span>
                                            {it.value}
                                        </div>
                                    )
                                })} */}

                                <Table className={styles.alarmTable} columns={clum} dataSource={alarms} size="middle" scroll={{ y: scroolY }} />
                            </div>
                        } />
                </div>
            </div>
        </div>
    )
}

export default Overview;
