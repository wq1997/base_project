
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import styles from './index.less'
// import Table from '@/components/Table.jsx'
import { Pagination, Table} from "antd"
import {  getChargeStationList } from '@/services/deviceTotal'
import { theme } from "antd";

function Com(props) {
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [scroolY, setScroolY] = useState(200);
    const [screenH, setScreenH] = useState('');

    
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
            setScroolY(200);
          } else if (screenH > 1000 && screenH < 1300) {
            setScroolY(300);
          } else if (screenH > 1300) {
            setScroolY(500);
          }
      }, [screenH]);
    const { token } = theme.useToken();
     const listOfCharges=[
        {
            title: '设备状态',
            dataIndex: 'workStaDesc',
            key: 'workStaDesc',
        },
        {
            title: '设备名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '设备类型',
            dataIndex: 'inCabTypeDesc',
            key: 'inCabTypeDesc',
        },
        {
            title: '充电电压',
            dataIndex: 'chargeVol',
            key: 'chargeVol',
        },
        {
            title: '充电功率',
            dataIndex: 'pIn',
            key: 'pIn',
        },
        {
            title: '充电电量',
            dataIndex: 'inOEAcc',
            key: 'inOEAcc',
        },
        {
            title: '车辆SOC',
            dataIndex: 'soc',
            key: 'soc',
        },
        {
            title: '累计电费',
            dataIndex: 'inOCAcc',
            key: 'inOCAcc',
        },
        {
            title: '累计服务费',
            dataIndex: 'serviceFee',
            key: 'serviceFee',
        },
        {
            title: '累计总金额',
            dataIndex: 'totalMoney',
            key: 'totalMoney',
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: '更新时间',
            dataIndex: 'curDT',
            key: 'curDT',
        },
        {
            title: '运行时长',
            dataIndex: 'inTime',
            key: 'inTime',
        },    
        {
            title: '订单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
        },
        {
            title: '订单状态',
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
                    "充电桩一览表"
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