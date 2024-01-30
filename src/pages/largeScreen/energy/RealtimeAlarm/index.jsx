import { ScorllTable } from "@/components";
import { useState, useEffect } from "react";

const RealtimeAlarm = () => {
    const [dataSource, setDataSource] = useState([]);
    const columns = [
        {
            title: '告警类别',
            key: '7'
        },
        {
            title: '告警等级',
            key: '6'
        },
        {
            title: '告警描述',
            key: '5'
        },
        {
            title: '设备名称',
            key: '4'
        },
        {
            title: '电站名称',
            key: '3'
        },
        {
            title: '告警状态',
            key: '2'
        },
        {
            title: '开始时间',
            key: '1'
        },
    ]

    const getList = () => {
        setDataSource([
            {
                7: '储能',
                6: '高级',
                5: 'PCS通讯故障',
                4: 'PCS',
                3: 'AAA',
                2: '告警中',
                1: '2023.08.15 16:00'
            }
        ]);
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