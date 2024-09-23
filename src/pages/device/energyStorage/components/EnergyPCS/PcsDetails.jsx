// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { theme, Select} from "antd";
import dayjs from 'dayjs';
import styles from './index.less'
import { getPcsNowDataById, } from '@/services/deviceTotal'
import { useSelector, useIntl } from "umi";

function Com({ id }) {
    const [data, setData] = useState('');
    const { token } = theme.useToken();
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }


    useEffect(() => {
        getData();
    }, [id]);
    const [pcsRealData, setPcsRealData] = useState([
        {
            key: 'totalDischargeEnergy',
            label: '累计交流放电电量',
            value: '',
        },
        {
            key: 'totalChargeEnergy',
            label: '累计交流充电电量',
            value: '',
        }, {
            key: 'todayDischargeEnergy',
            label: '当天交流放电电量',
            value: '',
        }, {
            key: 'todayChargeEnergy',
            label: '当天交流充电电量',
            value: '',
        }, {
            key: 'activePower',
            label: '交流母线总有功功率',
            value: '',
        }, {
            key: 'setPower',
            label: '有功功率设置值',
            value: '',
        }, {
            key: 'phaseAActivePower',
            label: '交流母线A相有功功率',
            value: '',
        }, {
            key: 'phaseBActivePower',
            label: t('交流母线B相有功功率'),
            value: '',
        }, {
            key: 'phaseCActivePower',
            label: '交流母线C相有功功率',
            value: '',
        }, {
            key: 'powerFactor',
            label: '交流母线总功率因数',
            value: '',
        }, {
            key: 'phaseAFactor',
            label: '交流母线A相功率因数',
            value: '',
        }, {
            key: 'phaseBFactor',
            label: '交流母线B相功率因数',
            value: '',
        }, {
            key: 'phaseCFactor',
            label: '交流母线C相功率因数',
            value: '',
        }, {
            key: 'reactivePower',
            label: '交流母线总无功功率',
            value: '',
        }, {
            key: 'phaseAReactivePower',
            label: '交流母线A相无功功率',
            value: '',
        }, {
            key: 'phaseBReactivePower',
            label: '交流母线B相无功功率',
            value: '',
        }, {
            key: 'phaseCReactivePower',
            label: '交流母线C相无功功率',
            value: '',
        }, {
            key: 'reactivePower',
            label: '额定在线容量',
            value: '',
        }, {
            key: 'apparentPower',
            label: '交流母线总视在功率',
            value: '',
        },
        {
            key: 'phaseAApparentPower',
            label: '交流母线A相视在功率',
            value: '',
        },
        {
            key: 'phaseBApparentPower',
            label: '交流母线B相视在功率',
            value: '',
        }, {
            key: 'phaseCApparentPower',
            label: '交流母线C相视在功率',
            value: '',
        }, {
            key: 'phaseACur',
            label: '交流母线A相电流',
            value: '',
        }, {
            key: 'phaseBCur',
            label: '交流母线B相电流',
            value: '',
        }, {
            key: 'phaseCCur',
            label: '交流母线C相电流',
            value: '',
        }, {
            key: 'freq',
            label: '交流母线频率',
            value: '',
        }, {
            key: 'lineAbVol',
            label: '交流母线AB线电压',
            value: '',
        },
        {
            key: 'lineBcVol',
            label: '交流母线BC线电压',
            value: '',
        },
        {
            key: 'lineCaVol',
            label: '交流母线CA线电压',
            value: '',
        },
        {
            key: 'moduleTemp',
            label: '模块温度',
            value: '',
        },
        {
            key: 'envTemp',
            label: '环境温度',
            value: '',
        },
        {
            key: 'cabinetTemp',
            label: '机柜温度',
            value: '',
        },
    ])
    const getData = async () => {
        let { data } = await getPcsNowDataById({ id })
        setData(data?.data);
    }
    let branch = [
        {
            key: 'name',
            label: '',
        },
        {
            key: 'power',
            label: t('直流功率'),
        },
        {
            key: 'cur',
            label: t('直流电流'),
        },
        {
            key: 'vol',
            label: t('直流输入电压'),
        },
    ]
    return (
        <div className={styles.detailsWrap}>
            <div className={styles.title}>
                <Select
                    mode="multiple"
                    style={{
                        width:'10.4167rem',
                    }}
                    placeholder="Please select"
                    defaultValue={['pcs0', 'pcs1']}
                    // onChange={handleChange}
                    options={
                        [0,1,2,3].map(it=>{
                            return {
                                label:`pcs${it}`,
                                value:it
                            }
                        })
                    }
                />

            </div>
            <div className={styles.detailsTopData} style={{ backgroundColor: token.lightTreeBgc }}>
                <CardModel
                    title={t('PCS1')}
                    content=
                    {<><div className={styles.contentwrap} style={{ backgroundColor: token.lightTreeBgc }}>
                        {pcsRealData?.map((it, index) => {
                            return (
                                <div className={styles.item}>
                                    <span className={styles.itemKeys}>{t(it.label)}:</span>
                                    <span className={styles.itemValues}>{data?.pcs?.[it?.key]}</span>
                                </div>
                            )
                        })}
                    </div>
                        <div className={styles.detailsBottomEcharts} style={{ backgroundColor: token.lightTreeBgc }}>
                            {data?.pscBatch && data?.pscBatch?.map((it, index) => {
                                return (
                                    <div className={styles.item}>
                                        {branch?.map((item, i) => {
                                            return (
                                                <div>
                                                    {item.label && <span className={styles.label}>{item?.label}:</span>}
                                                    <span className={styles.itemValues}>{it?.[item?.key]}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </>}
                />
            </div>
        </div>
    )
}

export default Com