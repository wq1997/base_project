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
            label: '系统状态',
            value: '',
        },
        {
            key: 'batCdState',
            label: '电池充放电状态',
            value: '',
        }, {
            key: 'batFCFlag',
            label: '电池禁止充电标志',
            value: '',
        }, {
            key: 'batFDFlag',
            label: '电池禁止放电标志',
            value: '',
        }, {
            key: 'vol',
            label: '电压',
            value: '',
        }, {
            key: 'cur',
            label: '电流',
            value: '',
        }, {
            key: 'power',
            label:'功率',
            value: '',
        }, {
            key: 'soc',
            label:'SOC',
            value: '',
        }, {
            key: 'soe',
            label: 'SOE',
            value: '',
        }, {
            key: 'soh',
            label: 'SOH',
            value: '',
        }, {
            key: 'allowMaxChargePower',
            label:'充电功率限值',
            value: '',
        }, {
            key: 'allowMaxDischargePower',
            label: '放电功率限值',
            value: '',
        }, {
            key: 'allowMaxChargeCur',
            label: '充电电流限值',
            value: '',
        }, {
            key: 'allowMaxDischargeCur',
            label: '放电电流限值',
            value: '',
        }, {
            key: 'chargeVolLimit',
            label: '充电电压限值',
            value: '',
        }, {
            key: 'dischargeVolLimit',
            label: '放电电压限值',
            value: '',
        }, 
        {
            key: 'allowDischargeEnergy',
            label: '充电可用电量',
            value: '',
        },{
            key: 'allowDischargeEnergy',
            label: '放电可用电量',
            value: '',
        }, {
            key: 'bmsChargeAvalilableEnergy',
            label: '充电可用电能量',
            value: '',
        }, {
            key: 'bmsDischargeAvalilableEnergy',
            label:'放电可用电能量',
            value: '',
        },
        {
            key: 'bmsHistoryChargeEnergy',
            label:'堆历史充电电量',
            value: '',
        },
        {
            key: 'bmsHistorydischargeEnergy',
            label:'堆历史放电电量',
            value: '',
        }, {
            key: 'totalChargeCapacity',
            label:'历史充电电能量',
            value: '',
        }, {
            key: 'totalDischargeCapacity',
            label:'历史放电电能量',
            value: '',
        }, {
            key: 'cellVolMax',
            label:'单体最高电压',
            value: '',
        }, {
            key: 'cellVolMin',
            label:'单体最低电压',
            value: '',
        }, {
            key: 'cellVolMaxNo',
            label:'最高单体电压电芯序号',
            value: '',
        }, {
            key: 'cellVolMinNo',
            label:'最低单体电压电芯序号',
            value: '',
        },
        {
            key: 'cellTempMax',
            label:'单体最高温度',
            value: '',
        },
        {
            key: 'cellTempMin',
            label:'单体最低温度',
            value: '',
        },
        {
            key: 'cellTempMaxNo',
            label:'最高单体温度电芯序号',
            value: '',
        },
        {
            key: 'cellTempMinNo',
            label:'最低单体温度电芯序号',
            value: '',
        },
        {
            key: 'cellVolDiff',
            label:'堆单体压差',
            value: '',
        },
        {
            key: 'cellTempDiff',
            label:'堆单体温差',
            value: '',
        },
        {
            key: 'cycleCount',
            label:'系统充放电循环次数',
            value: '',
        },
        {
            key: 'positiveResistance',
            label:'系统正极最小绝缘电阻阻值',
            value: '',
        },
        {
            key: 'negativeResistance',
            label:'系统负极最小绝缘电阻阻值',
            value: '',
        },
        {
            key: 'cabinetTemp',
            label:'急停信号',
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
            <div className={styles.heapRealTimeData}>
                <CardModel
                    title={t('运行数据')}
                    content={
                        <div className={styles.content} style={{ backgroundColor: token.lightTreeBgc }}>
                            {BmsRealData?.map((it, index) => {
                                return (
                                    <div className={styles.item} style={{color:token.titleColor}}>
                                        <span className={styles.itemKeys}>{t(it.label)}:</span>
                                        <span className={styles.itemValues}>{data?.[it.key]}</span>
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