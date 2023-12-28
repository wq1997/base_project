import React, { useState } from 'react';
import { getQueryString } from "@/utils/utils";
import { history, useLocation } from "umi";
import styles from "./index.less";
import Tab from '../../../components/Tab';
import RealtimeData from './RealtimeData';
import HistoryData from "./HistoryData";

const PageTypeList = [
    {label:'实时数据',key:'RealtimeData'},
    {label:'历史数据',key:'HistoryData'},
];
const defaultActiveKey = "RealtimeData";

const ElectricityMeter = () => {
    const location = useLocation();
    const { pathname } = location;
    const [activeKey, setActiveKey] = useState(getQueryString("activeKey") || defaultActiveKey);
    const pageType = getQueryString("pageType")||"ALL";
    const id = getQueryString("id");
    const onChangeTab = key => {
        setActiveKey(key);
        history.push(`${pathname}?pageType=${pageType}&activeKey=${key}&id=${id}`);
    };
    return (
        <div style={{height: '100%'}}>
            <Tab activeKey={activeKey} TabItem={PageTypeList} onChange={onChangeTab}/>
            <div className={styles.content}>
                {activeKey==="RealtimeData"&&<RealtimeData/>}
                {activeKey==="HistoryData"&&<HistoryData />}
            </div>
        </div>
    )
}

export default ElectricityMeter;