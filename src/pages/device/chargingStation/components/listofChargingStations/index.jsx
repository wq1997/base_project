
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import styles from './index.less'
import Table from '@/components/Table.jsx'
import { Pagination } from "antd"

import { theme } from "antd";

function Com(props) {
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    useEffect(() => {
        console.log('函数组件来咯')
    }, [])
    const { token } = theme.useToken();
     const listOfCharges=[
        {
            title: '设备状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '设备名称',
            dataIndex: 'deviceName',
            key: 'deviceName',
        },
        {
            title: '设备类型',
            dataIndex: 'deviceType',
            key: 'deviceType',
        },
        {
            title: '充电电压',
            dataIndex: 'V',
            key: 'V',
        },
        {
            title: '充电功率',
            dataIndex: 'power',
            key: 'power',
        },
        {
            title: '充电电量',
            dataIndex: 'elc',
            key: 'elc',
        },
        {
            title: '车辆SOC',
            dataIndex: 'soc',
            key: 'soc',
        },
        {
            title: '累计电费',
            dataIndex: 'pay',
            key: 'pay',
        },
        {
            title: '累计服务费',
            dataIndex: 'onePay',
            key: 'onePay',
        },
        {
            title: '累计总金额',
            dataIndex: 'allPay',
            key: 'allPay',
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: '更新时间',
            dataIndex: 'Updated',
            key: 'Updated',
        },
        {
            title: '运行时长',
            dataIndex: 'runningTime',
            key: 'runningTime',
        },    
        {
            title: '订单号',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: '订单状态',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
        },
    ]
    const changPage = (page) => {
        setCurrent(page);
        getData(page);
    }
    const getData = async (page) => {
        // const { data } = await getNowAlarmsByDeviceTypeWithPage({
        //     plantId: currentPlantId,
        //     type: 'PCS',
        //     currentPage: page || 1,
        //     pageSize: 10,
        // });
        // setData(data.data);
    }
    useEffect(() => {
    }, []);
    return (
        <div className={styles.content}>
            <CardModel
                title={
                    "充电桩一览表"
                }
                content={
                    <div>
                        <Table
                            columns={listOfCharges}
                            data={data.records}
                        />
                        <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data.total} onChange={changPage} />


                    </div>

                }
            />

        </div>
    )
}

export default Com