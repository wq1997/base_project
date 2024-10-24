// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { Pagination, Select, Space, theme, Button, DatePicker } from "antd"
import { history, useLocation, useIntl ,useSelector} from "umi";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import CardModel from "../CardModel/index";
import high from '@/assets/imges/high.svg'
import low from '@/assets/imges/low.svg'
import OutDoor from '@/assets/svg/outDoor.svg'
import OutDoorDefault from '@/assets/svg/outDoorDefault.svg'
import leftDes from '@/assets/svg/leftDes.svg'
import leftDesDefault from '@/assets/svg/leftDesDefault.svg'
import useIcon from "@/hooks/useIcon";
import { getBurOverview2 } from '@/services/deviceTotal'
import { getQueryString } from "@/utils/utils";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-liquidfill/src/liquidFill.js";
import bottomDefault from '../../../../../../../public/images/bottomDesDefault.svg'
import bottomDark from '../../../../../../../public/images/bottomDesDark.svg'
import classNames from "classnames";

function Com(props) {
    const [allData, setAllData] = useState([])
    const { token } = theme.useToken();
    const Icon = useIcon();
    const id = getQueryString("id");
    const [path, setPath] = useState(bottomDefault);
    const [pathLeft, setPathLeft] = useState(leftDesDefault);
    const global = useSelector(state => state.global);
    useEffect(() => {
        setPath(global.theme == 'default' ? bottomDefault : bottomDark);
        setPathLeft(global.theme == 'default' ? leftDesDefault : leftDes);
    }, [global.theme]);
    useEffect(() => {
        getData();
    }, [global.theme,global.locale])
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
const [option, setOption] = useState({})
    const getData = async () => {
        let { data } = await getBurOverview2({ id });
        setAllData(data?.data);
        setOption({
            title: {
                text: '',
            },

            series: [
                {
                    type: 'liquidFill',
                    radius: '100%',
                    center: ['50%', '50%'],
                    label: {
                        normal: {
                            formatter: '',
                        }
                    },
                    backgroundStyle: {
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [{
                                offset: 0,
                                color: global.theme == 'default' ? 'rgba(234, 240, 244, 0)' : 'rgba(22,31,69,0)' // 0% 处的颜色
                            }, {
                                offset: 0.5,
                                color: global.theme == 'default' ? 'rgba(234, 240, 244, 0.1)' : 'rgba(44,255,204,0.1)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: global.theme == 'default' ? 'rgba(167, 227, 255, 1)' : 'rgba(44,255,204,1)'// 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    },
                    data: [(data?.data?.bms?.soc ) / 100 || 0, ((data?.data?.bms?.soc ) / 100) || 0,], // data个数代表波浪数
                    color: global.theme == 'default' ?
                        ['rgba(167, 227, 255,0.8)', 'rgba(167, 227, 255,0.6)', 'rgba(167, 227, 255,1)']
                        :
                        ['rgba(44,255,204,0.8)', 'rgba(44,255,204,0.6)', 'rgba(44,255,204,1)'],//设置颜色系列
                    label: {
                        formatter: (data?.data?.bmc?.[0]?.soc + data?.data?.bmc?.[1]?.soc) / 200 || 0,
                        fontSize: '1.2rem',
                        color: token.color3
                    },
                    outline: {
                        borderDistance: 2,
                        itemStyle: {
                            borderWidth: 0,
                            borderColor: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [

                                    {
                                        offset: 0,
                                        // color: 'rgba(234, 240, 244,1)', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        // color: 'rgba(167, 227, 255, 1)', // 100% 处的颜色
                                    },
                                ],
                                // globalCoord: false
                            },
                            shadowBlur: 20,
                            shadowColor: 'red',
                        }

                    },
                },
            ],
        }

        )
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
            title: t('计量电表'),
            value: false,
            index: 'meterStatus'
        },
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
      
    ])

    const todayData = [
        {
            key: 'dayChargeEnergy',
            color: '#25FF00',
            label: '日充电电量'
        },
        {
            key: 'dayDischargeEnergy',
            color: '#FF6300',
            label: '日放电电量'
        }, {
            key: 'monChargeEnergy',
            color: token.color4,
            label: '月充电电量'
        }, {
            key: 'monDischargeEnergy',
            color: token.color4,
            label: '月放电电量'
        }, {
            key: 'totalCEnergy',
            color: token.color4,
            label: '总充电电量'
        }, {
            key: 'totalDEnergy',
            color: token.color4,
            label: '总放电电量'
        },
    ];
    const value = useEmotionCss(() => {
        return {
            color: `${token.color4}`
        }
    })

    return (
        <div className={styles.content} style={{backgroundColor: token.titleCardBgc_2  }}>
            <div className={styles.title} style={{ backgroundColor: token.darkbgc,color:token.color2 }}>{decodeURI(getQueryString("title"))}
            <div className={styles.sn} style={{color:token.color3}}><span>SN:</span><span>{props?.sn}</span></div>

            </div>
            <div className={styles.PcsData} style={{ backgroundColor: token.darkbgc,color: token.color1 }}>
                <CardModel
                    title={t('PCS信息')}
                    content={
                        <div className={styles.pcsWrap}>
                            <div className={styles.pcsOne} style={{ width: '66.7%' }}>
                                <div className={styles.pcsOneTitle}>
                                    <span style={{ paddingLeft: '30px' }}></span>
                                    <span style={{fontSize:'1.0417rem'}}>
                                        {t('电流/A')}
                                    </span>
                                </div>
                                <div className={styles.pcsOneBody}>
                                    <div className={styles.oneData}>
                                        <div className={styles.key}>A</div>
                                        <div className={classNames(styles.value, value)}>{allData.pcs?.phaseACur || '0'}</div>
                                    </div>
                                    <div className={styles.oneData}>
                                        <div className={styles.key}>B</div>
                                        <div className={classNames(styles.value, value)}>{allData.pcs?.phaseBCur || '0'}</div>
                                    </div>
                                    <div className={styles.oneData}>
                                        <div className={styles.key}>C</div>
                                        <div className={classNames(styles.value, value)}>{allData.pcs?.phaseCCur || '0'}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.pcsOne} style={{ width: '33.3%' }}>
                                <div className={styles.pcsOneTitle}>
                                    {/* <span style={{ paddingLeft: '30px' }}></span> */}
                                    <span>
                                        {t('电压/V')}
                                    </span>
                                </div>
                                <div className={styles.pcsOneBody}>
                                    <div className={styles.oneData}>
                                        <div className={classNames(styles.value, value)}>{allData.pcs?.phaseAVol || '0'}</div>
                                    </div>
                                    <div className={styles.oneData}>
                                        <div className={classNames(styles.value, value)}>{allData.pcs?.phaseBVol || '0'}</div>
                                    </div>
                                    <div className={styles.oneData}>
                                        <div className={classNames(styles.value, value)}>{allData.pcs?.phaseCVol || '0'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>
            {allData?.bms && <div className={styles.Bms1} style={{ backgroundColor: token.titleCardBgc_2,color: token.color3 }}>
                <CardModel
                    title={t('BMS信息')}
                    content={
                        <div className={styles.bmsContent}>
                            <div className={styles.bmsOne}>
                                <div className={styles.bmsTitle} style={{ color: token.color2 }}>
                                    <img src={high} />
                                    {t('单体最高')}
                                </div>
                                <div className={styles.bmsBody}>
                                    {/* <img src={BMS} alt="" /> */}
                                    <div className={styles.value}>
                                        <div className={styles.valueOne}>
                                            <div className={styles.left}>
                                                <span className={styles.key} style={{ lineHeight: '2.9167rem' }}>{t("温度/℃")}</span>
                                                <span className={classNames(styles.value, value)} >{allData?.bms?.cellTempMax || '0'}</span>
                                            </div>
                                            <div className={styles.right}>
                                                <span  className={styles.key} style={{ lineHeight: '2.9167rem' }}>{t("No.")}</span>
                                                <span className={classNames(styles.value, value)} >{allData?.bms?.cellTempMaxNo || '0'}</span>
                                            </div>
                                        </div>
                                        <div className={styles.valueOne}>
                                            <div className={styles.left}>
                                                <span className={styles.key} style={{ lineHeight: '2.9167rem' }}>{t("电压/mV")}</span>
                                                <span className={classNames(styles.value, value)}>{allData?.bms?.cellVolMax || '0'}</span>
                                            </div>
                                            <div className={styles.right}>
                                                <span className={styles.key} style={{ lineHeight: '2.9167rem' }}>{t("No.")}</span>
                                                <span className={classNames(styles.value, value)}>{allData?.bms?.cellVolMaxNo || '0'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bmsOne}>
                                <div className={styles.bmsTitle} style={{ color: token.color2 }}>
                                    <img src={low} />
                                    {t('单体最低')}
                                </div>
                                <div className={styles.bmsBody}>
                                    {/* <img src={BMS} alt="" /> */}
                                    <div className={styles.value}>
                                        <div className={styles.valueOne}>
                                            <div className={styles.left}>
                                                <span className={styles.key} style={{ lineHeight: '2.9167rem' }}>{t("温度/℃")}</span>
                                                <span className={classNames(styles.value, value)}>{allData?.bms?.cellTempMin || '0'}</span>
                                            </div>
                                            <div className={styles.right}>
                                                <span  className={styles.key} style={{ lineHeight: '2.9167rem' }}>{t("No.")}</span>
                                                <span className={classNames(styles.value, value)}>{allData?.bms?.cellTempMinNo || '0'}</span>
                                            </div>
                                        </div>
                                        <div className={styles.valueOne}>
                                            <div className={styles.left}>
                                                <span className={styles.key} style={{ lineHeight: '2.9167rem' }}>{t("电压/mV")}</span>
                                                <span className={classNames(styles.value, value)}>{allData?.bms?.cellVolMin || '0'}</span>
                                            </div>
                                            <div className={styles.right}>
                                                <span  className={styles.key} style={{ lineHeight: '2.9167rem' }}>{t("No.")}</span>
                                                <span className={classNames(styles.value, value)}>{allData?.bms?.cellVolMinNo || '0'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>}
            <div className={styles.center} style={{ backgroundColor: token.darkbgc ,color: token.color1}}>
                <div className={styles.topData}>
                    <div  style={{ width: '20%' }}>
                        <ReactECharts option={option} notMerge style={{ width: '100%', height: 'calc(100% - 1.0417rem)' }} />
                        <div style={{textAlign:'center',fontSize:'0.7292rem' }}>{t('电池SOC')}</div>
                    </div>
                    <div style={{ width: '80%',display:'flex' }}>
                        <div className={styles.topOne}>
                            <div className={styles.value} style={{color:"rgba(44,255,204,1)",fontSize:'1.0417rem',textAlign:'center'}}>{allData?.pcs?.onlineState?(allData?.pcs?.onlineState==1?t('在线'):t('离线')): '-'}</div>
                            <div className={styles.label}>{t('PCS状态')}</div>
                            <div className={styles.bottomDes} style={{ background: `url(${path}) center center no-repeat`, }}></div>
                        </div>
                        <div className={styles.topOne}>
                            <div className={styles.value} style={{color: token.color4,fontSize:'1.0417rem',}}>{allData?.tmeter?.totalActivePower || '0'}</div>
                            <div className={styles.label}>{t('电表功率/kW')}</div>
                            <div className={styles.bottomDes} style={{ background: `url(${path}) center center no-repeat`, }}></div>

                        </div>
                        <div className={styles.topOne}>
                            <div className={styles.value} style={{color: token.color4,fontSize:'1.0417rem',textAlign:'center'}}>{allData?.pcs?.totalActivePower || '0'}</div>
                            <div className={styles.label}>{t('PCS功率/kW')}</div>
                            <div className={styles.bottomDes} style={{ background: `url(${path}) center center no-repeat`, }}></div>

                        </div>
                        <div className={styles.topOne}>
                            <div className={styles.value} style={{color: token.color4,fontSize:'1.0417rem',textAlign:'center'}}>{allData?.bms?.power || '0'}</div>
                            <div className={styles.label}>{t('BMS功率/kW')}</div>
                            <div className={styles.bottomDes} style={{ background: `url(${path}) center center no-repeat`, }}></div>

                        </div>
                    </div>
                </div>
                <div className={styles.bottomPic}>
                <img src={global.theme == 'default' ? OutDoorDefault : OutDoor} alt="" />
                </div>
            </div>
            <div className={styles.TodayEntity} style={{ backgroundColor: token.darkbgc,color: token.color1  }}>
                <CardModel
                    title={t('今日电能')+'(kWh)'}
                    content={<div className={styles.entityWrap}>
                        {todayData.map(it => {
                            return <>
                                <div className={styles.oneCard}>
                                    <div style={{ color: it.color, fontSize: '1.1458rem',fontFamily:'DingTalkJinBuTi' }}>
                                        {allData?.gmeter?.[it?.key]|| '0'}
                                    </div>
                                    <div className={styles.label} style={{ background: `url(${pathLeft}) left center no-repeat`, }}>
                                        {t(it.label)}
                                    </div>
                                </div>
                            </>
                        })}

                    </div>}
                />
            </div>
            <div className={styles.status} style={{ backgroundColor: token.darkbgc,color: token.color1 }}>
                <CardModel
                    title={t('通讯状态')}
                    content={<div className={styles.statusWrap}>
                        {status.map(it => {
                            return <div className={styles.statusOne} style={{backgroundColor:token.smallCard}}>
                                <span className={styles.title}>{it.title}</span>
                                <Icon className={styles.value} type={it.value ? 'icon-danxuan-xuanzhong' : 'icon-danxuan'} style={{ color: it.value ? token.color5 : token.color2, }} ></Icon>

                            </div>
                        })}
                    </div>}
                />
            </div>
        </div>
    )
}

export default Com