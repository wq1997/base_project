import Table from '@/components/Table.jsx'
import { alarmTableColums, alarmLevel } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useIntl, useSelector } from "umi";
import styles from "./index.less";
import { Pagination, Select, Input, theme, Button, DatePicker } from "antd"
import { downLoadExcelMode } from "@/utils/utils"
import { getHistoryAlarmsByOptionsWithPage, } from "@/services/alarm"
import dayjs from 'dayjs';
const RealtimeAlarm = () => {
  const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [level, setLevel] = useState();
  const [type, setType] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [time, setTime] = useState([null, null]);
  const { token } = theme.useToken();
  const [sn, setSn] = useState();
  const { locale } = useSelector(state => state.global);

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
    getTableListData(current);
  }, [current, level, type, time, pageSize]);
  useEffect(() => {

  }, [])


  const downLoadFoodModel = () => {  // 菜品模板下载
    let fileName = t('历史告警');
    let sheetData = data?.list;
    let sheetFilter = [];
    let sheetHeader = [];
    alarmTableColums.map(it => {
      sheetFilter.push(it.dataIndex);
      sheetHeader.push(t(it.key));
    })
    let nowtime = new Date()
    let sheetName = `${nowtime.getFullYear()}-${nowtime.getMonth() + 1}-${nowtime.getDate()}`
    downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader, sheetName)
  };

  const getTableListData = async (page) => {
    const { data } = await getHistoryAlarmsByOptionsWithPage({
      sn,
      currentPage: page || 1,
      pageSize,
      prior: level,
      begin: time?.length ? time[0]?.format('YYYY-MM-DD HH:mm:ss') : null,
      end: time?.length ? time[1]?.format('YYYY-MM-DD HH:mm:ss') : null
    });
    setData(data.data);
  }
  const changPage = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  }
  const changeLevel = (value) => {
    setLevel(value);
  }

  const changeTime = (value) => {
    setTime(value);
  }
  const upData = () => {
    getTableListData();
  }

  const changeSn = (e) => {
    setSn(e.target.value);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div className={styles.title}>
          <div className={styles.sn}>
            <Input placeholder={t('请输入') + t('设备编码')} style={{ width: 240 }} onChange={changeSn} />
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
          <div className={styles.date}>
            <RangePicker
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
              }}
              format="YYYY-MM-DD HH:mm:ss"
              onChange={changeTime}
            />
          </div>
          <Button type='primary' onClick={upData}>{t('查询')}</Button>
          <div className={styles.buttons}>
            <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={downLoadFoodModel} >
              {t('导出')} Excel
            </Button>
          </div>
        </div>
        <Table
          columns={alarmTableColums}
          data={data?.list}
          pagination={false}
          scroll={{y:"calc(100vh - 350px)"}}
        />
        <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data?.total} pageSizeOptions={[10, 20, 30]} onChange={changPage} />
      </div>
    </div>
  )
}

export default RealtimeAlarm;