
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getLocalStorage, getQueryString } from "@/utils/utils";
import { history, useLocation } from "umi";

import {
  AppstoreOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Tabs } from "antd"
import Overview from './components/overview'
import styles from './index.less'

const PageTypeList = [
  { label: '总览', key: 'Overview', icon: AppstoreOutlined },
  { label: '光伏', key: 'photovoltaic', icon: DesktopOutlined },
  { label: '储能', key: 'energyStorage', icon: DatabaseOutlined },
  { label: '充电桩', key: 'chargingStation', icon: WalletOutlined },
];
const defaultPageType = "Overview";

const Login = () => {
  const location = useLocation();
  const { pathname } = location;
  const [activeKey, setActiveKey] = useState(getQueryString("activeKey") || defaultPageType);
  const onChangeTab = key => {
    setActiveKey(key);
    history.push(`${pathname}?activeKey=${key}`);
  };
  return (
    <div className={styles.content}>
      <Tabs 
        activeKey={activeKey}
        type="card"
        items={[AppstoreOutlined, DesktopOutlined, DatabaseOutlined, WalletOutlined].map((Icon, index) => {
          const info = PageTypeList[index];
          return {
            ...info,
            icon: <Icon />
          }
        })}
        onChange={onChangeTab}
      />
      {activeKey === "Overview" && <Overview />}
    </div>
  )
}

export default Login