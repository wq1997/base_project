
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import StatusStatistics from "./components/statusStatistics";
import ListofChargingStations from './components/listofChargingStations';
import { theme } from "antd";

function Com(props) {
    const { token } = theme.useToken();

    const dataOfCharges=[
        {
        name:'充电中',
        key:'charging',
        value:'1/10'
    },
    {
        name:'已插枪',
        key:'inserted',
        value:'1/10'
    },
    {
        name:'空闲中',
        key:'Idle',
        value:'1/10'
    },
    {
        name:'故障中',
        key:'Failing',
        value:'1/10'
    },
    {
        name:'日充电量',
        key:'dailyCharge',
        value:'1/10'
    },
]
    return (
        <div className={styles.contents}>
           <div className={styles.chargStaus}><StatusStatistics/></div>
           <div className={styles.chargTypesDirect} style={{backgroundColor:token.titleCardBgc,color:token.smallTitleColor}}>
            <div className={styles.leftImage}></div>
            <div className={styles.rightData}>
                {dataOfCharges.map(it=>{
                    return(
                        <div className={styles.chargingItems}>
                            <span>{it.name}</span>
                            <span>:</span>
                            <span>{it.value}</span>
                        </div>
                    )
                })}
            </div>
           </div>
           <div className={styles.chargTypesAlternating } style={{backgroundColor:token.titleCardBgc,color:token.smallTitleColor}}>
           <div className={styles.leftImage}></div>
            <div className={styles.rightData}>
            {dataOfCharges.map(it=>{
                    return(
                        <div className={styles.chargingItems}>
                            <span>{it.name}</span>
                            <span>:</span>
                            <span>{it.value}</span>
                        </div>
                    )
                })}
            </div>
           </div>
           <div className={styles.listOfCharg}><ListofChargingStations/></div>
        </div>
    )
}

export default Com