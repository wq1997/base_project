
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Tab from '../components/Tab';
import { getLocalStorage, getQueryString } from "@/utils/utils";
import { history, useLocation } from "umi";
import Overview from "./components/Overview";
import HistoryData from './components/HistoryData';

const PageTypeList = [
    {label:'总览',key:'Overview'},
    {label:'历史数据',key:'HistoryData'},
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
    }, [])
    return (
        <div className='content'>
            <Tab activeKey={activeKey} TabItem={PageTypeList} onChange={onChangeTab}/>
            {activeKey==="Overview"&&<Overview />}
            {activeKey==="HistoryData"&&<HistoryData />}
        </div>
    )
}

export default Com