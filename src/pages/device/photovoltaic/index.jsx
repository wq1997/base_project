
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// import Tab from '../components/Tab';
import { getLocalStorage, getQueryString } from "@/utils/utils";
import { history, useLocation } from "umi";
import AlarmInfo from "./components/AlarmInfo";
import OperationIndex from './components/OperationIndex';
import ElectricG from './components/ElectricityG'
import RealPower from './components/RealPower'
import styles from './index.less'

// const PageTypeList = [
//     { label: '总览', key: 'Overview' },
//     { label: '历史数据', key: 'HistoryData' },
// ];
// const defaultPageType = "Overview";

function Com(props) {
    // const location = useLocation();
    // const { pathname } = location;
    // const [activeKey, setActiveKey] = useState(getQueryString("activeKey") || defaultPageType);

    // const onChangeTab = key => {
    //     setActiveKey(key);
    //     history.push(`${pathname}?activeKey=${key}`);
    // };

    useEffect(() => {
        // console.log('函数组件来咯')
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