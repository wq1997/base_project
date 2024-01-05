import { userTable } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useSelector, } from "umi";
import styles from "./index.less";
import { Table, Select, Input, Button,theme} from "antd"
import { apiGetAllUserAndInfos } from "@/services/user"
import AddUser from '../AddUserModal'
const RealtimeAlarm = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [level, setLevel] = useState();
  const [textLike, setTextLike] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [field,setField]=useState("User");
  const { token } = theme.useToken();
  const [title, setTitle] = useState('新增用户')
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
    getData();
  }, [level, textLike]);
  const selectBefore = (
    <Select defaultValue={alarmLevel[0].value} onChange={(e)=>{setField(e)}}>
      {alarmLevel.map((item) => {
        return (<Option value={item.value} key={item.value}>{item.label}</Option>)
      })}
    </Select>
  );
  const getData = async () => {
    const { data } = await apiGetAllUserAndInfos();
    setData(JSON.parse(data.data));
  }
  const changIsOpen = () => {
    setIsOpen(!isOpen);
  }
  const changeLevel = (value) => {
    setLevel(value);
  }
  const onSearch = async (value, _e, info) => {
    setTextLike(value);
  };
  return (
    <div className={styles.content}>
      <div className={styles.title} style={{backgroundColor:token.cardBgc}}>
        <div className={styles.level}>
          <Search addonBefore={selectBefore} placeholder="用户名搜索" onSearch={onSearch} enterButton />
        </div>
        <div className={styles.dataItem}>
          <Button type='primary' onClick={changIsOpen} >新增</Button>
        </div>
      </div>
      <div className={styles.tablePart} style={{backgroundColor:token.cardBgc}}>
      <Table
        columns={userTable}
        dataSource={data}
      />
      </div>
   
      <AddUser isOpen={isOpen} title={title} onRef={changIsOpen} />
    </div>
  )
}

export default RealtimeAlarm;