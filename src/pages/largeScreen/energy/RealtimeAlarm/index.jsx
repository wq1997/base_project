import { ScorllTable } from "@/components";
import { useState, useEffect } from "react";
import { getLatestAlarmsServe } from "@/services/bigScreen";
import dayjs from "dayjs";
const RealtimeAlarm = ({plantId}) => {
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
            key: 'begin',
        },
    ]

    const getList = async () => {
        const res = await getLatestAlarmsServe({plantId});
        if (res?.data?.data) {
            let arr = [];
            res?.data?.data.map(it => {
                it.begin = dayjs(it.begin).format('YYYY-MM-DD HH:mm:ss');
                arr.push(it);
            })
            setDataSource(arr);
        }
    }

    useEffect(() => {
        getList();
    }, [plantId])
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