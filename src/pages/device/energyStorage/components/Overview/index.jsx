
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


function Overview(props) {
    const [dataX, setDataX] = useState([]);
    const [dataCharge, setDataCharge] = useState({ dayChargeEnergy: [], dayDischargeEnergy: [] });
    const [dataEfficiency, setDataEfficiency] = useState([]);
    const [dayEarning, setDayEarning] = useState([]);
    const [energySummary, setEnergySummaryg] = useState({});
    const [income, setIncome] = useState({});
    const [alarms, setAlarms] = useState([]);
    const [running, setRunning] = useState([]);
    const { token } = theme.useToken();
    const Icon = useIcon();
    const intl = useIntl();
    const pageType = getQueryString('pageType') || 'ALL';
    const id = getQueryString('id') || 0;
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
            unit: '元',
            color: '#03B4B4',
            icon: 'icon-qian'
        },
        {
            label: '周收益',
            name: 'weekIncome',
            unit: '元',
            color: '#FF9D4F',
            icon: 'icon-qian1'

        },
        {
            label: '月收益',
            name: 'monthIncome',
            unit: '元',
            color: '#EEC830',
            icon: 'icon-fenxiangzhuanshouyi'

        },
        {
            label: '累计收益',
            name: 'totalIncome',
            unit: '元',
            color: '#71B4F2',
            icon: 'icon-qushi'

        },

    ];

    useEffect(() => {
        getEnergy();
        getRun();
        getAllElecty();
        getIncome();
        getAlarms();
    }, [pageType, id]);
    const getEnergy = async () => {
        let { data } = pageType === 'ALL' ? await getEnergySummary({ plantId: localStorage.getItem('plantId') }) :
            await getEnergySummaryByDtu({ dtuId: id });
        setEnergySummaryg(data.data);
    }
    const getRun = async () => {
        let { data } = pageType === 'ALL' ? await getRunMetrics({ plantId: localStorage.getItem('plantId') }) :
            await getRunMetricsj({ dtuId: id });
        setRunning(data.data);
    }
    const getIncome = async () => {
        let { data } = pageType === 'ALL' ? await getIncomeByPlantId({ plantId: localStorage.getItem('plantId') }) :
            await getIncomeByDtuId({ dtuId: id });
        setIncome(data.data);
    }
    const getAlarms = async () => {
        let { data } = pageType === 'ALL' ? await getNowAlarmsByEnergy({ plantId: localStorage.getItem('plantId') }) :
            await getNowAlarmsByDtu({ dtuId: id });
        setAlarms(data.data);
    }
    const getAllElecty = async () => {
        let { data } = pageType === 'ALL' ? await getChargeDischargeEnergySevenDaysByPlantId({ plantId: localStorage.getItem('plantId') }) :
            await getChargeDischargeEnergySevenDaysDtuId({ dtuId: id });
        let arrA = [];
        let arrB = [];
        let arrC = [];
        let arrD = [];
        let arrE = [];
        data?.data?.map(it => {
            arrA.push(dayjs(it.date).format('MM-DD'));
            arrB.push(it.dayChargeEnergy);
            arrC.push(it.dayDischargeEnergy);
            arrD.push(it.dayEarning);
            arrE.push(it.efficiency)
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
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1.375fr 1.375fr',
        gap: '8px 8px',
        gridTemplateAreas:
            ` "electric running profit"
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
            <div className={styles.heard} style={{ backgroundColor: token.titleCardBgc }}>{title}储能总览</div>
            <div className={classNames(styles.overContent, ContentStyle)} >
                <div className={styles.electric}>
                    <CardModel
                        title={
                            "电量"
                        }
                        content={
                            <div className={styles.elewrap} style={{ backgroundColor: token.lightTreeLineBgc }}>
                                {eleData.map(it => {
                                    return (<div className={styles.item} style={{ backgroundColor: token.lightTreeBgc }}>
                                        <Tooltip title={t(it.label)} >
                                            <div className={styles.itemTitle} style={{ color: token.titleColor }}>{t(it.label)}</div>
                                        </Tooltip>
                                        <div className={styles.itemValue} style={{ color: it.color }}>{energySummary[it.name]} <span className={styles.itemUnit} style={{ color: token.titleColor }}>{it.unit}</span></div>
                                    </div>)
                                })}
                            </div>
                        } />
                </div>
                <div className={styles.running}>
                    <CardModel
                        title={
                            "运行指标"
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
                                    <span className={styles.label} style={{ color: token.titleColor }}>{t('当前总功率')}</span>:<span className={styles.value}>{running?.totalPower}</span><span className={styles.unit} style={{ color: token.titleColor }}>kWh</span>
                                </div>
                                <div className={styles.realStaus} style={{ backgroundColor: token.lightTreeBgc }}>
                                    <div>{t('设备状态')}</div>
                                    <div>{t('正常')}<span className={styles.value} style={{ color: '#2BC50E' }}>66</span>{t('个')}</div>
                                    <div>{t('故障')}<span className={styles.value} style={{ color: '#D41818' }}>2</span>{t('个')}</div>

                                </div>
                            </div>
                        } />
                </div>
                <div className={styles.profit}>
                    <CardModel
                        title={
                            "收益"
                        }
                        content={
                            <div className={styles.profitWrap}>
                                {profitData.map(it => {
                                    return (
                                        <>
                                            <div className={styles.itemProfit} style={{ backgroundColor: token.lightTreeBgc }}>
                                                <div className={styles.titleProfit}>
                                                    <Icon type={it.icon} style={{ color: it.color }}></Icon>
                                                    {t(it.label)}
                                                </div>
                                                <div className={styles.valueProfit} style={{ color: it.color }}>
                                                    {income[it.name]} <span style={{ color: token.titleColor }}>{t(it.unit)}</span>
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
                            "充放电量"
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
                            "充放电效率"
                        }
                        content={
                            <div className={styles.chargebitWrap}>
                                {pageType === 'ALL' ?
                                    <AllEfficiency />
                                    :
                                    <LineEcharts name={t('充放电效率')} style={{ height: '100%' }}
                                        xData={dataX}
                                        yData={dataEfficiency} />}
                            </div>
                        } />
                </div>
                <div className={styles.profitAll}>
                    <CardModel
                        title={
                            "收益统计"
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
                            "充放电功率"
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
                            "告警"
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

                                <Table columns={alarmTableColums} dataSource={alarms} size="middle" scroll={{y:100}} />
                            </div>
                        } />
                </div>
            </div>
        </div>
    )
}

export default Overview;
