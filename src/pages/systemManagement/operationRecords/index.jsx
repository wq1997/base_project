import Table from '@/components/Table.jsx'
import { alarmTableColums } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useSelector, useIntl } from "umi";
import styles from "./index.less";
import { Pagination, DatePicker, Input, theme, Button } from "antd"
import { apiListLogWithPage } from "@/services/total"
import { downLoadExcelMode } from "@/utils/utils";

const RealtimeAlarm = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [username, setUserName] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [Ip, setIp] = useState('');

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
      title: t('描述'),
      dataIndex: 'detail',
      key: 'detail',
    },
    {
      title: t('动作'),
      dataIndex: 'describe',
      key: 'describe',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: t('操作时间'),
      dataIndex: 'time',
      key: 'time',
    },
  ]
  const { user } = useSelector(function (state) {
    return state.user
});
  useEffect(() => {
    getData(current);
  }, [current, startTime, endTime, username, Ip, pageSize]);
  const getData = async (page) => {
    const { data } = await apiListLogWithPage({
      pageNum: page,
      pageSize,
      begin: startTime ? startTime : null,
      end: endTime ? endTime : null,
      userName:username,
      ip: Ip,
    });
    setData(data?.data);
  }
  const changPage = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  }
  const changeTime = (value, dateString) => {
    setStartTime(dateString[0]);
    setEndTime(dateString[1]);
  }
  const onSearch = async (value, _e, info) => {
    setUserName(value);
  }
  const changeIp = (val) => {
    setIp(val.target.value);
  }

  const downLoadFoodModel = () => {  // 菜品模板下载
    let fileName = t('操作记录');
    let sheetName = t('操作记录');
    let sheetFilter = ['username', 'detail', 'describe', 'ip', 'time'];
    let sheetHeader = [t('用户名'), t('描述'), t('动作'), 'IP', t('操作时间')];
    let exportData = data.list;

    downLoadExcelMode(fileName, exportData, sheetFilter, sheetHeader, sheetName);

  };
  return (
    <div className={styles.content}>
      <div className={styles.title}>
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
          <Input placeholder={t('IP')} onChange={changeIp} enterButton />
        </div>
        {user.roleId!=1&&<div className={styles.dataItem}>
          <Search placeholder={t('用户名')} onSearch={onSearch} enterButton />
        </div>}
        <Button type="primary" onClick={downLoadFoodModel} style={{ backgroundColor: token.defaultBg, marginLeft: '30px' }} >
          {t('导出')} Excel
        </Button>
      </div>
      <div className={styles.tablePart}>
        <Table
          columns={clums}
          data={data?.list}
          pagination={false}
        />
        <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data?.total} onChange={changPage} />
      </div>

    </div>
  )
}

export default RealtimeAlarm;