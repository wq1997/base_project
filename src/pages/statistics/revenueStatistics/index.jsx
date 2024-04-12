
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getLocalStorage, getQueryString } from "@/utils/utils";
import { history, useLocation,useSelector } from "umi";

import {
  AppstoreOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Tabs } from "antd"
import Overview from './components/overview'
import PartOfProceeds from './components/partOfTheProceeds/index'
import styles from './index.less'

const PageTypeList = [
  { label: '总览', key: 'Overview', icon: AppstoreOutlined },
  { label: '光伏', key: 'photovoltaic', icon: DesktopOutlined },
  { label: '储能', key: 'energyStorage', icon: DatabaseOutlined },
  { label: '充电桩', key: 'chargingStation', icon: WalletOutlined },
];
const defaultPageType = "Overview";
const dataP = [{
  date: '2024-04-01',
  a: 130,
  b: 110,
  c: 90,
  d: 50,
  e: 380,
  f: 262,
  g: 239,
  h: 230,
  i: 221.5,
  A: 951.5,
  RA: 571.5,
}];
const dataE = [{
  date: '2024-04-01',
  a: 122,
  b: 121,
  c: 99,
  d: 67,
  e: 409,
  f: 210,
  g: 204,
  h: 245,
  i: 260,
  A: 919,
  RA: 510,
}];
const dataD = [{
  date: '2024-04-01',
  a: 118,
  b: 132,
  c: 72,
  d: 88,
  e: 410,
  f: 243,
  g: 263,
  h: 285,
  i: 260,
  A: 1051,
  RA: 641,
}];

const Login = () => {
  const location = useLocation();
  const { pathname } = location;
  const [activeKey, setActiveKey] = useState(getQueryString("activeKey") || defaultPageType);
  const onChangeTab = key => {
    setActiveKey(key);
    history.push(`${pathname}?activeKey=${key}`);
  };
  const { theme: currentTheme } = useSelector(function (state) {
    return state.global
});
const profitTableE = [
  {
      title: '',
      children: [{
          title: '序号',
          dataIndex: 'id',
          className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',
          key: 'id',
          width: 100,
          render: (text, record, index) => index + 1,
      },
      {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
          width: 100,
          className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          // render:(val)=>{
          //     return val ? dayjs(val).format('YYYY-MM-DD') : ''
          // }
      },]
  },
  {
      title: '充电成本（元）',
      children: [
          {
              title: '尖电',
              dataIndex: 'a',
              key: 'a',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '峰电',
              dataIndex: 'b',
              key: 'b',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '平电',
              dataIndex: 'c',
              key: 'c',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '谷电',
              dataIndex: 'd',
              key: 'd',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '总计',
              dataIndex: 'e',
              key: 'e',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
      ],
  },
  {
      title: '放电收益（元）',
      children: [
          {
              title: '尖电',
              dataIndex: 'f',
              key: 'f',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '峰电',
              dataIndex: 'g',
              key: 'g',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '平电',
              dataIndex: 'h',
              key: 'h',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '谷电',
              dataIndex: 'i',
              key: 'i',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '总计',
              dataIndex: 'A',
              key: 'A',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },

      ],
  },
  {
      title: '',
      children: [{
          title: '实际收益',
          dataIndex: 'RA',
          key: 'RA',
          width: 100,
          className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

      }],
  }

];
const profitTableP = [

  {
      title: '发电收益（元）',
      children: [
        {
          title: '序号',
          dataIndex: 'id',
          className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',
          key: 'id',
          width: 100,
          render: (text, record, index) => index + 1,
      },
      {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
          width: 100,
          className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          // render:(val)=>{
          //     return val ? dayjs(val).format('YYYY-MM-DD') : ''
          // }
      },
          {
              title: '尖电',
              dataIndex: 'a',
              key: 'a',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '峰电',
              dataIndex: 'b',
              key: 'b',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '平电',
              dataIndex: 'c',
              key: 'c',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '谷电',
              dataIndex: 'd',
              key: 'd',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '总计',
              dataIndex: 'e',
              key: 'e',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
      ],
  },

];
const profitTableD = [
  {
      title: '充电收益（元）',
      children: [
        {
          title: '序号',
          dataIndex: 'id',
          className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',
          key: 'id',
          width: 100,
          render: (text, record, index) => index + 1,
      },
      {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
          width: 100,
          className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          // render:(val)=>{
          //     return val ? dayjs(val).format('YYYY-MM-DD') : ''
          // }
      },
          {
              title: '尖电',
              dataIndex: 'a',
              key: 'a',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '峰电',
              dataIndex: 'b',
              key: 'b',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '平电',
              dataIndex: 'c',
              key: 'c',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '谷电',
              dataIndex: 'd',
              key: 'd',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '总计',
              dataIndex: 'e',
              key: 'e',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
      ],
  },

];
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
      {activeKey === "Overview" && <Overview type={activeKey} />}
      {activeKey === "photovoltaic" && <PartOfProceeds type={activeKey} typeNum={2} dataTable={dataP} dataYM={[572.5,572.5,572.5]} clum={profitTableP} />}
      {activeKey === "energyStorage" && <PartOfProceeds type={activeKey} typeNum={0} dataTable={dataE} dataYM={[510,572.5,510]} clum={profitTableE}/>}
      {activeKey === "chargingStation" && <PartOfProceeds type={activeKey} typeNum={1} dataTable={dataD} dataYM={[641,641,641]}  clum={profitTableD}/>}
    </div>
  )
}

export default Login