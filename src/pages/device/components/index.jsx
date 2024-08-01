import React, { useState } from 'react';
import { getQueryString } from "@/utils/utils";
import { history, useLocation, useIntl } from "umi";
import styles from "./index.less";
import DeviceDetails from './deviceDetails';
import MonitoringCurves from "./monitoringCurves";
import PackDetails from "./packDetails";
import OverView from "./overview";
import Policy from "../../policyConfiguration/index";
import { theme, Tabs } from "antd";
import { useEffect } from 'react';
import { getBurDtuDevInfo2,  } from '@/services/policy'

const Cabinet = () => {
    const location = useLocation();
    const { pathname } = location;
    const { token } = theme.useToken();
    const [activeKey, setActiveKey] = useState(getQueryString("activeKey") || defaultActiveKey);
    const id = getQueryString("id");
    const onChangeTab = key => {
        setActiveKey(key);
        history.push(`${pathname}?activeKey=${key}&id=${id}&title=${getQueryString("title")}&sn=${getQueryString("sn")}&type=${getQueryString("type")}`);
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
    useEffect(() => {
        getInitData();
    }, [])
    const getInitData =  () => {
        // let { data } = await getBurDtuDevInfo2({ dtuId: id });
        getQueryString("type")==14 ? setPageTypeList([
            { label: t('总览'), key: 'OverView' },
            { label: t('设备详情'), key: 'DeviceDetails' },
            { label: t('监测曲线'), key: 'MonitoringCurves' },
            { label: t('pack详情'), key: 'PackDetails' },
            { label: t('策略配置'), key: 'Policy' },

        ]) : setPageTypeList([
            { label: t('总览'), key: 'OverView' },
            { label: t('设备详情'), key: 'DeviceDetails' },
            { label: t('监测曲线'), key: 'MonitoringCurves' },
            { label: t('pack详情'), key: 'PackDetails' },
        ]);
    }
    const [PageTypeList, setPageTypeList] = useState([
   
    ]);
    const defaultActiveKey = "OverView";
    return (
        <div style={{ height: '100%', backgroundColor: '#03081D', }}>
            <Tabs className={styles.tab} activeKey={activeKey} items={PageTypeList} onChange={onChangeTab} />
            <div className={styles.content} style={{ backgroundColor:token.titleCardBgc  }}>
                {activeKey === "OverView" && <OverView id={id} />}
                {activeKey === "DeviceDetails" && <DeviceDetails />}
                {activeKey === "MonitoringCurves" && <MonitoringCurves />}
                {activeKey === "PackDetails" && <PackDetails />}
                {activeKey === "Policy" && <Policy id={id} />}
            </div>
        </div>
    )
}

export default Cabinet;