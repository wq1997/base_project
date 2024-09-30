import React, { useState } from 'react';
import { getQueryString } from "@/utils/utils";
import { history, useLocation } from "umi";
import styles from "./index.less";
import Tab from '../../../components/Tab';
import MonitoringCurves from './MonitoringCurves';
import PcsDetails from "./PcsDetails";
import { theme, } from "antd";
import { useIntl } from "umi";



const defaultActiveKey = "PcsDetails";
const Cabinet = (props) => {
    const location = useLocation();
    const { token } = theme.useToken();
    const { pathname } = location;
    const [activeKey, setActiveKey] = useState(getQueryString("activeKey") || defaultActiveKey);
    const pageType = getQueryString("pageType")||"ALL";
    const id = getQueryString("id");
    const onChangeTab = key => {
        setActiveKey(key);
        history.push(`${pathname}?PageKey=${getQueryString("PageKey")}&pageType=${pageType}&activeKey=${key}&id=${id}`);
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
    {label:t('PCS详情'),key:'PcsDetails'},
    {label:t('监测曲线'),key:'MonitoringCurvesPcs'},
];
    return (
        <div style={{height: 'calc(100% - 56px)'}}>
            <Tab activeKey={activeKey} TabItem={PageTypeList} onChange={onChangeTab}/>
            <div className={styles.contentPcs} style={{backgroundColor: token.titleCardBgc,padding:'40px 30px',borderRadius: '0px 16px 0px 0px'}}>
                {activeKey==="MonitoringCurvesPcs"&&<MonitoringCurves id={props.id}/>}
                {activeKey==="PcsDetails"&&<PcsDetails id={props.id}/>}
            </div>
        </div>
    )
}

export default Cabinet;