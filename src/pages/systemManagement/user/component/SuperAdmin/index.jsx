import Table from '@/components/Table.jsx'
import { alarmTableColums } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useSelector, } from "umi";
import styles from "./index.less";
import { Pagination, Select, Input } from "antd"
import { getHistoryAlarmsByPlantIdWithPage } from "@/services/alarm"
const RealtimeAlarm = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [level,setLevel]=useState();
  const [field,setField]=useState("sn");
  const [textLike,setTextLike]=useState();

  const alarmLevel = [{
    label: 'User',
    value: '1',
    key: 'User',
  },
  {
    label: 'Admin',
    value: '4',
    key: 'Admin',
  },
  

]

  useEffect(() => {
    getData(current);
  }, [current,level,field,textLike]);

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
  const changeLevel=(value)=>{
    setLevel(value);
    console.log(level,111111111111);
  }
  const onSearch = async(value, _e, info) => {
    setTextLike(value);
    console.log(info, value)};
  return (
    <div className={styles.content}>
      <div className={styles.title}>
     
        <div className={styles.level}>
          <Select
            style={{ width: 150 }}
            onChange={changeLevel}
            options={alarmLevel}
            allowClear
            placeholder='用户角色'
          />
        </div>
        <div className={styles.dataItem}>
        <Search  placeholder="用户名搜索" onSearch={onSearch} enterButton />
        </div>
      </div>
      <Table
        columns={alarmTableColums}
        data={data.records}
      />
      <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data.total} onChange={changPage} />

    </div>
  )
}

export default RealtimeAlarm;