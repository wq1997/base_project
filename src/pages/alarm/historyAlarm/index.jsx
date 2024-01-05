import Table from '@/components/Table.jsx'
import { alarmTableColums } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useSelector, } from "umi";
import styles from "./index.less";
import { Pagination, Select, Input, theme, Button, DatePicker } from "antd"
import { CardModel } from "@/components";
import { getHistoryAlarmsByPlantIdWithPage } from "@/services/alarm"
import {
  HistoryOutlined,
  ReconciliationOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import PieEcharts from '@/components/PieEcharts'
const RealtimeAlarm = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [level, setLevel] = useState();
  const [field, setField] = useState("sn");
  const [textLike, setTextLike] = useState();
  const { token } = theme.useToken();

  const dataItems = [
    {
      label: '设备编码',
      value: 'sn'
    },
    {
      label: '设备名称',
      value: 'dtuName'
    },
    {
      label: '告警描述',
      value: 'desc'
    },
  ];
  const alarmLevel = [{
    label: '一级',
    value: '1',
    key: '一级',

  },
  {
    label: '二级',
    value: '2',
    key: '二级',
  },
  {
    label: '三级',
    value: '3',
    key: '三级',
  },
  {
    label: '四级',
    value: '4',
    key: '四级',
  },

  ]
  const selectBefore = (
    <Select defaultValue={dataItems[0].value} onChange={(e) => { setField(e) }}>
      {dataItems.map((item) => {
        return (<Option value={item.value} key={item.value}>{item.label}</Option>)
      })}
    </Select>
  );

  useEffect(() => {
    getData(current);
  }, [current, level, field, textLike]);

  const { currentPlantId } = useSelector(function (state) {
    return state.device
  });
  const getData = async (page) => {
    const { data } = await getHistoryAlarmsByPlantIdWithPage({
      plantId: currentPlantId,
      currentPage: page || 1,
      pageSize: 10,
      level,
      field,
      textLike,
    });
    setData(data.data);
  }
  const changPage = (page) => {
    setCurrent(page);
  }
  const changeLevel = (value) => {
    setLevel(value);
  }
  const onSearch = async (value, _e, info) => {
    setTextLike(value);
    console.log(info, value)
  };
  const topData = [
    {
      icon: <HistoryOutlined />,
      name: "历史告警总数",
      color: '#03B4B4',
      value: '1000',
      unit: ''
    },
    {
      icon: <ReconciliationOutlined />,
      name: "今日处理告警",
      color: '#ED750E',
      value: '999',
      unit: ''
    },
    {
      icon: <ScheduleOutlined />,
      name: "平均处理时长",
      color: '#5B8FF9',
      value: '6',
      unit: 'h'
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
                      {it.value}
                      <span style={{ fontSize: '16px', fontWeight: 400, marginLeft: '10px', }}>{it.unit}</span>
                    </div>
                  </div>
                )
              })}
              <div className={styles.pieItem}>
                <PieEcharts allData={{
                  total: 100, subtext: '总数', data: [
                    { value: 50, name: '三级' },
                    { value: 25, name: '高级' },
                    { value: 25, name: '严重' },]
                }}></PieEcharts>
                <div className={styles.pieItem_bottom} style={{color:token.smallTitleColor}}>告警等级分布</div>
              </div>
              <div className={styles.pieItem}>
                <PieEcharts allData={{
                  total: 100, subtext: '总数', data: [
                    { value: 50, name: '三级' },
                    { value: 25, name: '高级' },
                    { value: 25, name: '严重' },]
                }}></PieEcharts>
                <div className={styles.pieItem_bottom} style={{color:token.smallTitleColor}}>告警类别分布</div>

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
          <div className={styles.date}>
            <DatePicker />
          </div>
          <div className={styles.dataItem}>
            <Search addonBefore={selectBefore} placeholder="input search text" onSearch={onSearch} enterButton />
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
        />
        <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data.total} onChange={changPage} />

      </div>


    </div>

  )
}

export default RealtimeAlarm;