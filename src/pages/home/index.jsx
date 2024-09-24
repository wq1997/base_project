// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { CardModel } from "@/components";
import useIcon from "@/hooks/useIcon";
import { useSelector, useIntl } from "umi";
import { theme, Switch, Select, Descriptions } from "antd";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { getOverviewLiveData } from '@/services/plant'
import LinePicture from './components/LinePicture'
function OverView(props) {
    const { token } = theme.useToken();
    const Icon = useIcon();
    const [allData, setAllData] = useState({});
    const [checked, setChecked] = useState(true);
    const [power, setPower] = useState([
        {
            value: '0.000',
            label: '光伏',
            key: 'pvPower',
            unit: 'kW',
            color: 'rgb(14, 116, 225)',
            icon: 'icon-guangfu1'
        },
        {
            value: '0.000',
            label: '负载',
            key: 'loadPower',
            unit: 'kW',
            color: 'rgb(254, 135, 51)',
            icon: 'icon-sifufuzai'
        },
        {
            value: '0.000',
            label: '当前总功率',
            key: 'totalPower',
            unit: 'kW',
            color: 'rgb(11, 194, 213)',
            icon: 'icon-gongyezujian-yibiaopan'
        },
    ]);
    const intl = useIntl();
    let currentPlant = JSON.parse(localStorage.getItem('current'));
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    useEffect(() => {
    }, [token,])
    useEffect(() => {
        getOverviewData();
    }, [token, ])
    const changeCheck = (checked) => {
        setChecked(checked)
    }
    const contentStyle = useEmotionCss(({ token }) => {
        return {
            '.ant-descriptions-item-label': {
                color: `${token.colorNormal} !important`,
            }
        }
    });

    const getOverviewData = async () => {
        let { data } = await getOverviewLiveData({
            plantId: localStorage.getItem('plantId')
        });
        setAllData(data?.data);
        power.map((it) => {
            it.value = data?.data?.[it.key];
        });

    }

    const gridData = [
        {
            key: 'lineAbVol',
            label: 'AB线电压',
            unit: '(V)'
        },
        {
            key: 'lineBcVol',
            label: 'BC线电压',
            unit: '(V)'

        },
        {
            key: 'lineCaVol',
            label: 'CA线电压',
            unit: '(V)'

        },
        {
            key: 'phaseACur',
            label: 'A相电流',
            unit: '(A)'

        },
        {
            key: 'phaseBCur',
            label: 'B相电流',
            unit: '(A)'

        },
        {
            key: 'phaseCCur',
            label: 'C相电流',
            unit: '(A)'

        },
        {
            key: 'oilTemp',
            label: '变压器油温',
            unit: '(℃)'
        },
        {
            key: 'activePower',
            label: '有功功率',
            unit: '(kW)'

        },
        {
            key: 'reactivePower',
            label: '无功功率',
            unit: '(KVar)'
        },
        {
            key: 'factor',
            label: '功率因数',
            unit: ''
        },
    ];
    const pcsData = [
        {
            key: 'faultState',
            label: '故障状态',
            unit: ''
        },
        {
            key: 'warnState',
            label: '告警状态',
            unit: ''
        },
        {
            key: 'activePower',
            label: '有功功率',
            unit:  '(kW)'
        },
        {
            key: 'totalDischargeEnergy',
            label: '总放电电量',
            unit:  '(kWh)'
        },
        {
            key: 'totalChargeEnergy',
            label: '总充电电量',
            unit:  '(kWh)'
        },
        {
            key: 'todayDischargeEnergy',
            label: '日放电电量',
            unit:  '(kWh)'
        },
        {
            key: 'todayChargeEnergy',
            label: '日充电电量',
            unit: '(kWh)'
        },
        {
            key: 'lineAbVol',
            label: 'AB线电压',
            unit: '(V)'
        },
        {
            key: 'lineBcVol',
            label: 'BC线电压',
            unit: '(V)'

        },
        {
            key: 'lineCaVol',
            label: 'CA线电压',
            unit: '(V)'

        },
        {
            key: 'phaseACur',
            label: 'A相电流',
            unit: '(A)'

        },
        {
            key: 'phaseBCur',
            label: 'B相电流',
            unit: '(A)'

        },
        {
            key: 'phaseCCur',
            label: 'C相电流',
            unit: '(A)'

        },

    ];
    const pcsModel = [
        {
            key: 'startState',
            label: '状态',
            unit: ''
        },
        {
            key: 'power',
            label: '直流功率',
            unit: '(kW)'

        },
        {
            key: 'soc',
            label: 'SOC',
            unit: '(%)'

        },
        {
            key: 'soh',
            label: 'SOH',
            unit: '(%)'

        },
    ]
    return (
        <>
            <div className={styles.container} style={{ color: token.titleColor }}>
                <div className={styles.title} style={{ backgroundColor: token.titleCardBgc, color: token.colorNormal }}>
                    {checked ? <div style={{ height: '32px' }}>
                        {/* {t('并网点')}:
                        <Select
                            style={{
                                width: 200,
                                marginLeft: '10px'
                            }}
                            key={grids?.[0]?.id}
                            defaultValue={grids?.[0]?.id}
                            onChange={changeGrid}
                        >
                            {grids && grids.map(item => {
                                return (<Option key={item.id} value={item.id}>{item.gridPointName}</Option>);
                            })
                            }
                        </Select> */}
                    </div> : <div style={{ height: '32px' }}></div>}
                    <Switch className={styles.right} checkedChildren={t("总览列表")} unCheckedChildren={t("接线图")} onChange={changeCheck} defaultChecked={checked} />
                </div>
                {checked ? <div className={styles.contentWrap}>
                     <> <div className={styles.heard} style={{ color: token.colorNormal }}>
                        <div className={styles.headLeftPart} style={{ backgroundColor: token.titleCardBgc, }}>
                            <div className={styles.line}>
                                <span className={styles.label}>{t('总充电')}</span>
                                <span className={styles.value} style={{ color: 'rgb(14, 116, 225)' }}>{allData?.totalCEnergy?.split(' ')?.[0]}<span className={styles.unit} style={{ color: token.colorNormal }}>{`(${allData?.totalCEnergy?.split(' ')?.[1]})`}</span></span>
                                <Icon className={styles.icon} type='icon-zongchongdian' />
                            </div>
                            <div className={styles.line}>
                                <span className={styles.label}>{t('总放电')}</span>
                                <span className={styles.value} style={{ color: 'rgb(245, 221, 59)' }}>{allData?.totalDEnergy?.split(' ')?.[0]}<span className={styles.unit} style={{ color: token.colorNormal }}>{`(${allData?.totalDEnergy?.split(' ')?.[1]})`}</span></span>
                                <Icon className={styles.icon} type='icon-zongfangdian' />
                            </div>
                        </div>
                        <div className={styles.headLeftPart} style={{ backgroundColor: token.titleCardBgc, }}>
                            <div className={styles.line}>
                                <span className={styles.label}>{t('日充电')}</span>
                                <span className={styles.value} style={{ color: 'rgb(11, 194, 213)' }}>{allData?.dayChargeEnergy?.split(' ')?.[0]}<span className={styles.unit} style={{ color: token.colorNormal }}>{`(${allData?.dayChargeEnergy?.split(' ')?.[1]})`}</span></span>
                                <Icon className={styles.icon} type='icon-richongdian' />
                            </div>
                            <div className={styles.line}>
                                <span className={styles.label}>{t('日放电')}</span>
                                <span className={styles.value} style={{ color: 'rgb(254, 135, 51)' }}>{allData?.dayDischargeEnergy?.split(' ')?.[0]}<span className={styles.unit} style={{ color: token.colorNormal }}>{`(${allData?.dayDischargeEnergy?.split(' ')?.[1]})`}</span></span>
                                <Icon className={styles.icon} type='icon-rifangdian' />
                            </div>
                        </div>
                        {power.map(it => {
                            return (
                                <div className={styles.headrightPart} style={{ backgroundColor: token.titleCardBgc, }}>
                                    <div className={styles.value} style={{ color: it.color }}>
                                        {it.value}
                                        <span className={styles.unit} style={{ color: token.colorNormal }}>({it.unit})</span>
                                        <div className={styles.label} style={{ color: token.colorNormal }}>{t(it.label)}</div>
                                    </div>
                                    <Icon className={styles.icon} style={{ color: it.color }} type={it.icon} />
                                </div>
                            )
                        })}
                    </div>
                        <div className={styles.oneGrid}>
                            <div className={styles.cneterPart} style={{ backgroundColor: token.titleCardBgc, color: token.colorNormal }}>
                                <CardModel
                                    title='1#Transformer'
                                    content={
                                        <>
                                            <Descriptions
                                                column={{
                                                    xs: 1,
                                                    sm: 2,
                                                    md: 3,
                                                    lg: 4,
                                                    xl: 5,
                                                    xxl: 5,
                                                }}
                                                items={gridData.map(it => {
                                                    return {
                                                        label: t(it.label) + `${it.unit}`,
                                                        // label: t(it.label),
                                                        key: it.key,
                                                        children: allData?.msc?.[0]?.[it.key]
                                                    }
                                                })
                                                }
                                                className={contentStyle}
                                            />
                                        </>
                                    }
                                />
                            </div>
                            {
                                allData?.msc?.map((onePcs, i) => {
                                    return (
                                        <div className={styles.onePcs}>
                                            <div className={styles.bottomPart} style={{ backgroundColor: token.titleCardBgc, color: token.colorNormal }}>
                                                <CardModel
                                                    title={'PCS' + (i + 1)}
                                                    content={
                                                        <>
                                                            <div className={styles.totalPcs} style={{ backgroundColor: token.lightTreeBgc }}>
                                                                <Descriptions
                                                                    column={{
                                                                        xs: 1,
                                                                        sm: 2,
                                                                        md: 3,
                                                                        lg: 4,
                                                                        xl: 5,
                                                                        xxl: 5,
                                                                    }}
                                                                    items={pcsData.map(it => {
                                                                        return {
                                                                            label: t(it.label) + `${it.unit} `,
                                                                            key: it.key,
                                                                            children: onePcs?.pcs?.[it.key] || '--'
                                                                        }
                                                                    })
                                                                    }
                                                                    className={contentStyle}
                                                                />
                                                            </div>
                                                            <div className={styles.pcsModule}>
                                                                {onePcs?.pcs?.branch?.map((item, i) => {
                                                                    return <Descriptions
                                                                        className={contentStyle}
                                                                        style={{ backgroundColor: token.lightTreeBgc, padding: '16px 12px 8px 12px', borderRadius: '8px' }}
                                                                        column={1}
                                                                        title={"Module1#" + (i + 1)}
                                                                        items={pcsModel.map(it => {
                                                                            return {
                                                                                label: t(it.label) + `${it.unit}`,
                                                                                key: it.key,
                                                                                children: item[it.key] || '--'
                                                                            }
                                                                        })
                                                                        } />
                                                                })}
                                                            </div>

                                                        </>
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>

                    </> 
                </div> :<LinePicture />}

            </div>
        </>

    )
}

export default OverView