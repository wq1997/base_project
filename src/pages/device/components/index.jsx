import React, { useState } from 'react';
import { getQueryString } from "@/utils/utils";
import { history, useLocation, useIntl } from "umi";
import styles from "./index.less";
import DeviceDetails from './deviceDetails';
import MonitoringCurves from "./monitoringCurves";
import PackDetails from "./packDetails";
import OverView from "./overview";
import Policy from "../../policyConfiguration/index";
import { theme,Tabs  } from "antd";

const Cabinet = () => {
    const location = useLocation();
    const { pathname } = location;
    const { token } = theme.useToken();
    const [activeKey, setActiveKey] = useState(getQueryString("activeKey") || defaultActiveKey);
    const id = getQueryString("id");
    const onChangeTab = key => {
        setActiveKey(key);
        history.push(`${pathname}?activeKey=${key}&id=${id}`);
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
        { label: t('总览'), key: 'OverView' },
        { label: t('设备详情'), key: 'DeviceDetails' },
        { label: t('监测曲线'), key: 'MonitoringCurves' },
        { label: t('pack详情'), key: 'PackDetails' },
        { label: t('策略配置'), key: 'Policy' },

    ];
    const defaultActiveKey = "OverView";
    return (
        <div style={{ height: '100%', backgroundColor: '#03081D', }}>
            <Tabs className={styles.tab} activeKey={activeKey} items={PageTypeList} onChange={onChangeTab} />
            <div className={styles.content} style={{ padding: '40px 30px', borderRadius: '0px 16px 0px 0px' }}>
                {activeKey === "OverView" && <OverView id={id} />}
                {activeKey === "DeviceDetails" && <DeviceDetails />}
                {activeKey === "MonitoringCurves" && <MonitoringCurves />}
                {activeKey === "PackDetails" && <PackDetails />}
                {activeKey === "Policy" && <Policy  id={id}/>}
            </div>
        </div>
    )
}

export default Cabinet;