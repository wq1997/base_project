import React, { useState } from 'react';
import { getQueryString } from "@/utils/utils";
import { history, useLocation } from "umi";
import styles from "./index.less";
import Tab from '../../../components/Tab';
import RealtimeData from './RealtimeData';
import MonitoringCurves from "./MonitoringCurves";
import AdvancedAnalytics from "./AdvancedAnalytics";
import CellDetails from "./CellDetails";
import { theme, } from "antd";


const PageTypeList = [
    {label:'BMS数据',key:'RealtimeData'},
    {label:'监测曲线',key:'MonitoringCurves'},
    {label:'电芯详情',key:'CellDetails'},
    {label:'高级分析',key:'AdvancedAnalytics'},
];
const defaultActiveKey = "RealtimeData";
const Cabinet = () => {
    const location = useLocation();
    const { pathname } = location;
    const { token } = theme.useToken();
    const [activeKey, setActiveKey] = useState(getQueryString("activeKey") || defaultActiveKey);
    const pageType = getQueryString("pageType")||"ALL";
    const id = getQueryString("id");
    const onChangeTab = key => {
        setActiveKey(key);
        history.push(`${pathname}?PageKey=${getQueryString("PageKey")}&pageType=${pageType}&activeKey=${key}&id=${id}`);
    };
    console.log('RealtimeData', activeKey)
    return (
        <div style={{height: '100%'}}>
            <Tab activeKey={activeKey} TabItem={PageTypeList} onChange={onChangeTab}/>
            <div className={styles.content} style={{backgroundColor: token.cardBgc,padding:'40px 30px',borderRadius: '0px 16px 0px 0px'}}>
                {activeKey==="RealtimeData"&&<RealtimeData id={id}/>}
                {activeKey==="MonitoringCurves"&&<MonitoringCurves id={id}/>}
                {activeKey==="AdvancedAnalytics"&&<AdvancedAnalytics />}
                {activeKey==="CellDetails"&&<CellDetails id={id}/>}
            </div>
        </div>
    )
}

export default Cabinet;