// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { CardModel } from "@/components";
import useIcon from "@/hooks/useIcon";
import { useSelector, useIntl } from "umi";
import { theme, Switch, Select, Tooltip } from "antd";
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

    const [profit, setProfit] = useState([
        {
            value: '',
            label: '总充电',
            key: 'dailyEarn',
            unit: currentPlant.priceUnit,
            color: '#E9641C',
            icon: 'icon-qushi'
        },
        {
            value: '',
            label: '累计收益',
            key: 'totalEarning',
            unit: currentPlant.priceUnit,
            color: '#03B4B4',
            icon: 'icon-qian'
        },
    ])
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
                <div className={styles.heard} style={{color: token.colorNormal }}>
                    <div className={styles.headLeftPart} style={{ backgroundColor: token.titleCardBgc, }}>
                        <div>
                            <span></span>
                            <span></span>
                            <Icon type='icon-zongchongdian'/>
                        </div>
                        <div></div>
                    </div>
                    <div className={styles.headLeftPart} style={{ backgroundColor: token.titleCardBgc,   }}></div>
                    <div className={styles.headLeftPart} style={{ backgroundColor: token.titleCardBgc,   }}></div>
                    <div className={styles.headLeftPart} style={{ backgroundColor: token.titleCardBgc,   }}></div>
                    <div className={styles.headLeftPart} style={{ backgroundColor: token.titleCardBgc,   }}></div>


                </div>
                <div className={styles.cneterPart} style={{ backgroundColor: token.titleCardBgc, color: token.colorNormal }}></div>
                <div className={styles.bottomPart} style={{ backgroundColor: token.titleCardBgc, color: token.colorNormal }}></div>

            </div>
        </>

    )
}

export default OverView