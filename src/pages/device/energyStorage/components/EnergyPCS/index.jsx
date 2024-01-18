import React, { useState } from 'react';
import { getQueryString } from "@/utils/utils";
import { history, useLocation } from "umi";
import styles from "./index.less";
import Tab from '../../../components/Tab';
import MonitoringCurves from './MonitoringCurves';
import PcsDetails from "./PcsDetails";


const PageTypeList = [
    {label:'Pcs详情',key:'PcsDetails'},
    {label:'监测曲线',key:'MonitoringCurves'},
];
const defaultActiveKey = "PcsDetails";
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
                {activeKey==="MonitoringCurves"&&<MonitoringCurves/>}
                {activeKey==="PcsDetails"&&<PcsDetails />}
            </div>
        </div>
    )
}

export default Cabinet;