import React, { useState } from 'react';
import { getQueryString } from "@/utils/utils";
import { history, useLocation, useIntl,useSelector } from "umi";
import styles from "./index.less";
import DeviceDetails from './deviceDetails';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import PackDetails from "./packDetails";
import OverView from "./overview";
import Policy from "../../policyConfiguration/index";
import CzekhPolicy2 from './CzekhPolicy2.0/index'
import { theme, Tabs } from "antd";
import { useEffect } from 'react';
import classNames from "classnames";

const defaultActiveKey = "OverView";

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
    const {locale} = useSelector(state => state.global);

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
    }, [locale])
    const getInitData =  () => {
        getQueryString("type")==14 ? setPageTypeList([
            { label: t('总览'), key: 'OverView' },
            { label: t('设备详情'), key: 'DeviceDetails' },
            { label: t('pack详情'), key: 'PackDetails' },
            { label: t('策略配置'), key: 'Policy' },

        ]) : setPageTypeList([
            { label: t('总览'), key: 'OverView' },
            { label: t('设备详情'), key: 'DeviceDetails' },
            { label: t('pack详情'), key: 'PackDetails' },
            { label: t('策略配置'), key: 'CzekhPolicy2' },

        ]);
    }
    const [PageTypeList, setPageTypeList] = useState([
   
    ]);
    const deviceDetailStyle = useEmotionCss(() => {
        return {
            '.ant-tabs-tab': {
                color: `#999999 !important`
            },
            '.ant-tabs-tab-active':{
                background: `${token.tabBgc} !important`,
                color: `${token.tabActiveColor} !important`

            }
        }
    })
    return (
        <div className={classNames(styles.deviceDetail, deviceDetailStyle)}  style={{ height: '100%', backgroundColor: token.overBgc, }}>
            <Tabs className={styles.tab} activeKey={activeKey} items={PageTypeList} onChange={onChangeTab} />
            <div className={styles.content} style={{  }}>
                {activeKey === "OverView" && <OverView id={id} />}
                {activeKey === "DeviceDetails" && <DeviceDetails />}
                {activeKey === "PackDetails" && <PackDetails />}
                {activeKey === "Policy" && <Policy id={id} />}
                {activeKey === "CzekhPolicy2" && <CzekhPolicy2 id={id} />}

            </div>
        </div>
    )
}

export default Cabinet;