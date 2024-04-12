import Table from '@/components/Table.jsx'
import { alarmTableColums } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useSelector, } from "umi";
import { CardModel } from "@/components";
import styles from "./index.less";
import { Pagination, theme } from "antd"
import { getNowAlarmsWithPage } from "@/services/alarm"
let clum=[...alarmTableColums];
clum[7]={};
const RealtimeAlarm = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const { token } = theme.useToken();
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
    const { data } = await getNowAlarmsWithPage({
      currentPage: page || 1,
      pageSize: 20,
      plantId:currentPlantId||localStorage.getItem('plantId')
    });
    setData(data.data);
  }
  const changPage = (page) => {
    setCurrent(page);
    getData(page);
  }

  return (
    <div style={{width:'100%',height:'100%',padding:'0 0 10px 0'}}>
      <CardModel
        title={
          '实时告警'
        }
        content={
          <div className={styles.alarmWrap}>
            <Table
              columns={clum}
              data={data.records}
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
            <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data.total} pageSize={data.size} onChange={changPage} />
          </div>

        }
      />
    </div>


  )
}

export default RealtimeAlarm;