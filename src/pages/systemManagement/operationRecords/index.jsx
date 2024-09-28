import Table from '@/components/Table.jsx'
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
  const { locale } = useSelector(state => state.global);

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
    // {
    //   title: t('描述'),
    //   dataIndex: 'detail',
    //   key: 'detail',
    // },
    {
      title: t('动作'),
      dataIndex: 'describe',
      key: 'describe',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip'
    },
    {
      title: t('操作时间'),
      dataIndex: 'time',
      key: 'time',
      width: 220
    },
  ]
  const { user } = useSelector(function (state) {
    return state.user
});
  useEffect(() => {
    getData(current);
  }, [current, startTime, endTime, pageSize, locale]);
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
  const onSearch = async (e) => {
    setUserName(e.target.value);
  }
  const changeIp = (val) => {
    setIp(val.target.value);
  }

  const downLoadFoodModel = () => {  // 菜品模板下载
    let fileName = t('操作记录');
    let sheetName = t('操作记录');
    let sheetFilter = ['username', 'describe', 'ip', 'time'];
    let sheetHeader = [t('用户名'), t('动作'), 'IP', t('操作时间')];
    let exportData = data.list;

    downLoadExcelMode(fileName, exportData, sheetFilter, sheetHeader, sheetName);

  };
  return (
    <div className={styles.content} style={{height:'100%'}}>
      <div className={styles.title}>
        <div className={styles.level}>
          <RangePicker
            style={{ width: 280 }}
            onChange={changeTime}
            allowClear
            showTime
          />
        </div>
        <div className={styles.dataItem}>
          <Input placeholder={t('IP')} value={Ip} onChange={changeIp} allowClear />
        </div>
        {user?.roleId!=1&&<div className={styles.dataItem}>
          <Input placeholder={t('用户名')} value={username} onChange={onSearch} allowClear />
        </div>}
        <div style={{marginLeft: 20, display: 'flex', gap:10}}>
          <Button type="primary" onClick={()=>getData(current)}>{t('查询')}</Button>
          <Button type="primary" onClick={downLoadFoodModel} style={{ backgroundColor: token.defaultBg }} >
            {t('导出')} Excel
          </Button>
        </div>
      </div>
      <div className={styles.tablePart} style={{height: "calc(100% - 102px)" }}>
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