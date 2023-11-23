
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Tab from '../components/Tab'
import { getLocalStorage, getQueryString } from "@/utils/utils";
import { history, useLocation } from "umi";

const PageTypeList = [
    {label:'总览',key:'Overview'},
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
        console.log( 
            localStorage.getItem('allPlant')
            );
    }, [])

    return (
        <div className='content'>
            <Tab activeKey={activeKey} TabItem={PageTypeList} onChange={onChangeTab}/>
        </div>
    )
}

export default Com