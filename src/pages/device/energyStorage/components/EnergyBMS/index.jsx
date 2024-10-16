import React, { useState } from 'react';
import { getQueryString } from "@/utils/utils";
import { history, useLocation } from "umi";
import styles from "./index.less";
import Tab from '../../../components/Tab';
import RealtimeData from './RealtimeData';
import MonitoringCurves from "./MonitoringCurves";
import VolDiff from "./VolDiff";
import TemDiff from "./TemDiff";
import CellHistory from "./CellHistory";

import BmcDetails from './BmcDetails'
import CellDetails from "./CellDetails";
import { theme, } from "antd";
import { useSelector, useIntl } from "umi";



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
        history.push(`${pathname}?PageKey=${getQueryString("PageKey")}&activeKey=${key}`);
    };
    const intl = useIntl();
    const t = (id) => {
      const msg = intl.formatMessage(
        {
          id,
        },
      );
      return msg
    }
    const PageTypeList = [
        {label:t('BMS数据'),key:'RealtimeData'},
        {label:t('BMC数据'),key:'BmcDetails'},
        {label:t('监测曲线'),key:'MonitoringCurves'},
        {label:t('电芯实时数据'),key:'CellDetails'},
        {label:t('电芯历史数据'),key:'CellHistory'},
        {label:t('压差曲线'),key:'VolDiff'},
        {label:t('温差曲线'),key:'TemDiff'},

    ];
    return (
        <div style={{height: '100%'}}>
            <Tab activeKey={activeKey} TabItem={PageTypeList} onChange={onChangeTab}/>
            <div className={styles.content} style={{backgroundColor: token.titleCardBgc,padding:'40px 30px',borderRadius: '0px 16px 0px 0px'}}>
                {activeKey==="RealtimeData"&&<RealtimeData id={id}/>}
                {activeKey==="BmcDetails"&&<BmcDetails id={id}/>}
                {activeKey==="MonitoringCurves"&&<MonitoringCurves id={id}/>}
                {activeKey==="CellHistory"&&<CellHistory />}
                {activeKey==="CellDetails"&&<CellDetails id={id}/>}
                {activeKey==="VolDiff"&&<VolDiff id={id}/>}
                {activeKey==="TemDiff"&&<TemDiff id={id}/>}

            </div>
        </div>
    )
}

export default Cabinet;