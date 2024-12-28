
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import AlarmInfo from "./components/AlarmInfo";
import OperationIndex from './components/OperationIndex';
import ElectricG from './components/ElectricityG'
import RealPower from './components/RealPower'
import styles from './index.less'
function Com(props) {
    useEffect(() => {
    }, [])
    return (
        <div className={styles.contents}>
            <div className={styles.operationIndex}>
                <OperationIndex />
            </div>
            <div className={styles.alarmInfo}><AlarmInfo /></div>
            <div className={styles.electricityGenerationStatistics}>
                <ElectricG/>
            </div>
            <div className={styles.realPower}>
                <RealPower/>
            </div>

        </div>
    )
}

export default Com