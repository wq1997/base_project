
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import styles from './index.less'
// import Table from '@/components/Table.jsx'
import { Pagination, Table} from "antd"
import {  getChargeStationList } from '@/services/deviceTotal'
import { theme } from "antd";
import { useSelector, useIntl } from "umi";

function Com(props) {
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [scroolY, setScroolY] = useState(200);
    const [screenH, setScreenH] = useState('');
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
    setScreenH(document.documentElement.clientHeight || document.body.clientHeight)
    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])
    const handleWindowResize = () => {
        setScreenH(document.documentElement.clientHeight || document.body.clientHeight)
      }
    useEffect(() => {
        if (screenH < 1000) {
            setScroolY(130);
          } else if (screenH > 1000 && screenH < 1300) {
            setScroolY(300);
          } else if (screenH > 1300) {
            setScroolY(500);
          }
      }, [screenH]);
    const { token } = theme.useToken();
     const listOfCharges=[
        {
            title: t('设备状态'),
            dataIndex: 'workStaDesc',
            key: 'workStaDesc',
        },
        {
            title: t('设备名称'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('设备类型'),
            dataIndex: 'inCabTypeDesc',
            key: 'inCabTypeDesc',
        },
        {
            title: t('充电电压'),
            dataIndex: 'chargeVol',
            key: 'chargeVol',
        },
        {
            title: t('充电功率'),
            dataIndex: 'pIn',
            key: 'pIn',
        },
        {
            title: t('充电电量'),
            dataIndex: 'inOEAcc',
            key: 'inOEAcc',
        },
        {
            title: t('车辆SOC'),
            dataIndex: 'soc',
            key: 'soc',
        },
        {
            title: t('累计电费'),
            dataIndex: 'inOCAcc',
            key: 'inOCAcc',
        },
        {
            title: t('累计服务费'),
            dataIndex: 'serviceFee',
            key: 'serviceFee',
        },
        {
            title: t('累计总金额'),
            dataIndex: 'totalMoney',
            key: 'totalMoney',
        },
        {
            title: t('开始时间'),
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: t('更新时间'),
            dataIndex: 'curDT',
            key: 'curDT',
        },
        {
            title: t('运行时长'),
            dataIndex: 'inTime',
            key: 'inTime',
        },    
        {
            title: t('订单号'),
            dataIndex: 'orderNo',
            key: 'orderNo',
        },
        {
            title: t('订单状态'),
            dataIndex: 'orderStatus',
            key: 'orderStatus',
        },
    ]
    const getData = async () => {
        const { data } = await getChargeStationList({
            plantId: localStorage.getItem('plantId'),
        });
        setData(data.data);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className={styles.content} id='table'>
            <CardModel
                title={
                    t("充电桩一览表")
                }
                content={
                    <div>
                        <Table
                            columns={listOfCharges}
                            dataSource={data}
                            scroll={{
                                y: scroolY,
                               }}
                        />
                        {/* <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data.total} onChange={changPage} /> */}


                    </div>

                }
            />

        </div>
    )
}

export default Com