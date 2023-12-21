import { userTable } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useSelector, } from "umi";
import styles from "./index.less";
import { Table, Select, Input, Button } from "antd"
import { apiGetAllUserAndInfos } from "@/services/user"
import AddUser from '../AddUserModal'
const RealtimeAlarm = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [level, setLevel] = useState();
  const [textLike, setTextLike] = useState();
  const [isOpen, setIsOpen] = useState(false);
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
      <div className={styles.title}>
        <div className={styles.level}>
          <Select
            style={{ width: 150 }}
            onChange={changeLevel}
            options={alarmLevel}
            allowClear
            placeholder='用户角色'
          />
          <Search placeholder="用户名搜索" onSearch={onSearch} enterButton />
        </div>
        <div className={styles.dataItem}>
          <Button type='primary' onClick={changIsOpen} >新增</Button>
        </div>
      </div>
      <Table
        columns={userTable}
        dataSource={data}
      />
      <AddUser isOpen={isOpen} title={title} onRef={changIsOpen} />
    </div>
  )
}

export default RealtimeAlarm;