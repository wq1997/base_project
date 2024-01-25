
// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { theme, } from "antd";
import { CardModel } from "@/components";
import { useSelector, FormattedMessage, useIntl } from "umi";
import { Tooltip } from 'antd';
import useIcon from "@/hooks/useIcon";
import LineEcharts from '@/components/LineEcharts'
import Charge from './components/Charge';
import ProfitAll from './components/ProfitAll'
import ChargAndDischarg from './components/ChargAndDischarg'
import {
    getEnergySummary,
    getRunMetrics,
    getChargeDischargeEnergySevenDaysByPlantId,
    getChargeDischargeEnergySevenDaysDtuId
} from '@/services/deviceTotal'
import dayjs from 'dayjs';
import { getQueryString } from "@/utils/utils";


function Overview(props) {
    const [dataX, setDataX] = useState([]);
    const [dataCharge, setDataCharge] = useState({ dayChargeEnergy: [], dayDischargeEnergy: [] });
    const [dataEfficiency, setDataEfficiency] = useState([]);
    const [dayEarning, setDayEarning] = useState([]);
    const { token } = theme.useToken();
    const Icon = useIcon();
    const intl = useIntl();
    const pageType = getQueryString('pageType')||'ALL';
    const id = getQueryString('id')||0;
    const title = decodeURI(getQueryString('title'))||'储能总览';
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
            value: '333',
            unit: 'kWh',
            color: '#03B4B4'
        },
        {
            label: '今日放电量',
            value: '333',
            unit: 'kWh',
            color: '#FF9D4F'
        },
        {
            label: '累计充电量',
            value: '333',
            unit: 'kWh',
            color: '#71B4F2'
        },
        {
            label: '累计放电量',
            value: '333',
            unit: 'kWh',
            color: '#EEC830'
        },
        {
            label: '今日充放电效率',
            value: '99',
            unit: '%',
            color: '#03B4B4'
        },
        {
            label: '累计充放电效率',
            value: '99',
            unit: '%',
            color: '#DE83C4'
        },
    ];
    const profitData = [
        {
            label: '日收益',
            value: '33311',
            unit: '元',
            color: '#03B4B4',
            icon: 'icon-qian'
        },
        {
            label: '周收益',
            value: '33322',
            unit: '元',
            color: '#FF9D4F',
            icon: 'icon-qian1'

        },
        {
            label: '月收益',
            value: '33322',
            unit: '元',
            color: '#EEC830',
            icon: 'icon-fenxiangzhuanshouyi'

        },
        {
            label: '累计收益',
            value: '333',
            unit: '元',
            color: '#71B4F2',
            icon: 'icon-qushi'

        },

    ];
    const alarmData = [
        {
            label: '告警时间',
            value: '2023.01.04',
            color: '#03B4B4',
            icon: 'icon-yibiaopan'
        },
        {
            label: '并网点',
            value: '1号并网点',
            color: '#FF9D4F',
            icon: 'icon-dianwanggongsi'
        },
        {
            label: '告警等级',
            value: '严重',
            color: '#EEC830',
            icon: 'icon-jihuanengli'
        },
        {
            label: '告警描述',
            value: '2023.XXXXXXXXXXXXXXX01.04',
            color: '#71B4F2',
            icon: 'icon-zongjie'
        },
    ]
    useEffect(() => {
        getEnergy();
        // getRun();
        getAllElecty();
    }, [pageType, id]);
    const getEnergy = async () => {
        let { data } = await getEnergySummary({ plantId: localStorage.getItem('plantId') });
        // console.log(data.data,111111111);
    }
    const getRun = async () => {
        let { data } = await getRunMetrics({ plantId: localStorage.getItem('plantId') });
        // console.log(data.data,111111111);
    }
    const getAllElecty = async () => {
        let { data } =  pageType === 'ALL' ? await getChargeDischargeEnergySevenDaysByPlantId({ plantId: localStorage.getItem('plantId') }) :
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
    return (
        <div className={styles.overview}>
            <div className={styles.heard} style={{ backgroundColor: token.titleCardBgc }}>{title}储能总览</div>
            <div className={styles.overContent} >
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
                                        <div className={styles.itemValue} style={{ color: it.color }}>{it.value} <span className={styles.itemUnit} style={{ color: token.titleColor }}>{it.unit}</span></div>
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
                                    <span className={styles.label} style={{ color: token.titleColor }}>{t('当前总功率')}</span>:<span className={styles.value}>9999</span><span className={styles.unit} style={{ color: token.titleColor }}>kWh</span>
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
                                                    {it.value} <span style={{ color: token.titleColor }}>{t(it.unit)}</span>
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
                                <LineEcharts name={t('充放电效率')} style={{ height: '100%' }}
                                    xData={dataX}
                                    yData={dataEfficiency} />
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
                <div className={styles.chargAndDischarg}>
                    <CardModel
                        title={
                            "充放电效率"
                        }
                        content={
                            <div className={styles.chargAndDischargWrap}>
                                <ChargAndDischarg />
                            </div>
                        } />
                </div>
                <div className={styles.alarm}>
                    <CardModel
                        title={
                            "告警"
                        }
                        content={
                            <div className={styles.alarmWrap}>
                                {alarmData.map(it => {
                                    return (
                                        <div className={styles.itemAlarm}>
                                            <Icon type={it.icon} style={{ color: it.color }} />
                                            <span>{t(it.label)}:</span>
                                            {it.value}
                                        </div>
                                    )
                                })}
                            </div>
                        } />
                </div>
            </div>
        </div>
    )
}

export default Overview;
