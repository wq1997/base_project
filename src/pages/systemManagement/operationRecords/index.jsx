import Table from '@/components/Table.jsx'
import { alarmTableColums } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useSelector, } from "umi";
import styles from "./index.less";
import { Pagination, DatePicker, Input } from "antd"
import { apiListLogWithPage } from "@/services/total"
const RealtimeAlarm = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [username, setUserName] = useState();
  const { RangePicker } = DatePicker;
  const clums = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '操作对象',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
  ]
  useEffect(() => {
    getData(current);
  }, [current, startTime, endTime, username]);

  const getData = async (page) => {
    const { data } = await apiListLogWithPage({
      currentPage: page,
      pageSize: 10,
      startTime,
      endTime,
      username,
    });
    setData(data.data);
  }
  const changPage = (page) => {
    setCurrent(page);
  }
  const changeTime = (value, dateString) => {
    setStartTime(dateString[0]);
    setEndTime(dateString[1]);
  }
  const onSearch = async (value, _e, info) => {
    setUserName(value);
  }
  return (
    <div className={styles.content}>
      <div className={styles.title}>

        <div className={styles.level}>
          <RangePicker
            style={{ width: 400 }}
            onChange={changeTime}
            allowClear
            placeholder='选择时间'
            showTime
          />
        </div>
        <div className={styles.dataItem}>
          <Search placeholder="input search text" onSearch={onSearch} enterButton />
        </div>
      </div>
      <Table
        columns={clums}
        data={data.records}
      />
      <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data.total} onChange={changPage} />

    </div>
  )
}

export default RealtimeAlarm;