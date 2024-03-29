import React, { useState } from 'react';
import { getQueryString } from "@/utils/utils";
import { history, useLocation } from "umi";
import styles from "./index.less";
import Tab from '../../../components/Tab';
import RealtimeData from './MeterDetails';
import HistoryData from "./Monitor";
import { theme, } from "antd";

const PageTypeList = [
    {label:'电表详情',key:'RealtimeData'},
    {label:'监测曲线',key:'HistoryData'},
];
const defaultActiveKey = "RealtimeData";

const ElectricityMeter = () => {
    const location = useLocation();
    const { pathname } = location;
    const [activeKey, setActiveKey] = useState(getQueryString("activeKey") || defaultActiveKey);
    const pageType = getQueryString("pageType")||"ALL";
    const id = getQueryString("id");
    const { token } = theme.useToken();
    const onChangeTab = key => {
        setActiveKey(key);
        history.push(`${pathname}?PageKey=${getQueryString("PageKey")}&pageType=${pageType}&activeKey=${key}&id=${id}`);

    };
    return (
        <div style={{height: '100%'}}>
            <Tab activeKey={activeKey} TabItem={PageTypeList} onChange={onChangeTab}/>
            <div className={styles.content} style={{backgroundColor: token.cardBgc,padding:'40px 30px',borderRadius: '0px 16px 0px 0px'}}>
                {activeKey==="RealtimeData"&&<RealtimeData id={id}/>}
                {activeKey==="HistoryData"&&<HistoryData id={id}/>}
            </div>
        </div>
    )
}

export default ElectricityMeter;