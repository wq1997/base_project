
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Tab from '../Tab';
import { getLocalStorage, getQueryString } from "@/utils/utils";
import { history, useLocation } from "umi";
import Overview from "./components/Overview";
import CellDetails from './components/CellDetails';
import RealtimeData from './components/RealtimeData';
import HistoryData from './components/HistoryData';
import RealtimeAlarm from './components/RealtimeAlarm';

const PageTypeList = [
    {label:'总览',key:'Overview'},
    {label:'电芯详情',key:'CellDetails'},
    {label:'实时数据',key:'RealtimeData'},
    {label:'历史数据',key:'HistoryData'},
    {label:'实时告警',key:'RealtimeAlarm'},
];
const defaultPageType = "Overview";

function Com(props) {
    const location = useLocation();
    const { pathname } = location;
    const [activeKey, setActiveKey] = useState(getQueryString("activeKey") || defaultPageType);

    const onChangeTab = key => {
        setActiveKey(key);
        history.push(`${pathname}?activeKey=${key}`);
    };

    useEffect(() => {
        // console.log('函数组件来咯')
    }, [])

    return (
        <div className='content'>
            <Tab activeKey={activeKey} TabItem={PageTypeList} onChange={onChangeTab}/>
            {activeKey==="Overview"&&<Overview />}
            {activeKey==="CellDetails"&&<CellDetails />}
            {activeKey==="RealtimeData"&&<RealtimeData />}
            {activeKey==="HistoryData"&&<HistoryData />}
            {activeKey==="RealtimeAlarm"&&<RealtimeAlarm />}
        </div>
    )
}

export default Com