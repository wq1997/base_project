
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import StatusStatistics from "./components/statusStatistics";
import ListofChargingStations from './components/listofChargingStations';
import { theme, Tooltip } from "antd";
import { useSelector, useIntl } from "umi";
import DC from '../../../assets/svg/DCpiles.svg'
import AC from '../../../assets/svg/ACpiles.svg'
import { getChargeStationStatus } from '@/services/deviceTotal'

function Com(props) {
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
    const [dataOfAcCharges, setDataOfAcCharges] = useState([
        {
            label: '充电中',
            key: 'acChargeTotal',
            value: '',
            unit: ''

        },
        {
            label: '已插枪',
            key: 'acPlugGunTotal',
            value: '',
            unit: ''

        },
        {
            label: '空闲中',
            key: 'acFreeTotal',
            value: '',
            unit: ''

        },
        {
            label: '故障中',
            key: 'acFaultTotal',
            value: '',
            unit: ''

        },
        {
            label: '日充电量',
            key: 'acChargeEnergyTotal',
            value: '',
            unit: ''

        },
    ]);
    const [dataOfDcCharges, setDataOfDcCharges] = useState([
        {
            label: '充电中',
            key: 'dcChargeTotal',
            value: '',
            unit: ''

        },
        {
            label: '已插枪',
            key: 'dcPlugGunTotal',
            value: '',
            unit: ''

        },
        {
            label: '空闲中',
            key: 'dcFreeTotal',
            value: '',
            unit: ''

        },
        {
            label: '故障中',
            key: 'dcFaultTotal',
            value: '',
            unit: ''
        },
        {
            label: '日充电量',
            key: 'dcChargeEnergyTotal',
            value: '',
            unit: 'kWh'
        },
    ]);

    useEffect(() => {
        getChargeStationStatusData();
    }, [])
    const getChargeStationStatusData = async () => {
        let { data } = await getChargeStationStatus({
            plantId: localStorage.getItem('plantId'),
        });
        dataOfAcCharges.map((it, i) => {
            it.value = data?.data[it.key];
            it.unit = i === 4 ? 'kWh' : `/${data?.data['acTotal']}`
        });
        dataOfDcCharges.map((it, i) => {
            it.value = data?.data[it.key];
            it.unit = i === 4 ? 'kWh' : `/${data?.data['dcTotal']}`
        });
        setDataOfAcCharges([...dataOfAcCharges]);
        setDataOfDcCharges([...dataOfDcCharges]);

    }
    return (
        <div className={styles.contents}>
            <div className={styles.chargStaus}><StatusStatistics /></div>
            <div className={styles.chargTypesDirect} style={{ backgroundColor: token.titleCardBgc, color: token.smallTitleColor }}>
                <div className={styles.leftImage}>
                    <img src={DC} alt="" />
                    <div>{t('直流桩')}</div>
                </div>
                <div className={styles.rightData}>
                    {dataOfDcCharges.map(it => {
                        return (
                            <div className={styles.chargingItems}>
                                   <Tooltip title={t(it.label)} >
                                   <span className={styles.label} >{t(it.label)}</span>
                                   </Tooltip>
                                <span style={{ marginLeft: '10px', marginRight: '25px' }}>:</span>
                                <span>{it.value}</span>
                                <span>{it.unit}</span>
                            </div>
                        )
                    })}
                </div>

            </div>
            <div className={styles.chargTypesAlternating} style={{ backgroundColor: token.titleCardBgc, color: token.smallTitleColor }}>
                <div className={styles.leftImage}>
                    <img src={AC} alt="" />
                    <div>{t('交流桩')}</div>
                </div>
                <div className={styles.rightData}>
                    {dataOfAcCharges.map(it => {
                        return (
                            <div className={styles.chargingItems}>
                                 <Tooltip title={t(it.label)} >
                                   <span className={styles.label} >{t(it.label)}</span>
                                   </Tooltip>
                                <span style={{ marginLeft: '10px', marginRight: '25px' }}>:</span>
                                <span>{it.value}</span>
                                <span>{it.unit}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.listOfCharg}><ListofChargingStations /></div>
        </div>
    )
}

export default Com