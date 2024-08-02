// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { Pagination, Select, Space, theme, Button, DatePicker } from "antd"
import { history, useLocation, useIntl } from "umi";
import  CardModel  from "../CardModel/index";
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

    const todayData=[
        {
        key:'dayChargeEnergy',
        color:'',
        label:'日充电电量'
    },
    {
        key:'dayDischargeEnergy',
        color:'',
        label:'日放电电量'
    },  {
        key:'',
        color:'',
        label:''
    },  {
        key:'',
        color:'',
        label:''
    },  {
        key:'',
        color:'',
        label:''
    },  {
        key:'',
        color:'',
        label:''
    },
]
    return (
        <div className={styles.content} style={{backgroundColor:token.titleCardBgc}}>
            <div className={styles.title} style={{ backgroundColor: token.darkbgc }}>{decodeURI(getQueryString("title"))}
                <div className={styles.sn}><span>SN:</span><span>{decodeURI(getQueryString("sn"))}</span></div>
            </div>
            <div className={styles.PcsData} style={{ backgroundColor: token.darkbgc }}>
                <CardModel
                    title={t('PCS信息')}
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
                                        <div className={styles.value}>{allData.pcs?.phaseACur || '0'}</div>
                                    </div>
                                    <div className={styles.oneData}>
                                        <div className={styles.key}>B</div>
                                        <div className={styles.value}>{allData.pcs?.phaseBCur || '0'}</div>
                                    </div>
                                    <div className={styles.oneData}>
                                        <div className={styles.key}>C</div>
                                        <div className={styles.value}>{allData.pcs?.phaseCCur || '0'}</div>
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
                                        <div className={styles.value}>{allData.pcs?.phaseAVol || '0'}</div>
                                    </div>
                                    <div className={styles.oneData}>
                                        <div className={styles.value}>{allData.pcs?.phaseBVol || '0'}</div>
                                    </div>
                                    <div className={styles.oneData}>
                                        <div className={styles.value}>{allData.pcs?.phaseCVol || '0'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>
            {allData?.bms && <div className={styles.Bms1} style={{ backgroundColor: token.darkbgc }}>
                <CardModel
                    title={t('BMS信息')}
                    content={
                        <div className={styles.bmsContent}>
                            <div className={styles.bmsOne}>
                                <div className={styles.bmsTitle} >
                                    <img src={titleImg} />
                                    {t('单体最高')}
                                </div>
                                <div className={styles.bmsBody}>
                                    {/* <img src={BMS} alt="" /> */}
                                    <div className={styles.value}>
                                        <div className={styles.valueOne}>
                                            <div className={styles.left}>
                                                <span className={styles.key} style={{lineHeight:'2.9167rem'}}>{t("温度/℃")}</span>
                                                <span style={{textAlign:'left',width:'60%',color:'#00CBFF',fontSize:'2.0833rem'}}>{allData?.bms?.cellTempMax || '0'}</span>
                                            </div>
                                            <div className={styles.right}>
                                                <span style={{lineHeight:'2.9167rem'}}>{t("No.")}</span>
                                                <span style={{textAlign:'left',color:'#00CBFF',width:'40%',fontSize:'2.0833rem'}}>{allData?.bms?.cellTempMaxNo || '0'}</span>
                                            </div>
                                        </div>
                                        <div className={styles.valueOne}>
                                            <div className={styles.left}>
                                                <span className={styles.key} style={{lineHeight:'2.9167rem'}}>{t("电压/mV")}</span>
                                                <span style={{textAlign:'left',width:'60%',color:'#00CBFF',fontSize:'2.0833rem'}}>{allData?.bms?.cellVolMax || '0'}</span>
                                            </div>
                                            <div className={styles.right}>
                                                <span style={{lineHeight:'2.9167rem'}}>{t("No.")}</span>
                                                <span style={{textAlign:'left',color:'#00CBFF',width:'40%',fontSize:'2.0833rem'}}>{allData?.bms?.cellVolMaxNo || '0'}</span>
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
                                    {/* <img src={BMS} alt="" /> */}
                                    <div className={styles.value}>
                                        <div className={styles.valueOne}>
                                            <div className={styles.left}>
                                                <span className={styles.key} style={{lineHeight:'2.9167rem'}}>{t("温度/℃")}</span>
                                                <span style={{textAlign:'left',width:'60%',color:'#00CBFF',fontSize:'2.0833rem'}}>{allData?.bms?.cellTempMin || '0'}</span>
                                            </div>
                                            <div className={styles.right}>
                                                <span style={{lineHeight:'2.9167rem'}}>{t("No.")}</span>
                                                <span style={{textAlign:'left',color:'#00CBFF',width:'40%',fontSize:'2.0833rem'}}>{allData?.bms?.cellTempMinNo || '0'}</span>
                                            </div>
                                        </div>
                                        <div className={styles.valueOne}>
                                            <div className={styles.left}>
                                                <span className={styles.key} style={{lineHeight:'2.9167rem'}}>{t("电压/mV")}</span>
                                                <span style={{textAlign:'left',width:'60%',color:'#00CBFF',fontSize:'2.0833rem'}}>{allData?.bms?.cellVolMin || '0'}</span>
                                            </div>
                                            <div className={styles.right}>
                                                <span style={{lineHeight:'2.9167rem'}}>{t("No.")}</span>
                                                <span style={{textAlign:'left',color:'#00CBFF',width:'40%',fontSize:'2.0833rem'}}>{allData?.bms?.cellVolMinNo || '0'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>}
            <div className={styles.center} style={{ backgroundColor: token.darkbgc }}></div>
            <div className={styles.TodayEntity} style={{ backgroundColor: token.darkbgc }}>
                <CardModel
                    title={t('今日电能')}
                    content={<div className={styles.entityWrap}>


                    </div>}
                />
            </div>
            <div className={styles.status} style={{ backgroundColor: token.darkbgc }}>
                <CardModel
                    title={t('通讯状态')}
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