
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
      },]
  },
  {
      title: '充电成本（元）',
      children: [
          {
              title: '尖电',
              dataIndex: 'tipInFee',
              key: 'tipInFee',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '峰电',
              dataIndex: 'peakInFee',
              key: 'peakInFee',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '平电',
              dataIndex: 'flatInFee',
              key: 'flatInFee',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '谷电',
              dataIndex: 'valleyInFee',
              key: 'valleyInFee',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '总计',
              dataIndex: 'dayInFee',
              key: 'dayInFee',
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
              dataIndex: 'tipOutFee',
              key: 'tipOutFee',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '峰电',
              dataIndex: 'peakOutFee',
              key: 'peakOutFee',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '平电',
              dataIndex: 'flatOutFee',
              key: 'flatOutFee',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '谷电',
              dataIndex: 'valleyOutFee',
              key: 'valleyOutFee',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },
          {
              title: '总计',
              dataIndex: 'dayOutFee',
              key: 'dayOutFee',
              width: 150,
              className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

          },

      ],
  },
  {
      title: '',
      children: [
        {
          title: '实际收益',
          dataIndex: 'dayEarning',
          key: 'dayEarning',
          width: 100,
          className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

      }
    ],
  }

];
const profitTableP = [
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
        },]
    },

  {
      title: '发电收益（元）',
      children: [
        {
            title: '尖电',
            dataIndex: 'tipOutFee',
            key: 'tipOutFee',
            width: 150,
            className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

        },
        {
            title: '峰电',
            dataIndex: 'peakOutFee',
            key: 'peakOutFee',
            width: 150,
            className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

        },
        {
            title: '平电',
            dataIndex: 'flatOutFee',
            key: 'flatOutFee',
            width: 150,
            className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

        },
        {
            title: '谷电',
            dataIndex: 'valleyOutFee',
            key: 'valleyOutFee',
            width: 150,
            className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

        },
        {
            title: '总计',
            dataIndex: 'dayOutFee',
            key: 'dayOutFee',
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
      },
      {
        title: '尖电',
        dataIndex: 'tipOutFee',
        key: 'tipOutFee',
        width: 150,
        className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

    },
    {
        title: '峰电',
        dataIndex: 'peakOutFee',
        key: 'peakOutFee',
        width: 150,
        className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

    },
    {
        title: '平电',
        dataIndex: 'flatOutFee',
        key: 'flatOutFee',
        width: 150,
        className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

    },
    {
        title: '谷电',
        dataIndex: 'valleyOutFee',
        key: 'valleyOutFee',
        width: 150,
        className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

    },
    {
        title: '总计',
        dataIndex: 'dayOutFee',
        key: 'dayOutFee',
        width: 150,
        className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

    }, {
        title: '实际收益',
        dataIndex: 'dayEarning',
        key: 'dayEarning',
        width: 100,
        className: currentTheme === 'default' ? 'lightTitleColorRight' : 'darkTitleColorRight',

    }
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
      {activeKey === "photovoltaic" && <PartOfProceeds type={activeKey} typeNum={2}   clum={profitTableP} />}
      {activeKey === "energyStorage" && <PartOfProceeds type={activeKey} typeNum={0}  clum={profitTableE}/>}
      {activeKey === "chargingStation" && <PartOfProceeds type={activeKey} typeNum={1}   clum={profitTableD}/>}
    </div>
  )
}

export default Login