// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { CardModel } from "@/components";
import useIcon from "@/hooks/useIcon";
import { useSelector, useIntl } from "umi";
import { theme, Switch, Select, Descriptions } from "antd";
import { getGridPointPower, getPlantEnergyFee } from '@/services/home'
import { getEnergyFeeByTime } from '@/services/report'
import { getGridPointList } from '@/services/policy'
import dayjs from 'dayjs';

function OverView(props) {
    const { token } = theme.useToken();
    const Icon = useIcon();
    const [options, setOptions] = useState({});
    const [grids, setGrids] = useState([]);
    const [currntGrid, setCurrntGrid] = useState();

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

    }, [token, currntGrid])
    const [electricityStatistics, setElectricityStatistics] = useState([
        {
            value: '',
            label: '储能累计充电量',
            key: 'energyInEnergy',
            unit: '',
            color: '#F3DF2E'
        },
        {
            value: '',
            label: '储能累计放电量',
            key: 'energyOutEnergy',
            unit: '',
            color: '#D53D3D'
        },
        {
            value: '',
            label: '光伏累计发电量',
            key: 'pvOutEnergy',
            unit: '',
            color: '#3072E1'
        },
        {
            value: '',
            label: '充电桩累计充电量',
            key: 'chargeInEnergy',
            unit: '',
            color: '#03B4B4'
        },
    ]);
    let detailsPartData = [
        {
            key: 'name',
            label: t('电站名称'),
            span: 2
        },
        {
            key: 'installDateVo',
            label: t('建站日期'),
        },
        {
            key: 'typeName',
            label: t('电站类型'),

        },
        {
            key: 'designPower',
            label: `${t('储能装机功率')}(kW)`,
        },
        {
            key: 'capacity',
            label: `${t('储能装机容量')}(kWh)`,
        },
        {
            key: 'pvCapacity',
            label: `${t('光伏装机容量')}(kWh)`,
        },
        {
            key: 'chargePileCapacity',
            label: `${t('充电桩装机容量')}(kWh)`,
        },
        {
            key: 'position',
            label: t('电站位置'),
            span: 2
        },
    ]
    const getOptions = async () => {
        let { data: energyData } = await getEnergyFeeByTime({
            plantId: localStorage.getItem('plantId'),
            time: time.format('YYYY-MM-DD'),
            type: 0,
        });
        let pvOutEnergy = [];
        let energyInEnergy = [];
        let energyOutEnergy = [];
        let pvInEnergy = [];
        let chargeInEnergy = [];
        let arrX = [];
        energyData?.data?.map((it) => {
            pvOutEnergy.push(it.pvOutEnergy);
            energyInEnergy.push(it.energyInEnergy);
            energyOutEnergy.push(it.energyOutEnergy);
            pvInEnergy.push(it.pvInEnergy);
            chargeInEnergy.push(it.chargeInEnergy);
            arrX.push(dayjs(it?.date).format('YYYY-MM-DD'))
        })
        setData(data.data);
        setDateX(arrX);
        setDataY({ pvOutEnergy, energyInEnergy, energyOutEnergy, pvInEnergy, chargeInEnergy })
    };

    const getGrid = async () => {
        let { data: grid } = await getGridPointList({
            plantId: localStorage.getItem('plantId')
        })
        setGrids(grid?.data);
        setCurrntGrid(grid?.data?.[0]?.id)
    }

    const getPlantLabelData = async () => {
        let { data } = await getPlantEnergyFee({
            plantId: localStorage.getItem('plantId')
        });
        let arr = [];
        let arr1 = [];
        electricityStatistics?.map(it => {
            arr.push({
                ...it,
                value: data.data[it.key].split(' ')[0],
                unit: data.data[it.key].split(' ')[1],
            })
        })
        profit?.map(it => {
            arr1.push({
                ...it,
                value: data.data[it.key],
            })
        })
        setProfit([...arr1]);
        setElectricityStatistics([...arr])
    }
    const onChange = (e) => {
        setCurrntGrid(e.target.value);
    };

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
    const pcsModel = [
        {
            key: 'startState',
            label: '状态',
            unit: ''
        },
        {
            key: 'startState',
            label: '直流功率',
            unit: '(kW)'

        },
        {
            key: 'startState',
            label: 'SOC',
            unit: '(%)'

        },
        {
            key: 'startState',
            label: 'SOH',
            unit: '(%)'

        },
    ]
    return (
        <>

            <div className={styles.container} style={{ color: token.titleColor }}>
                <div className={styles.title} style={{ backgroundColor: token.titleCardBgc, color: token.colorNormal }}>
                    <div>
                        {t('并网点')}:
                        <Select
                            style={{
                                width: 200,
                                marginLeft: '10px'
                            }}
                            allowClear
                            options={[
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                            ]}
                        />
                    </div>
                    <Switch className={styles.right} checkedChildren="总览列表" unCheckedChildren="接线图" defaultChecked />
                </div>
                <div className={styles.heard} style={{ color: token.colorNormal }}>
                    <div className={styles.headLeftPart} style={{ backgroundColor: token.titleCardBgc, }}>
                        <div className={styles.line}>
                            <span className={styles.label}>{t('总充电')}</span>
                            <span className={styles.value} style={{ color: 'rgb(14, 116, 225)' }}>{'0.00'}<span className={styles.unit} style={{ color: token.colorNormal }}>(MWh)</span></span>
                            <Icon className={styles.icon} type='icon-zongchongdian' />
                        </div>
                        <div className={styles.line}>
                            <span className={styles.label}>{t('总放电')}</span>
                            <span className={styles.value} style={{ color: 'rgb(245, 221, 59)' }}>{'0.00'}<span className={styles.unit} style={{ color: token.colorNormal }}>(MWh)</span></span>
                            <Icon className={styles.icon} type='icon-zongfangdian' />
                        </div>
                    </div>
                    <div className={styles.headLeftPart} style={{ backgroundColor: token.titleCardBgc, }}>
                        <div className={styles.line}>
                            <span className={styles.label}>{t('日充电')}</span>
                            <span className={styles.value} style={{ color: 'rgb(11, 194, 213)' }}>{'0.00'}<span className={styles.unit} style={{ color: token.colorNormal }}>(MWh)</span></span>
                            <Icon className={styles.icon} type='icon-richongdian' />
                        </div>
                        <div className={styles.line}>
                            <span className={styles.label}>{t('日放电')}</span>
                            <span className={styles.value} style={{ color: 'rgb(254, 135, 51)' }}>{'0.00'}<span className={styles.unit} style={{ color: token.colorNormal }}>(MWh)</span></span>
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
                                            key: it.key,
                                            children: it.label
                                        }
                                    })


                                    } />
                            </>
                        }
                    />

                </div>
                <div className={styles.bottomPart} style={{ backgroundColor: token.titleCardBgc, color: token.colorNormal }}>
                    <CardModel
                        title='PCS1'
                        content={
                            <>
                                <div className={styles.totalPcs} style={{ backgroundColor: token.cardBgc }}>
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
                                                label: t(it.label) + `${it.unit} `,
                                                key: it.key,
                                                children: it.label
                                            }
                                        })
                                        } />
                                </div>
                                <div className={styles.pcsModule}>
                                    {[...Array(8)].map((item, i) => {
                                        return <Descriptions
                                            style={{ backgroundColor: token.cardBgc,padding:'16px 12px 8px 12px',borderRadius:'8px' }}
                                            column={1}
                                            title={"Module1#" + (i + 1)}
                                            items={pcsModel.map(it => {
                                                return {
                                                    label: t(it.label) + `${it.unit}`,
                                                    key: it.key,
                                                    children: '--' || it.label
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
        </>

    )
}

export default OverView