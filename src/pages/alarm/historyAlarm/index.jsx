import Table from '@/components/Table.jsx'
import { alarmTableColums } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useSelector, } from "umi";
import styles from "./index.less";
import { Pagination, Select, Input, theme, Button, DatePicker } from "antd"
import { CardModel } from "@/components";
import { getHistoryAlarmsByOptionsWithPage, getHistoryAlarmsStatistics } from "@/services/alarm"
import {
  HistoryOutlined,
  ReconciliationOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import PieEcharts from '@/components/PieEcharts'
const RealtimeAlarm = () => {
  const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [dataTotal, setDatadataTotal] = useState([]);
  const [current, setCurrent] = useState(1);
  const [level, setLevel] = useState();
  const [type, setType] = useState();
  const [time, setTime] = useState([null, null]);
  const { token } = theme.useToken();
  const [screenH, setScreenH] = useState('');
  const [scroolY, setScroolY] = useState(200);

  useEffect(() => {
    setScreenH(document.documentElement.clientHeight || document.body.clientHeight)
    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  const handleWindowResize = () => {
    setScreenH(document.documentElement.clientHeight || document.body.clientHeight)
  }
  useEffect(() => {
    if (screenH < 1000) {
      setScroolY(300);
    } else if (screenH > 1000 && screenH < 1300) {
      setScroolY(400);
    } else if (screenH > 1300) {
      setScroolY(500);
    }
  }, [screenH])
  const alarmLevel = [
    {
      label: '低级',
      value: '1',
      key: '低级',
    },
    {
      label: '普通',
      value: '2',
      key: '普通',
    },
    {
      label: '严重',
      value: '3',
      key: '严重',
    },
    {
      label: '高级',
      value: '4',
      key: '高级',
    },
  ];
  const typeOfstation = [
    {
      label: '储能',
      value: '1',
      key: '储能',
    },
    {
      label: '光伏',
      value: '2',
      key: '光伏',
    },
    {
      label: '充电桩',
      value: '3',
      key: '充电桩',
    },
  ];



  useEffect(() => {
    getTableListData(current);
  }, [current, level, type, time]);

  useEffect(() => {
    getTotalData();
  }, [])
  const sum = (arr) => {
    return arr?.reduce((prev, cur) => {
      return prev + cur.value
    }, 0)
  }
  const { currentPlantId } = useSelector(function (state) {
    return state.device
  });
  const getTotalData = async () => {
    const { data } = await getHistoryAlarmsStatistics({ plantId: currentPlantId || localStorage.getItem('plantId') });
    setDatadataTotal(data.data)
  };
  const getTableListData = async (page) => {
    const { data } = await getHistoryAlarmsByOptionsWithPage({
      plantId: currentPlantId || localStorage.getItem('plantId'),
      currentPage: page || 1,
      pageSize: 10,
      prior: level,
      type,
      begin: time?.length ? time[0]?.format('YYYY-MM-DD HH:mm:ss') : null,
      end: time?.length ? time[1]?.format('YYYY-MM-DD HH:mm:ss') : null
    });
    setData(data.data);
  }
  const changPage = (page) => {
    setCurrent(page);
  }
  const changeLevel = (value) => {
    setLevel(value);
  }
  const changeType = (value) => {
    setType(value);
  }
  const changeTime = (value) => {
    setTime(value);
  }
  const topData = [
    {
      icon: <HistoryOutlined />,
      name: "严重告警历史总数",
      color: '#03B4B4',
      key: 'historyCount',
      value: '',
      unit: '个'
    },
    {
      icon: <ReconciliationOutlined />,
      name: "今日处理严重告警数",
      color: '#ED750E',
      key: 'currentCount',
      value: '',
      unit: '个'
    },
    {
      icon: <ScheduleOutlined />,
      name: "近半年严重告警平均处理时长",
      color: '#5B8FF9',
      key: 'avgCost',
      value: '',
      unit: ''
    },
  ];
  return (
    <div className={styles.wrap}>
      <div className={styles.heard}>
        <CardModel
          title='历史告警'
          content={
            <div className={styles.topContent}>
              {topData.map(it => {
                return (
                  <div className={styles.topItem} style={{ color: it.color, backgroundColor: token.cardBgc, boxShadow: token.cardShadow }}>
                    <div className={styles.topItemTitle}>
                      {it.icon}
                      <span style={{ color: token.smallTitleColor, fontWeight: 500, fontSize: '16px', marginLeft: '3px' }}>{it.name}</span>
                    </div>
                    <div className={styles.topVaue} >
                      {dataTotal[it.key] || 0}
                      <span style={{ fontSize: '16px', fontWeight: 400, marginLeft: '10px', height: '10%', lineHeight: '150%' }}>{it.unit}</span>
                    </div>
                  </div>
                )
              })}
              <div className={styles.pieItem}>
                <PieEcharts allData={{
                  total: sum(dataTotal?.priorStatistics), subtext: '总数', data: dataTotal?.priorStatistics
                }}></PieEcharts>
                <div className={styles.pieItem_bottom} style={{ color: token.smallTitleColor }}>告警等级分布</div>
              </div>
              <div className={styles.pieItem}>
                <PieEcharts 
                  top={'50%'}
                allData={{
                  total: sum(dataTotal?.typeStatistics), subtext: '总数', data: dataTotal?.typeStatistics 
                }}></PieEcharts>
                <div className={styles.pieItem_bottom} style={{ color: token.smallTitleColor }}>告警类别分布</div>

              </div>
            </div>
          }
        />
      </div>


      <div className={styles.content} style={{ backgroundColor: token.titleCardBgc }}>
        <div className={styles.title}>
          <div className={styles.level}>
            <Select
              style={{ width: 150 }}
              onChange={changeLevel}
              options={alarmLevel}
              allowClear
              placeholder='告警等级'
            />
          </div>
          <div className={styles.dataItem}>
            <Select
              style={{ width: 150 }}
              onChange={changeType}
              options={typeOfstation}
              allowClear
              placeholder='设备类型'
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

          <div className={styles.buttons}>
            <Button type="primary" style={{ backgroundColor: token.defaultBg }} >
              导出excel
            </Button>
          </div>
        </div>
        <Table
          columns={alarmTableColums}
          data={data.records}
          pagination={false}
          scroll={{ y: scroolY }}
        />
        <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data.total} onChange={changPage} />

      </div>


    </div>

  )
}

export default RealtimeAlarm;