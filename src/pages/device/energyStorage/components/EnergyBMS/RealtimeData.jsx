import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { theme, Select } from "antd";
import styles from './index.less'
import { useSelector, useIntl } from "umi";
import { getBmsNowData, getBmcNowData,obtainBMSClustersList } from '@/services/deviceTotal'
const { Option } = Select;
function Com({ id }) {
    const [data, setData] = useState('');
    const [dataBmc, setDataBmc] = useState([]);
    const [currentClu, setCurrentClu] = useState(0);
    const activitesRef = useRef([]);
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
        getOption();
    }, [id])
    const [BmsRealData, setBmsRealData] = useState([
        {
            key: 'bmsRunStatus',
            label: t('系统状态'),
            value: '',
        },
        {
            key: 'batCdState',
            label: t('电池充放电状态'),
            value: '',
        }, {
            key: 'batFCFlag',
            label: t('电池禁止充电标志'),
            value: '',
        }, {
            key: 'batFDFlag',
            label: t('电池禁止放电标志'),
            value: '',
        }, {
            key: 'vol',
            label: t('电压'),
            value: '',
        }, {
            key: 'cur',
            label: t('电流'),
            value: '',
        }, {
            key: 'power',
            label: t('功率'),
            value: '',
        }, {
            key: 'soc',
            label: t('SOC'),
            value: '',
        }, {
            key: 'soe',
            label: t('SOE'),
            value: '',
        }, {
            key: 'soh',
            label: t('SOH'),
            value: '',
        }, {
            key: 'allowMaxChargePower',
            label: t('充电功率限值'),
            value: '',
        }, {
            key: 'allowMaxDischargePower',
            label: t('放电功率限值'),
            value: '',
        }, {
            key: 'allowMaxChargeCur',
            label: t('充电电流限值'),
            value: '',
        }, {
            key: 'allowMaxDischargeCur',
            label: t('放电电流限值'),
            value: '',
        }, {
            key: 'chargeVolLimit',
            label: t('充电电压限值'),
            value: '',
        }, {
            key: 'dischargeVolLimit',
            label: t('放电电压限值'),
            value: '',
        }, 
        {
            key: 'allowDischargeEnergy',
            label: t('充电可用电量'),
            value: '',
        },{
            key: 'allowDischargeEnergy',
            label: t('放电可用电量'),
            value: '',
        }, {
            key: 'bmsChargeAvalilableEnergy',
            label: t('充电可用电能量'),
            value: '',
        }, {
            key: 'bmsDischargeAvalilableEnergy',
            label: t('放电可用电能量'),
            value: '',
        },
        {
            key: 'bmsHistoryChargeEnergy',
            label: t('堆历史充电电量'),
            value: '',
        },
        {
            key: 'bmsHistorydischargeEnergy',
            label: t('堆历史放电电量'),
            value: '',
        }, {
            key: 'totalChargeCapacity',
            label: t('历史充电电能量'),
            value: '',
        }, {
            key: 'totalDischargeCapacity',
            label: t('历史放电电能量'),
            value: '',
        }, {
            key: 'cellVolMax',
            label: t('单体最高电压'),
            value: '',
        }, {
            key: 'cellVolMin',
            label: t('单体最低电压'),
            value: '',
        }, {
            key: 'cellVolMaxNo',
            label: t('最高单体电压电芯序号'),
            value: '',
        }, {
            key: 'cellVolMinNo',
            label: t('最低单体电压电芯序号'),
            value: '',
        },
        {
            key: 'cellTempMax',
            label: t('单体最高温度'),
            value: '',
        },
        {
            key: 'cellTempMin',
            label: t('单体最低温度'),
            value: '',
        },
        {
            key: 'cellTempMaxNo',
            label: t('最高单体温度电芯序号'),
            value: '',
        },
        {
            key: 'cellTempMinNo',
            label: t('最低单体温度电芯序号'),
            value: '',
        },
        {
            key: 'cellVolDiff',
            label: t('堆单体压差'),
            value: '',
        },
        {
            key: 'cellTempDiff',
            label: t('堆单体温差'),
            value: '',
        },
        {
            key: 'cycleCount',
            label: t('系统充放电循环次数'),
            value: '',
        },
        {
            key: 'positiveResistance',
            label: t('系统正极最小绝缘电阻阻值'),
            value: '',
        },
        {
            key: 'negativeResistance',
            label: t('系统负极最小绝缘电阻阻值'),
            value: '',
        },
        {
            key: 'cabinetTemp',
            label: t('急停信号'),
            value: '',
        },
    ])
    const [BmcRealData, setBmcRealData] = useState([
        {
            key: 'bmcRunStatus',
            label: t('BMS系统状态'),
            value: '',
        },
        {
            key: 'batCdState',
            label: t('电池充放电状态'),
            value: '',
        }, {
            key: 'batFCFlag',
            label: t('电池禁止充电标志'),
            value: '',
        }, 
        {
            key: 'batFDFlag',
            label: t('电池禁止放电标志'),
            value: '',
        }, {
            key: 'preChargeContactState',
            label: t('预充接触器状态'),
            value: '',
        }, 
        {
            key: 'positiveContactState',
            label: t('正极接触器状态'),
            value: '',
        }, {
            key: 'negativeContactState',
            label: t('负极接触器状态'),
            value: '',
        },
        {
            key: 'vol',
            label: t('电压'),
            value: '',
        }, {
            key: 'cur',
            label: t('电流'),
            value: '',
        }, {
            key: 'power',
            label: t('功率'),
            value: '',
        }, {
            key: 'soc',
            label: t('SOC'),
            value: '',
        }, {
            key: 'soe',
            label: t('SOE'),
            value: '',
        }, {
            key: 'soh',
            label: t('SOH'),
            value: '',
        }, {
            key: 'allowMaxChargePower',
            label: t('充电功率限值'),
            value: '',
        }, {
            key: 'allowMaxDischargePower',
            label: t('放电功率限值'),
            value: '',
        }, {
            key: 'allowMaxChargeCur',
            label: t('充电电流限值'),
            value: '',
        }, {
            key: 'allowMaxDischargeCur',
            label: t('放电电流限值'),
            value: '',
        }, {
            key: 'chargeVolLimit',
            label: t('充电电压限值'),
            value: '',
        }, {
            key: 'dischargeVolLimit',
            label: t('放电电压限值'),
            value: '',
        }, {
            key: 'bmcDischargeAvalilableEnergy',
            label: t('放电可用电量'),
            value: '',
        }, {
            key: 'bmcChargeAvalilableEnergy',
            label: t('充电可用电能量'),
            value: '',
        }, {
            key: 'apparentPower',
            label: t('放电可用电能量'),
            value: '',
        },
        {
            key: 'bmcHistoryChargeEnergy',
            label: t('历史充电电量'),
            value: '',
        },
        {
            key: 'bmcHistorydischargeEnergy',
            label: t('历史放电电量'),
            value: '',
        }, {
            key: 'totalChargeCapacity',
            label: t('历史充电电能量'),
            value: '',
        }, {
            key: 'totalDischargeCapacity',
            label: t('历史放电电能量'),
            value: '',
        }, {
            key: 'cellVolMax',
            label: t('单体最高电压'),
            value: '',
        }, {
            key: 'cellVolMin',
            label: t('单体最低电压'),
            value: '',
        }, {
            key: 'cellVolMaxNo',
            label: t('最高单体电压电芯序号'),
            value: '',
        }, {
            key: 'cellVolMinNo',
            label: t('最低单体电压电芯序号'),
            value: '',
        },
        {
            key: 'cellTempMax',
            label: t('单体最高温度'),
            value: '',
        },
        {
            key: 'cellTempMin',
            label: t('单体最低温度'),
            value: '',
        },
        {
            key: 'cellTempMaxNo',
            label: t('最高单体温度电芯序号'),
            value: '',
        },
        {
            key: 'cellTempMinNo',
            label: t('最低单体温度电芯序号'),
            value: '',
        },
        {
            key: 'cellVolDiff',
            label: t('单体压差'),
            value: '',
        },
        {
            key: 'cellTempDiff',
            label: t('单体温差'),
            value: '',
        },
        {
            key: 'clusterAvgTemp',
            label: t('簇平均温度'),
            value: '',
        },
        {
            key: 'cycleCount',
            label: t('系统充放电循环次数'),
            value: '',
        },
        {
            key: 'positiveResistance',
            label: t('系统正极最小绝缘电阻阻值'),
            value: '',
        },
        {
            key: 'negativeResistance',
            label: t('系统负极最小绝缘电阻阻值'),
            value: '',
        },
        {
            key: 'lcMode',
            label: t('液冷机当前模式'),
            value: '',
        },
        {
            key: 'wpState',
            label: t('水泵状态'),
            value: '',
        },{
            key: 'csState',
            label: t('压缩机状态'),
            value: '',
        },{
            key: 'lcRePoint',
            label: t('制冷点'),
            value: '',
        },{
            key: 'lcHeatPoint',
            label: t('加热点'),
            value: '',
        },{
            key: 'lcCoolDiff',
            label: t('制冷回差'),
            value: '',
        },{
            key: 'lcHeatDiff',
            label: t('制热回差'),
            value: '',
        },{
            key: 'lcOutletTemp',
            label: t('出水温度'),
            value: '',
        },{
            key: 'lcBackTemp',
            label: t('回水温度'),
            value: '',
        },{
            key: 'lcExhaustTemp',
            label: t('排气温度'),
            value: '',
        },{
            key: 'lcEnvTemp',
            label: t('环境温度'),
            value: '',
        },{
            key: 'lcInletPressure',
            label: t('进水压力'),
            value: '',
        },
        {
            key: 'lcOutletPressure',
            label: t('出水压力'),
            value: '',
        },
    ])
    useEffect(() => {
        getBmcData();
    }, [id, currentClu])
    const getData = async () => {
        let { data } = await getBmsNowData({ id })
        setData(data?.data);
    }
    const getOption = async() => {
        let { data } = await obtainBMSClustersList({ id })
        let arr=[];
        data?.data?.map((it,i)=>{
           arr.push({
                ...it,
                label: it.name,
                value:it.id
            })
        })
        activitesRef.current = arr;

    }
    const changeCluster = (value) => {
        setCurrentClu(value)
    }
    const getBmcData = async () => {
        let { data } = await getBmcNowData({ id,  });
        setDataBmc(data?.data)
    }

    return (
        <div className={styles.detailsWrap} >
            <div className={styles.heapRealTimeData}>
                <CardModel
                    title={t('运行数据')}
                    content={
                        <div className={styles.content} style={{ backgroundColor: token.lightTreeBgc }}>
                            {BmsRealData?.map((it, index) => {
                                return (
                                    <div className={styles.item}>
                                        <span className={styles.itemKeys}>{it.label}:</span>
                                        <span className={styles.itemValues}>{data?.[it.key]}</span>
                                    </div>
                                )
                            })}
                        </div>
                    }
                />
            </div>
            <div className={styles.clusterSearch}>
                <Select
                    style={{ width: 240 }}
                    onChange={changeCluster}
                    key={activitesRef.current[0]?.value}
                    defaultValue={0}
                >
                    {activitesRef.current && activitesRef.current.map((item,index) => {
                        return (<Option key={item.value} value={index}>{item.name}</Option>);
                    })
                    }
                </Select>

            </div>
            <div className={styles.clusterRealTimeData}>
                <CardModel
                    title={t('运行数据')}
                    content={
                        <div className={styles.content} style={{ backgroundColor: token.lightTreeBgc }}>
                            {BmcRealData?.map((it, index) => {
                                return (
                                    <div className={styles.item}>
                                        <span className={styles.itemKeys}>{it.label}:</span>
                                        <span className={styles.itemValues}>{dataBmc?.[it.key]}</span>
                                    </div>
                                )
                            })}
                        </div>
                    }
                />

            </div>

        </div>
    )
}

export default Com