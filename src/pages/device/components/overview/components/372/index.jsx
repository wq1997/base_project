// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect } from 'react';
import styles from './index.less'
import { Button, theme } from "antd"
import { useIntl, useSelector } from "umi";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import CardModel from "../CardModel/index";
import useIcon from "@/hooks/useIcon";
import { getBurOverview2 } from '@/services/deviceTotal'
import { getQueryString } from "@/utils/utils";
import ReactECharts from "echarts-for-react";
import "echarts-liquidfill/src/liquidFill.js";
import OutDoor372Default from "../../../../../../../public/images/OutDoor372Default.svg";
import OutDoor372Dark from "../../../../../../../public/images/OutDoor372Dark.svg";
import classNames from "classnames";

function Com(props) {
    const [allData, setAllData] = useState([]);
    const [bmsClusterIndex, setBmsClusterIndex] = useState(0);
    const { token } = theme.useToken();
    const Icon = useIcon();
    const id = getQueryString("id");
    const global = useSelector(state => state.global);
    useEffect(() => {
        getData();
    }, [global.theme, global.locale])
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
                    data: data?.data?.bmc?.[1] ?
                        [(data?.data?.bmc?.[0]?.soc + data?.data?.bmc?.[1]?.soc) / 200 || 0, (data?.data?.bmc?.[0]?.soc + data?.data?.bmc?.[1]?.soc) / 200 || 0,] :
                        [+data?.data?.bmc?.[0]?.soc / 100 || 0, +data?.data?.bmc?.[0]?.soc / 100 || 0,], // data个数代表波浪数
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
                it.value = data.data?.bmsStatus[0]
            } else if (index === 1) {
                it.value = data.data?.pcsStatus
            } else if (index === 2) {
                it.value = data.data?.meterStatus
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

    ]);
    const todayData = [
        {
            key: 'dayChargeEnergy',
            // color: '#25FF00',
            label: '今日充电量'
        },
        {
            key: 'dayDischargeEnergy',
            // color: '#FF6300',
            label: '今日放电量'
        }, {
            key: 'monChargeEnergy',
            // color: token.color4,
            label: '本月充电量'
        }, {
            key: 'monDischargeEnergy',
            // color: token.color4,
            label: '本月放电量'
        }, {
            key: 'totalCEnergy',
            // color: token.color4,
            label: '累计充电量'
        }, {
            key: 'totalDEnergy',
            // color: token.color4,
            label: '累计放电量'
        },
    ];
    const value = useEmotionCss(() => {
        return {
            color: `${token.color4}`
        }
    })

    return (
        <div className={classNames(styles.content)}>
            <div
                className={styles.title}
                style={{ backgroundColor: token.titleCardBgc_2, color: token.color2 }}
            >
                {decodeURI(getQueryString("title"))}
                <div
                    className={styles.sn}
                    style={{ color: token.color3 }}
                >
                    <span>SN:</span>
                    <span>{props?.sn}</span>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.left}>
                    <div className={styles.leftItem} >
                        <CardModel
                            title={t('PCS信息')}
                            content={
                                <div className={styles.pcsWrap}>
                                    <div className={styles.pcsOne} style={{ width: '50%' }}>
                                        <div className={styles.pcsOneTitle}>
                                            <span style={{ paddingLeft: '2.0833rem' }}></span>
                                            <span style={{ fontSize: '1.0417rem' }}>
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
                                    <div className={styles.pcsOne} style={{ width: '50%' }}>
                                        <div className={styles.pcsOneTitle}>
                                            <span style={{ paddingLeft: '2.0833rem' }}></span>
                                            <span style={{ fontSize: '1.0417rem' }}>
                                                {t('电压/V')}
                                            </span>
                                        </div>
                                        <div className={styles.pcsOneBody}>
                                            <div className={styles.oneData}>
                                                <div className={styles.key}>AB</div>
                                                <div className={classNames(styles.value, value)}>{allData.pcs?.lineAbVol || '0'}</div>
                                            </div>
                                            <div className={styles.oneData}>
                                                <div className={styles.key}>BC</div>
                                                <div className={classNames(styles.value, value)}>{allData.pcs?.lineBcVol || '0'}</div>
                                            </div>
                                            <div className={styles.oneData}>
                                                <div className={styles.key}>CA</div>
                                                <div className={classNames(styles.value, value)}>{allData.pcs?.lineCaVol || '0'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                    <div className={styles.leftItem} >
                        <CardModel
                            title={t('今日电能') + '(kWh)'}
                            content={<div className={styles.entityWrap}>
                                {todayData.map(it => {
                                    return <>
                                        <div className={styles.oneCard}>
                                            <div className={styles.value} style={{ color: it.color, fontSize: '1.1458rem' }}>
                                                {allData?.energy?.[it?.key] || '0'}
                                            </div>
                                            <div className={styles.label}>
                                                {t(it.label)}
                                            </div>
                                        </div>
                                    </>
                                })}
                            </div>}
                        />
                    </div>
                </div>
                <div className={styles.center} >
                    <div className={styles.centerContent} style={{ backgroundColor: token.titleCardBgc_2, color: token.color1 }}>
                        <div className={styles.topData}>
                            <div style={{ width: '100%', display: 'flex', }}>
                                <div className={styles.topOne}>
                                    <ReactECharts option={option} notMerge style={{ width: '100%', height: 'calc(100% - 1.0417rem)' }} />
                                    <div className={styles.label}>{t('电池SOC')}</div>
                                </div>
                                <div className={styles.topOne}>
                                    <div style={{ color: "rgba(44,255,204,1)" }} className={styles.topOneLabel}>
                                        {allData?.pcs?.online == 1 ? t('在线') : t('离线')}
                                    </div>
                                    <div className={styles.label}>{t('PCS状态')}</div>
                                </div>
                                <div className={styles.topOne}>
                                    <div style={{ color: token.color4 }} className={styles.topOneLabel}>{allData?.batCdState}</div>
                                    <div className={styles.label}>{t('BMS充放电状态')}</div>
                                </div>
                                <div className={styles.topOne}>
                                    <div style={{ color: token.color4 }} className={styles.topOneLabel}>{allData?.soh || 0}%</div>
                                    <div className={styles.label}>{t('SOH')}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.bottomPic}>
                            <img src={global.theme == 'default' ? OutDoor372Default : OutDoor372Dark} alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.right1} >
                        <CardModel
                            title={t('通讯状态')}
                            content={<div className={styles.statusWrap}>
                                {status.map(it => {
                                    return <div className={styles.statusOne} style={{ backgroundColor: token.smallCard }}>
                                        <span className={styles.title}>{it.title}</span>
                                        <Icon className={styles.value} type={it.value ? 'icon-danxuan-xuanzhong' : 'icon-danxuan'} style={{ color: it.value ? token.color5 : token.color2, }} ></Icon>
                                    </div>
                                })}
                            </div>}
                        />
                    </div>
                    <div className={styles.right2} >
                        <CardModel
                            title={t('功率数据')}
                            content={
                                <div className={styles.powerData}>
                                    <div className={styles.powerDataItem}>
                                        <div className={styles.powerDataItemValue} style={{ color: token.color4 }}>{allData?.meter?.totalActivePower || '0'}</div>
                                        <div className={styles.powerDataItemLabel}>{t('电表功率')}/kW</div>
                                    </div>
                                    <div className={styles.powerDataItem}>
                                        <div className={styles.powerDataItemValue} style={{ color: token.color4 }}>{allData?.pcs?.activePower || '0'}</div>
                                        <div className={styles.powerDataItemLabel}>{t('PCS功率')}/kW</div>
                                    </div>
                                    <div className={styles.powerDataItem}>
                                        <div className={styles.powerDataItemValue} style={{ color: token.color4 }}>{parseFloat((allData?.bmc?.[0]?.power + allData?.bmc?.[1]?.power).toFixed(2)) || '0'}</div>
                                        <div className={styles.powerDataItemLabel}>{t('BMS功率')}/kW</div>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                    <div className={styles.right3} >
                        <CardModel
                            title={t('BMS信息')}
                            content={
                                <div className={styles.bmsInfo}>
                                    <div className={styles.bmsInfoBtn}>{allData?.bmc?.map((_, index) => <Button type={bmsClusterIndex === index ? "primary" : ""} onClick={() => setBmsClusterIndex(index)}>{intl.formatMessage({ id: 'BMS簇N' }, { value: index + 1 })}</Button>)}</div>
                                    <div className={styles.bmsContent}>
                                        <div className={styles.bmsOne}>
                                            <div className={styles.bmsTitle} style={{ color: token.color2 }}>
                                                {t('单体最高')}
                                            </div>
                                            <div className={styles.bmsBody}>
                                                <div className={styles.value}>
                                                    <div className={styles.valueOne}>
                                                        <div className={styles.right}>
                                                            <span className={styles.key} style={{}}>{t("No.")}</span>
                                                            <span className={classNames(value)}>{allData?.bmc?.[bmsClusterIndex]?.cellTempMaxNo || '0'}</span>
                                                        </div>
                                                        <div className={styles.left}>
                                                            <span className={styles.key} style={{}}>{t("温度/℃")}</span>
                                                            <span className={classNames(value)}>{allData?.bmc?.[bmsClusterIndex]?.cellTempMax || '0'}</span>
                                                        </div>

                                                    </div>
                                                    <div className={styles.valueOne}>
                                                        <div className={styles.right}>
                                                            <span className={styles.key} style={{}}>{t("No.")}</span>
                                                            <span className={classNames(value)}>{allData?.bmc?.[bmsClusterIndex]?.cellVolMaxNo || '0'}</span>
                                                        </div>
                                                        <div className={styles.left}>
                                                            <span className={styles.key} style={{}}>{t("电压/mV")}</span>
                                                            <span className={classNames(value)}>{allData?.bmc?.[bmsClusterIndex]?.cellVolMax || '0'}</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.bmsOne}>
                                            <div className={styles.bmsTitle} style={{ color: token.color2 }}>
                                                {t('单体最低')}
                                            </div>
                                            <div className={styles.bmsBody}>
                                                {/* <img src={BMS} alt="" /> */}
                                                <div className={styles.value}>
                                                    <div className={styles.valueOne}>

                                                        <div className={styles.right}>
                                                            <span className={styles.key} style={{}}>{t("No.")}</span>
                                                            <span className={classNames(value)}>{allData?.bmc?.[bmsClusterIndex]?.cellTempMinNo || '0'}</span>
                                                        </div>
                                                        <div className={styles.left}>
                                                            <span className={styles.key} style={{}}>{t("温度/℃")}</span>
                                                            <span className={classNames(value)}>{allData?.bmc?.[bmsClusterIndex]?.cellTempMin || '0'}</span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.valueOne}>
                                                        <div className={styles.right}>
                                                            <span className={styles.key} style={{}}>{t("No.")}</span>
                                                            <span className={classNames(value)}>{allData?.bmc?.[bmsClusterIndex]?.cellVolMinNo || '0'}</span>
                                                        </div>
                                                        <div className={styles.left}>
                                                            <span className={styles.key} style={{}}>{t("电压/mV")}</span>
                                                            <span className={classNames(value)}>{allData?.bmc?.[bmsClusterIndex]?.cellVolMin || '0'}</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Com