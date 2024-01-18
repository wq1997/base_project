import Table from '@/components/Table.jsx'
import { alarmTableColums } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useSelector, useIntl } from "umi";
import styles from "./index.less";
import { Pagination, DatePicker, Input, theme } from "antd"
import { apiListLogWithPage } from "@/services/total"

const RealtimeAlarm = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [username, setUserName] = useState();
  const { token } = theme.useToken();
  const { RangePicker } = DatePicker;
  const intl = useIntl();
  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
  }
  const clums = [
    {
      title: t('用户名'),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: t('操作对象'),
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: t('描述'),
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: t('操作时间'),
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
      startTime: startTime ? startTime : null,
      endTime: endTime ? endTime : null,
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
      <div className={styles.title} style={{ backgroundColor: token.cardBgc }}>
        <div className={styles.level}>
          <RangePicker
            style={{ width: 280 }}
            onChange={changeTime}
            allowClear
            placeholder={[t('开始') + t('时间'), t('结束') + t('时间')]}
            showTime
          />
        </div>
        <div className={styles.dataItem}>
          <Search placeholder={t('用户名')} onSearch={onSearch} enterButton />
        </div>
      </div>
      <div className={styles.tablePart} style={{ backgroundColor: token.cardBgc }}>
        <Table
          columns={clums}
          data={data.records}
        />
        <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data.total} onChange={changPage} />
      </div>

    </div>
  )
}

export default RealtimeAlarm;