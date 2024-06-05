// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { Pagination, Select, Space, theme, Button, DatePicker } from "antd"
import { history, useLocation, useIntl } from "umi";
import { CardModel } from "@/components";
import titleImg from '@/assets/imges/titlep.png'
import BMS from '@/assets/imges/BMS.png'
import useIcon from "@/hooks/useIcon";
import { getBurOverview2 } from '@/services/deviceTotal'
import { getQueryString } from "@/utils/utils";

function Com(props) {
    const [allData, setAllData] = useState([])
    const { token } = theme.useToken();
    const Icon = useIcon();
    const id = getQueryString("id");

    useEffect(() => {
        getData();
    }, [])
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
        let { data } = await getBurOverview2({ id });
        setAllData(data?.data);
        let arr = [];
        status.map((it, index) => {
            if (index === 0) {
                it.value = data.data?.bms.onlineState
            } else if (index === 1) {
                it.value = data.data?.pcs.onlineState
            } else if (index === 2) {
                it.value = data.data?.tmeter.onlineState
            }
            arr.push(it);
        })
        setStatus([...arr]);
    }

    const [status, setStatus] = useState([
        {
            title: t('BMS'),
            value: false,
            index: 'BMS'
        },
        {
            title: t('PCS'),
            value: false,
            index: 'pcsStatus'
        },
        {
            title: t('计量电表'),
            value: false,
            index: 'meterStatus'
        }
    ])

    return (
        <div className={styles.content}>
            <div className={styles.title} style={{ backgroundColor: token.darkbgc }}>{decodeURI(getQueryString("title"))}
                <div className={styles.sn}><span>SN:</span><span>{decodeURI(getQueryString("sn"))}</span></div>
            </div>
            <div className={styles.PcsData} style={{ backgroundColor: token.darkbgc }}>
                <CardModel
                    title={t('PCS信息')}
                    bgc={'#0D1430'}
                    content={
                        <div className={styles.pcsWrap}>
                            <div className={styles.pcsOne} style={{width:'66.7%'}}>
                                <div className={styles.pcsOneTitle}>
                                    <span style={{ paddingLeft: '30px' }}></span>
                                    <span>
                                        {t('电流/A')}
                                    </span>
                                </div>
                                <div className={styles.pcsOneBody}>
                                    <div className={styles.oneData}>
                                        <div className={styles.key}>A</div>
                                        <div className={styles.value}>{allData.pcs?.phaseACur}</div>
                                    </div>
                                    <div className={styles.oneData}>
                                        <div className={styles.key}>B</div>
                                        <div className={styles.value}>{allData.pcs?.phaseBCur}</div>
                                    </div>
                                    <div className={styles.oneData}>
                                        <div className={styles.key}>C</div>
                                        <div className={styles.value}>{allData.pcs?.phaseCCur}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.pcsOne } style={{width:'33.3%'}}>
                                <div className={styles.pcsOneTitle}>
                                    {/* <span style={{ paddingLeft: '30px' }}></span> */}
                                    <span>
                                        {t('电压/V')}
                                    </span>
                                </div>
                                <div className={styles.pcsOneBody}>
                                    <div className={styles.oneData}>
                                        <div className={styles.value}>{allData.pcs?.phaseAVol}</div>
                                    </div>
                                    <div className={styles.oneData}>
                                        <div className={styles.value}>{allData.pcs?.phaseBVol}</div>
                                    </div>
                                    <div className={styles.oneData}>
                                        <div className={styles.value}>{allData.pcs?.phaseCVol}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>
            {allData?.bms && <div className={styles.Bms1} style={{ backgroundColor: token.darkbgc }}>
                <CardModel
                    title={t('BMS簇1信息')}
                    bgc={'#0D1430'}
                    content={
                        <div className={styles.bmsContent}>
                            <div className={styles.bmsOne}>
                                <div className={styles.bmsTitle} >
                                    <img src={titleImg} />
                                    {t('单体最高')}
                                </div>
                                <div className={styles.bmsBody}>
                                    <img src={BMS} alt="" />
                                    <div className={styles.value}>
                                        <div className={styles.valueOne}>
                                            <div className={styles.left}>
                                                <span>{t("温度/℃")}</span>
                                                <span>{allData?.bms?.cellTempMax || '-'}</span>
                                            </div>
                                            <div className={styles.right}>
                                                <span>{t("No.")}</span>
                                                <span>{allData?.bms?.cellTempMaxNo || '-'}</span>
                                            </div>
                                        </div>
                                        <div className={styles.valueOne}>
                                            <div className={styles.left}>
                                                <span>{t("电压/mV")}</span>
                                                <span>{allData?.bms?.cellVolMax || '-'}</span>
                                            </div>
                                            <div className={styles.right}>
                                                <span>{t("No.")}</span>
                                                <span>{allData?.bms?.cellVolMaxNo || '-'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bmsOne}>
                                <div className={styles.bmsTitle} >
                                    <img src={titleImg} />
                                    {t('单体最低')}
                                </div>
                                <div className={styles.bmsBody}>
                                    <img src={BMS} alt="" />
                                    <div className={styles.value}>
                                        <div className={styles.valueOne}>
                                            <div className={styles.left}>
                                                <span>{t("温度/℃")}</span>
                                                <span>{allData?.bms?.cellTempMin || '-'}</span>
                                            </div>
                                            <div className={styles.right}>
                                                <span>{t("No.")}</span>
                                                <span>{allData?.bms?.cellTempMinNo || '-'}</span>
                                            </div>
                                        </div>
                                        <div className={styles.valueOne}>
                                            <div className={styles.left}>
                                                <span>{t("电压/mV")}</span>
                                                <span>{allData?.bms?.cellVolMin || '-'}</span>
                                            </div>
                                            <div className={styles.right}>
                                                <span>{t("No.")}</span>
                                                <span>{allData?.bms?.cellVolMinNo || '-'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>}
   
            <div className={styles.TodayEntity} style={{ backgroundColor: token.darkbgc }}>
                <CardModel
                    title={t('今日电能')}
                    bgc={'#0D1430'}
                    content={<div className={styles.entityWrap}>
                        <div className={styles.Box}>
                            <div className={styles.boxTitle}>
                                <Icon type='icon-shandian1' style={{ color: '#03B4B4' }}></Icon>
                                {t('今日充电')}
                            </div>
                            <div className={styles.value} >
                                <span style={{ color: '#03B4B4' }}>{allData.gmeter?.dayChargeEnergy}</span>
                                <span className={styles.unit}>kWh</span>
                            </div>
                        </div>
                        <div className={styles.Box}>
                            <div className={styles.boxTitle}>
                                <Icon type='icon-shandian1' style={{ color: '#F08416' }}></Icon>
                                {t('今日放电')}
                            </div>
                            <div className={styles.value} >
                                <span style={{ color: '#F08416' }}>{allData.gmeter?.dayDischargeEnergy}</span>
                                <span className={styles.unit}>kWh</span>
                            </div>
                        </div>

                    </div>}
                />
            </div>
            {allData?.bms && <div className={styles.powerA} style={{ backgroundColor: token.darkbgc }}>
                <div className={styles.pcsWrap}>
                    <div className={styles.pcsOne}>
                        <div className={styles.pcsOneTitle}>
                            <span style={{ paddingLeft: '80px' }}></span>
                            <span>
                                {t('功率/kW')}
                            </span>
                            <span>
                                {t('电流/A')}
                            </span>
                        </div>
                        <div className={styles.pcsOneBody}>
                            <div className={styles.oneData}>
                                <div className={styles.key}>PCS</div>
                                <div className={styles.value}>{allData?.pcs?.totalActivePower || '0'}</div>
                                <div className={styles.value}>{allData?.pcs?.inputCur || '0'}</div>
                            </div>
                            <div className={styles.oneData}>
                                <div className={styles.key}>{t('BMS')}</div>
                                <div className={styles.value}>{allData?.bms?.power || '0'}</div>
                                <div className={styles.value}>{allData?.bms?.cur || '0'}</div>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>}
            <div className={styles.status} style={{ backgroundColor: token.darkbgc }}>
                <CardModel
                    title={t('通讯状态')}
                    bgc={'#0D1430'}
                    content={<div className={styles.statusWrap}>
                        {status.map(it => {
                            return <div className={styles.statusOne}>
                                <span className={styles.title}>{it.title}</span>
                                <Icon className={styles.value} type={it.value ? 'icon-danxuan-xuanzhong' : 'icon-danxuan'} style={{ color: it.value ? '#03B4B4' : '#fff', }} ></Icon>
                            </div>
                        })}
                    </div>}
                />
            </div>
        </div>
    )
}

export default Com