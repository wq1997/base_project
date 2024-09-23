import React, { useState } from 'react';
import { getQueryString } from "@/utils/utils";
import { history, useLocation, useIntl, useSelector } from "umi";
import styles from "./index.less";
import DeviceDetails from './deviceDetails';
import MonitoringCurves from "./monitoringCurves";
import PackDetails from "./packDetails";
import OverView from "./overview";
import Policy from "../../policyConfiguration/index";
import { theme, Tabs } from "antd";
import { useEffect } from 'react';
import { getBurDtuDevInfo2, } from '@/services/policy';
import {
    getDeviceTypeByDtuId as getDeviceTypeByDtuIdServe
} from "@/services";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import classNames from "classnames";

const defaultActiveKey = "OverView";

const Cabinet = () => {
    const { token } = theme.useToken();
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
    const global = useSelector(state => state.global);
    const { pathname } = location;
    const [activeKey, setActiveKey] = useState(getQueryString("activeKey") || defaultActiveKey);
    const [deviceVersion, setDeviceVersion] = useState();
    const [sn, setSn] = useState();
    const [PageTypeList, setPageTypeList] = useState();

    const getDeviceType = async () => {
        const res = await getDeviceTypeByDtuIdServe({ dtuId: id });
        if (res?.data?.data) {
            setDeviceVersion(res?.data?.data?.deviceTypeId);
            setSn(res?.data?.data?.sn);
        }
    }

    const onChangeTab = key => {
        setActiveKey(key);
        history.push(`${pathname}?activeKey=${key}&id=${id}&title=${getQueryString("title")}&type=${getQueryString("type")}`);
    };

    useEffect(() => {
        getDeviceType();
    }, [])

    useEffect(() => {
        setPageTypeList([
            { label: t('总览'), key: 'OverView' },
            { label: t('设备详情'), key: 'DeviceDetails' },
            // { label: t('监测曲线'), key: 'MonitoringCurves' },
            { label: t('PACK详情'), key: 'PackDetails' },
            { label: t('策略配置'), key: 'Policy' },
        ])
    }, [global.locale])

    const deviceDetailStyle = useEmotionCss(() => {
        return {
            '.ant-tabs-nav': {
                background: token.color21
            },
            '.ant-tabs-tab': {
                color: `${token.color10} !important`
            }
        }
    })

    return (
        <div className={classNames(styles.deviceDetail, deviceDetailStyle)} style={{ height: '100%' }}>
            <Tabs activeKey={activeKey} items={PageTypeList} onChange={onChangeTab} />
            <div className={styles.content}>
                {activeKey === "OverView" && <OverView sn={sn} deviceVersion={deviceVersion} />}
                {activeKey === "DeviceDetails" && <DeviceDetails deviceVersion={deviceVersion} />}
                {activeKey === "MonitoringCurves" && <MonitoringCurves deviceVersion={deviceVersion} />}
                {activeKey === "PackDetails" && <PackDetails deviceVersion={deviceVersion} />}
                {activeKey === "Policy" && <Policy id={id} deviceVersion={deviceVersion} />}
            </div>
        </div>
    )
}

export default Cabinet;