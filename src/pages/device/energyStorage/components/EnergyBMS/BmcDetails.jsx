import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { theme, Cascader } from "antd";
import styles from './index.less'
import { useSelector, useIntl } from "umi";
import {  getDevLiveDataList, getBmsDevList, getOfChildDevices } from '@/services/deviceTotal'
function Com({ id }) {
    const [dataBmc, setDataBmc] = useState([]);
    const { token } = theme.useToken();
    const [options, setOptions] = useState([]);
    const [value,setValue]=useState([]);
    const onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
        setValue(value);

    };
    const loadData = async(selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        const {data={}}=await getOfChildDevices({associateId:targetOption.id});
        // load options lazily
        setTimeout(() => {
            let arr=[];
            data?.data?.map(it=>{
                arr?.push({
                    label:it.name,
                    value: it.id,
                })
            })
            targetOption.children = [
                ...arr 
            ];
            setOptions([...options]);
        }, 200);
    };

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
        getOption();
    }, [id])
    const [BmcRealData, setBmcRealData] = useState([
        {
            key: 'bmcRunStatus',
            label: 'BMS系统状态',
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
        },
        {
            key: 'batFDFlag',
            label: '电池禁止放电标志',
            value: '',
        }, {
            key: 'preChargeContactState',
            label: '预充接触器状态',
            value: '',
        },
        {
            key: 'positiveContactState',
            label: '正极接触器状态',
            value: '',
        }, {
            key: 'negativeContactState',
            label: '负极接触器状态',
            value: '',
        },
        {
            key: 'vol',
            label: '电压',
            value: '',
        }, {
            key: 'cur',
            label: '电流',
            value: '',
        }, {
            key: 'power',
            label: '功率',
            value: '',
        }, {
            key: 'soc',
            label: 'SOC',
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
            label: '充电功率限值',
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
        }, {
            key: 'bmcDischargeAvalilableEnergy',
            label: '放电可用电量',
            value: '',
        }, {
            key: 'bmcChargeAvalilableEnergy',
            label: '充电可用电能量',
            value: '',
        }, {
            key: 'bmcDischargeAvalilableEnergy',
            label: '放电可用电能量',
            value: '',
        },
        {
            key: 'bmcHistoryChargeEnergy',
            label: '历史充电电量',
            value: '',
        },
        {
            key: 'bmcHistorydischargeEnergy',
            label: '历史放电电量',
            value: '',
        }, {
            key: 'totalChargeCapacity',
            label: '历史充电电能量',
            value: '',
        }, {
            key: 'totalDischargeCapacity',
            label: '历史放电电能量',
            value: '',
        }, {
            key: 'cellVolMax',
            label: '单体最高电压',
            value: '',
        }, {
            key: 'cellVolMin',
            label: '单体最低电压',
            value: '',
        }, {
            key: 'cellVolMaxNo',
            label: '最高单体电压电芯序号',
            value: '',
        }, {
            key: 'cellVolMinNo',
            label: '最低单体电压电芯序号',
            value: '',
        },
        {
            key: 'cellTempMax',
            label: '单体最高温度',
            value: '',
        },
        {
            key: 'cellTempMin',
            label: '单体最低温度',
            value: '',
        },
        {
            key: 'cellTempMaxNo',
            label: '最高单体温度电芯序号',
            value: '',
        },
        {
            key: 'cellTempMinNo',
            label: '最低单体温度电芯序号',
            value: '',
        },
        {
            key: 'cellVolDiff',
            label: '单体压差',
            value: '',
        },
        {
            key: 'cellTempDiff',
            label: '单体温差',
            value: '',
        },
        {
            key: 'clusterAvgTemp',
            label: '簇平均温度',
            value: '',
        },
        {
            key: 'cycleCount',
            label: '系统充放电循环次数',
            value: '',
        },
        {
            key: 'positiveResistance',
            label: '系统正极最小绝缘电阻阻值',
            value: '',
        },
        {
            key: 'negativeResistance',
            label: '系统负极最小绝缘电阻阻值',
            value: '',
        },
        {
            key: 'lcMode',
            label: '液冷机当前模式',
            value: '',
        },
        {
            key: 'wpState',
            label: '水泵状态',
            value: '',
        }, {
            key: 'csState',
            label: '压缩机状态',
            value: '',
        }, {
            key: 'lcRePoint',
            label: '制冷点',
            value: '',
        }, {
            key: 'lcHeatPoint',
            label: '加热点',
            value: '',
        }, {
            key: 'lcCoolDiff',
            label: '制冷回差',
            value: '',
        }, {
            key: 'lcHeatDiff',
            label: '制热回差',
            value: '',
        }, {
            key: 'lcOutletTemp',
            label: '出水温度',
            value: '',
        }, {
            key: 'lcBackTemp',
            label: '回水温度',
            value: '',
        }, {
            key: 'lcExhaustTemp',
            label: '排气温度',
            value: '',
        }, {
            key: 'lcEnvTemp',
            label: '环境温度',
            value: '',
        }, {
            key: 'lcInletPressure',
            label: '进水压力',
            value: '',
        },
        {
            key: 'lcOutletPressure',
            label: '出水压力',
            value: '',
        },
    ])
    useEffect(() => {
        getBmcData();
    }, [id,value])
  
    const getOption = async () => {
        let { data= { } } = await getBmsDevList({
            plantId: localStorage.getItem('plantId')
        })
        let arr = [];
        data?.data?.map((it, i) => {
            arr.push({
                ...it,
                label: it.name,
                value: it.associateId,
                isLeaf: false,
                disableCheckbox:true
            })
        });
        const {data:res={}}=await getOfChildDevices({associateId:arr[0].id});
        let newArr=[]
        res?.data?.map(it=>{
            newArr?.push({
                label:it.name,
                value: it.id,
            })
        });
        arr[0].children=[...newArr];
        setValue([[arr[0].value,res?.data?.[0]?.id]]);
        setOptions([...arr]);
    }
   
    const getBmcData = async () => {
        let httpArr=[]
        value.map(it=>{
            httpArr.push(it?.[1])
        })
        let { data } = await getDevLiveDataList({ devIds:httpArr });
        setDataBmc(data?.data);
    }

    return (
        <div className={styles.detailsWrap} >
            <div className={styles.clusterSearch}>
                <Cascader
                    value={value}
                    options={options}
                    loadData={loadData}
                    onChange={onChange}
                    changeOnSelect ={false}
                    multiple={true}
                    showCheckedStrategy={Cascader.SHOW_CHILD}
                    maxTagCount={1}
                    style={{width:'12.5rem'}}
                    allowClear={false}
                    />

            </div>
            <div className={styles.clusterRealTimeData}>
            {dataBmc?.map(one=>{
                return<CardModel
                title={one.name}
                content={
                    <div className={styles.content} style={{ backgroundColor: token.lightTreeBgc }}>
                        {BmcRealData?.map((it, index) => {
                            return (
                                <div className={styles.item} style={{ color: token.titleColor }}>
                                    <span className={styles.itemKeys}>{t(it.label)}:</span>
                                    <span className={styles.itemValues}>{one?.[it.key]}</span>
                                </div>
                            )
                        })}
                    </div>
                }
            />
            })}
                

            </div>

        </div>
    )
}

export default Com