import { ScorllTable } from "@/components";
import { useState, useEffect } from "react";
import { getLatestAlarmsServe } from "@/services/bigScreen";

const RealtimeAlarm = () => {
    const [dataSource, setDataSource] = useState([]);
    const columns = [
        {
            title: '告警类别',
            key: 'type'
        },
        {
            title: '告警等级',
            key: 'prior'
        },
        {
            title: '告警描述',
            key: 'desc'
        },
        {
            title: '设备名称',
            key: 'deviceName'
        },
        {
            title: '电站名称',
            key: 'plantName'
        },
        {
            title: '开始时间',
            key: 'begin'
        },
    ]

    const getList = async () => {
        const res = await getLatestAlarmsServe();
        if(res?.data?.data){
            setDataSource(res?.data?.data);
        }
    }

    useEffect(()=>{
        getList();
    }, [])
    return (
        <ScorllTable 
            showHeadLine={false}
            headBackground="#20284D"
            tableContentRowStyle={{
                borderBottom: '1px solid #939393'
            }}
            columns={columns}
            dataSource={dataSource}
        />
    )
}

export default RealtimeAlarm;