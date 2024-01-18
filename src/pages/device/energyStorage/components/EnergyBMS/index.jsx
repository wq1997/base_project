import React, { useState } from 'react';
import { getQueryString } from "@/utils/utils";
import { history, useLocation } from "umi";
import styles from "./index.less";
import Tab from '../../../components/Tab';
import RealtimeData from './RealtimeData';
import HistoryData from "./HistoryData";
import TemperaturePressure from "./TemperaturePressure";
import CellDetails from "./CellDetails";

const PageTypeList = [
    {label:'BMS数据',key:'RealtimeData'},
    {label:'监测曲线',key:'HistoryData'},
    {label:'电芯详情',key:'CellDetails'},
    {label:'高级分析',key:'TemperaturePressure'},
];
const defaultActiveKey = "RealtimeData";
const Cabinet = () => {
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
                {activeKey==="TemperaturePressure"&&<TemperaturePressure />}
                {activeKey==="CellDetails"&&<CellDetails />}
            </div>
        </div>
    )
}

export default Cabinet;