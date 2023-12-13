import Table from '@/components/Table.jsx'
import { alarmTableColums } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useSelector, } from "umi";
import { Pagination } from "antd"
import { getNowAlarmsByDeviceTypeWithPage } from "@/services/alarm"
const RealtimeAlarm = () => {
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);

    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        let timer = setInterval(() => {
            getData();
        }, 24000);
        return () => clearInterval(timer)
    }, [])
    const { currentPlantId } = useSelector(function (state) {
        return state.device
    });
    const getData = async (page) => {
        const { data } = await getNowAlarmsByDeviceTypeWithPage({
            plantId: currentPlantId,
            type: 'BMS',
            currentPage: page || 1,
            pageSize: 10,
        });
        setData(data.data);
    }
    const changPage = (page) => {
        setCurrent(page);
        getData(page);
    }

    return (
        <div>
            <Table
                columns={alarmTableColums}
                data={data.records}
            />
            <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data.total} onChange={changPage} />
        </div>
    )
}

export default RealtimeAlarm;