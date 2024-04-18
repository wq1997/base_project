import Table from '@/components/Table.jsx'
import { alarmTableColums } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useSelector, useIntl } from "umi";
import { CardModel } from "@/components";
import styles from "./index.less";
import { Pagination, theme, Select, Input, Button, DatePicker } from "antd"
import { getNowAlarmsWithPage } from "@/services/alarm"
import { alarmLevel } from "@/utils/constants"
import dayjs from 'dayjs';
const RealtimeAlarm = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const { token } = theme.useToken();
  const [level, setLevel] = useState();
  const [sn, setSn] = useState();
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
    getData();
  }, []);
  useEffect(() => {
    let timer = setInterval(() => {
      getData();
    }, 24000);
    return () => clearInterval(timer)
  }, [])
  const getData = async (page) => {
    const { data } = await getNowAlarmsWithPage({
      currentPage: page || 1,
      pageSize: 20,
      sn,
      prior:level,
    });
    setData(data.data);
  }
  const changPage = (page) => {
    setCurrent(page);
    getData(page);
  }
  const changeLevel = (value) => {
    setLevel(value);
  }

  const changeSn=(e)=>{
    setSn(e.target.value);
  }
  const upData=()=>{
    getData();
  }
  return (
    <div style={{ width: '100%', height: '100%', paddingBottom: '10px' }}>
      <div className={styles.alarmWrap} style={{ padding: '35px 35px', backgroundColor: token.titleCardBgc }}>
        <div className={styles.title}>
          <div className={styles.sn}>
            <Input placeholder={t('请输入') + t('设备编码')}  style={{ width: 240 }} onChange={changeSn}/>
          </div>
          <div className={styles.level}>
            <Select
              style={{ width: 180 }}
              onChange={changeLevel}
              options={alarmLevel}
              allowClear
              placeholder={t('告警等级')}
            />
          </div>
          <Button type='primary' onClick={upData}>{t('查询')}</Button>
        </div>
        <Table
          columns={alarmTableColums}
          data={data?.list}
          pagination={false}
        />
        <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data?.total} pageSize={data?.size} onChange={changPage} />
      </div>
    </div>


  )
}

export default RealtimeAlarm;