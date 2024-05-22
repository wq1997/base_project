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
import { getBurDtuDevInfo2,  } from '@/services/policy';
import { 
    getDeviceTypeByDtuId as getDeviceTypeByDtuIdServe
} from "@/services";

const defaultActiveKey = "OverView";

const Cabinet = () => {
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }

    const id = getQueryString("id");
    const intl = useIntl();
    const location = useLocation();
    const { pathname } = location;
    const [activeKey, setActiveKey] = useState(getQueryString("activeKey") || defaultActiveKey);
    const [deviceVersion, setDeviceVersion] = useState();
    const [PageTypeList, setPageTypeList] = useState([
        { label: t('总览'), key: 'OverView' },
        { label: t('设备详情'), key: 'DeviceDetails' },
        { label: t('监测曲线'), key: 'MonitoringCurves' },
        { label: t('pack详情'), key: 'PackDetails' },
        { label: t('策略配置'), key: 'Policy' },
    ]);
    const [data, setData] = useState();

    const getInitData = async () => {
        let { data } = await getBurDtuDevInfo2({ dtuId: id });
        Object.keys(data.data[0]?.devInfo).length !==0 ? setPageTypeList([
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
            { label: t('策略配置'), key: 'Policy' },
        ]);
        setData(data?.data?.[0])
    }

    const getDeviceType = async () => {
        const res = await getDeviceTypeByDtuIdServe({ dtuId: id });
        if(res?.data?.data){
            setDeviceVersion(res?.data?.data);
        }
    }

    const onChangeTab = key => {
        setActiveKey(key);
        history.push(`${pathname}?activeKey=${key}&id=${id}&title=${getQueryString("title")}`);
    };

    useEffect(() => {
        getInitData();
        getDeviceType();
    }, [])

    return (
        <div style={{ height: '100%', background: '#0A1328' }}>
            <Tabs className={styles.tab} activeKey={activeKey} items={PageTypeList} onChange={onChangeTab} />
            <div className={styles.content} style={{ borderRadius: '16px 16px 0px 0px' }}>
                {activeKey === "OverView" && <OverView sn={data?.sn} deviceVersion={deviceVersion} />}
                {activeKey === "DeviceDetails" && <DeviceDetails deviceVersion={deviceVersion} />}
                {activeKey === "MonitoringCurves" && <MonitoringCurves />}
                {activeKey === "PackDetails" && <PackDetails />}
                {activeKey === "Policy" && <Policy id={id} />}
            </div>
        </div>
    )
}

export default Cabinet;