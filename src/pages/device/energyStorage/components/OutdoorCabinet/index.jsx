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
    {label:'设备详情',key:'RealtimeDataOut'},
    {label:'监测曲线',key:'MonitoringCurvesOut'},
    {label:'电芯详情',key:'CellDetailsOut'},
    {label:'高级分析',key:'AdvancedAnalyticsOut'},
];
const defaultActiveKey = "RealtimeDataOut";
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

    return (
        <div style={{height: '100%'}}>
            <Tab activeKey={activeKey} TabItem={PageTypeList} onChange={onChangeTab}/>
            <div className={styles.content} style={{backgroundColor: token.cardBgc,padding:'40px 30px',borderRadius: '0px 16px 0px 0px'}}>
                {activeKey==="RealtimeDataOut"&&<RealtimeData id={id}/>}
                {activeKey==="MonitoringCurvesOut"&&<MonitoringCurves />}
                {activeKey==="AdvancedAnalyticsOut"&&<AdvancedAnalytics />}
                {activeKey==="CellDetailsOut"&&<CellDetails />}
            </div>
        </div>
    )
}

export default Cabinet;