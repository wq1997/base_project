// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { theme, Select, } from "antd";
import styles from './index.less'
import { useSelector, useIntl } from "umi";
import { getMetersNowData } from '@/services/deviceTotal'

const { Option } = Select;
function Com({ id }) {
    const [data, setData] = useState('');
    const [currentClu, setCurrentClu] = useState(0);
    const [meterIndex, setMeterIndex] = useState(0);
    const [tranMeterIndex, setTranMeterIndex] = useState(0);
    const [pvMeterIndex, setPvMeterIndex] = useState(0);
    const [asMeterIndex, setAsMeterIndex] = useState(0);

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
    }, [id])
    const dataModel = [
        {
            label: '储能计量电表',
            key: 'meter',
            fun:(val)=>setMeterIndex(val),
            index:meterIndex,
            data: [
                {
                    label: 'A相电压',
                    key: 'phaseAVol'
                },
                {
                    label: 'B相电压',
                    key: 'phaseBVol'
                },
                {
                    label: 'C相电压',
                    key: 'phaseCVol'
                },
                {
                    label: 'A相电流',
                    key: 'phaseACur'
                },
                {
                    label: 'B相电流',
                    key: 'phaseBCur'
                },
                {
                    label: 'C相电流',
                    key: 'phaseCCur'
                },
                {
                    label: 'A相有功功率',
                    key: 'phaseAActivePower'
                },
                {
                    label: 'B相有功功率',
                    key: 'phaseBActivePower'
                },
                {
                    label: 'C相有功功率',
                    key: 'phaseCActivePower'
                },
                {
                    label: 'A相无功功率',
                    key: 'phaseAReactivePower'
                },
                {
                    label: 'B相无功功率',
                    key: 'phaseBReactivePower'
                },
                {
                    label: 'C相无功功率',
                    key: 'phaseCReactivePower'
                },
                {
                    label: 'A相功率因数',
                    key: 'phaseAFactor'
                },
                {
                    label: 'B相功率因数',
                    key: 'phaseBFactor'
                },
                {
                    label: 'C相功率因数',
                    key: 'phaseCFactor'
                },
                {
                    label: '总功率因数',
                    key: 'totalFactor'
                },
                {
                    label: '总有功功率',
                    key: 'power'
                },
                {
                    label: '总无功功率',
                    key: 'reactivePower'
                },
                {
                    label: '电网频率',
                    key: 'totalFreq'
                },
                {
                    label: '累计放电电量',
                    key: 'totalDischargeEnergy'
                },
                {
                    label: '累计充电电量',
                    key: 'totalChargeEnergy'
                },
            ]
        },
        {
            label: '负载电表',
            key: 'tranMeter',
            index:tranMeterIndex,
            fun:(val)=>setTranMeterIndex(val),
            data: [
                {
                    label: 'A相电压',
                    key: 'phaseAVol'
                },
                {
                    label: 'B相电压',
                    key: 'phaseBVol'
                },
                {
                    label: 'C相电压',
                    key: 'phaseCVol'
                },
                {
                    label: 'A相电流',
                    key: 'phaseACur'
                },
                {
                    label: 'B相电流',
                    key: 'phaseBCur'
                },
                {
                    label: 'C相电流',
                    key: 'phaseCCur'
                },
                {
                    label: 'A相有功功率',
                    key: 'phaseAActivePower'
                },
                {
                    label: 'B相有功功率',
                    key: 'phaseBActivePower'
                },
                {
                    label: 'C相有功功率',
                    key: 'phaseCActivePower'
                },
                {
                    label: 'A相无功功率',
                    key: 'phaseAReactivePower'
                },
                {
                    label: 'B相无功功率',
                    key: 'phaseBReactivePower'
                },
                {
                    label: 'C相无功功率',
                    key: 'phaseCReactivePower'
                },
                {
                    label: 'A相功率因数',
                    key: 'phaseAFactor'
                },
                {
                    label: 'B相功率因数',
                    key: 'phaseBFactor'
                },
                {
                    label: 'C相功率因数',
                    key: 'phaseCFactor'
                },
                {
                    label: '总功率因数',
                    key: 'totalFactor'
                },
                {
                    label: '总有功功率',
                    key: 'power'
                },
                {
                    label: '总无功功率',
                    key: 'reactivePower'
                },
                {
                    label: '电网频率',
                    key: 'totalFreq'
                },
                {
                    label: '累计放电电量',
                    key: 'totalDischargeEnergy'
                },
                {
                    label: '累计充电电量',
                    key: 'totalChargeEnergy'
                },
            ]
        },
        {
            label: '光伏电表',
            key: 'pvMeter',
            index:pvMeterIndex,
            fun:(val)=>setPvMeterIndex(val),
            data: [
                {
                    label: 'A相电压',
                    key: 'phaseAVol'
                },
                {
                    label: 'B相电压',
                    key: 'phaseBVol'
                },
                {
                    label: 'C相电压',
                    key: 'phaseCVol'
                },
                {
                    label: 'A相电流',
                    key: 'phaseACur'
                },
                {
                    label: 'B相电流',
                    key: 'phaseBCur'
                },
                {
                    label: 'C相电流',
                    key: 'phaseCCur'
                },
                {
                    label: 'A相有功功率',
                    key: 'phaseAActivePower'
                },
                {
                    label: 'B相有功功率',
                    key: 'phaseBActivePower'
                },
                {
                    label: 'C相有功功率',
                    key: 'phaseCActivePower'
                },
                {
                    label: 'A相无功功率',
                    key: 'phaseAReactivePower'
                },
                {
                    label: 'B相无功功率',
                    key: 'phaseBReactivePower'
                },
                {
                    label: 'C相无功功率',
                    key: 'phaseCReactivePower'
                },
                {
                    label: 'A相视在功率',
                    key: 'apparentPowerA'
                },
                {
                    label: 'B相视在功率',
                    key: 'apparentPowerB'
                },
                {
                    label: 'C相视在功率',
                    key: 'apparentPowerC'
                },
                {
                    label: '总视在功率',
                    key: 'apparentPower'
                },
                {
                    label: 'A相功率因数',
                    key: 'phaseAFactor'
                },
                {
                    label: 'B相功率因数',
                    key: 'phaseBFactor'
                },
                {
                    label: 'C相功率因数',
                    key: 'phaseCFactor'
                },
                {
                    label: '总功率因数',
                    key: 'totalFactor'
                },
                {
                    label: '总无功功率',
                    key: 'reactivePower'
                },
                {
                    label: '频率',
                    key: 'freq'
                },
            ]
        },
        {
            label: '辅助电源电表',
            key: 'asMeter',
            index:asMeterIndex,
            fun:(val)=>setAsMeterIndex(val),
            data: [
                {
                    label: 'A相电压',
                    key: 'phaseAVol'
                },
                {
                    label: 'B相电压',
                    key: 'phaseBVol'
                },
                {
                    label: 'C相电压',
                    key: 'phaseCVol'
                },
                {
                    label: 'A相电流',
                    key: 'phaseACur'
                },
                {
                    label: 'B相电流',
                    key: 'phaseBCur'
                },
                {
                    label: 'C相电流',
                    key: 'phaseCCur'
                },
                {
                    label: 'A相有功功率',
                    key: 'phaseAActivePower'
                },
                {
                    label: 'B相有功功率',
                    key: 'phaseBActivePower'
                },
                {
                    label: 'C相有功功率',
                    key: 'phaseCActivePower'
                },
                {
                    label: 'A相无功功率',
                    key: 'phaseAReactivePower'
                },
                {
                    label: 'B相无功功率',
                    key: 'phaseBReactivePower'
                },
                {
                    label: 'C相无功功率',
                    key: 'phaseCReactivePower'
                },
                {
                    label: 'A相功率因数',
                    key: 'phaseAFactor'
                },
                {
                    label: 'B相功率因数',
                    key: 'phaseBFactor'
                },
                {
                    label: 'C相功率因数',
                    key: 'phaseCFactor'
                },
                {
                    label: '总功率因数',
                    key: 'totalFactor'
                },
                {
                    label: '总有功功率',
                    key: 'power'
                },
                {
                    label: '总无功功率',
                    key: 'reactivePower'
                },
                {
                    label: '电网频率',
                    key: 'totalFreq'
                },
                {
                    label: '累计放电电量',
                    key: 'totalDischargeEnergy'
                },
                {
                    label: '累计充电电量',
                    key: 'totalChargeEnergy'
                },
            ]
        },
    ]

    const getData = async () => {
        let { data } = await getMetersNowData({ id:localStorage.getItem('plantId') });
        setData({ ...data?.data })
        // setData({...data?.data?.tMeter,...data?.data?.gMeter});
    }
    return (
        <div className={styles.detailsWrap} >
            <div className={styles.heapRealTimeData}>
                {dataModel.map(one => {
                    return (<div className={styles.oneModel}>
                        <div className={styles.title} style={{color:token.titleColor}}>
                            {t(one.label)}:
                            <Select
                                style={{ width: '240px', marginLeft: '10px' }}
                                options={data?.[one.key]?.map((op, i) => {
                                    return {
                                        value: i,
                                        label: `${t('表')}${i + 1}`
                                    }
                                })}
                                defaultValue={0}
                                onChange={(val,)=>{
                                    one.fun(val);
                                    console.log(val,1122,data?.[one?.key]?.[one.index]);
                                }}
                            />
                        </div>
                        <div className={styles.content} >
                            {one.data?.map((it, index) => {
                                return (
                                    // <> {it.label}</>
                                    <div className={styles.item} style={{ backgroundColor: token.lightTreeBgc, color: token.colorLittle }}>
                                        <span className={styles.itemKeys}>{t(it?.label)}:</span>
                                        <span className={styles.itemValues}>{data?.[one?.key]?.[one.index]?.[it.key]}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>)
                })}


            </div>


        </div>
    )
}

export default Com