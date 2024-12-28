
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getLocalStorage, getQueryString } from "@/utils/utils";
import { history, useLocation,useIntl } from "umi";

import {
  AppstoreOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { theme } from "antd"
import Overview from './components/overview'
import Photovoltaic from './components/photovoltaic'
import EnergyStorage from './components/energyStorage'
import ChargingStation from './components/chargingStation'
import styles from './index.less'

const defaultPageType = "Overview";

const Login = () => {
  const location = useLocation();
const { token } = theme.useToken();

  const { pathname } = location;
  const [activeKey, setActiveKey] = useState(getQueryString("activeKey") || defaultPageType);
  const onChangeTab = key => {
    setActiveKey(key);
    history.push(`${pathname}?activeKey=${key}`);
  };
  const intl = useIntl();
  const getTranslation=(id)=>{
      const msg = intl.formatMessage(
          {
            id,
          },
        );
        return msg
  }
  
const PageTypeList = [
  { label:getTranslation('app.Overview'), key: 'Overview', icon: AppstoreOutlined },
  { label: getTranslation('device.Photovoltaic'), key: 'photovoltaic', icon: DesktopOutlined },
  { label: getTranslation('device.EnergyStorage'), key: 'energyStorage', icon: DatabaseOutlined },
  { label:getTranslation('device.ChargingPiles'), key: 'chargingStation', icon: WalletOutlined },
];
  return (
    <div className={styles.content} style={{ backgroundColor: token.titleCardBgc,}}>
      <Overview />
      {/* <Tabs 
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
      {activeKey === "Overview" && <Overview type={activeKey}/>}
      {activeKey === "photovoltaic" && <Photovoltaic type={activeKey}/>}
      {activeKey === "energyStorage" && <EnergyStorage type={activeKey}/>}
      {activeKey === "chargingStation" && <ChargingStation type={activeKey}/>} */}
    </div>
  )
}

export default Login