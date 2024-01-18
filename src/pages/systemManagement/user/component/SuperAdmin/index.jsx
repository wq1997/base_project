import { useEffect, useState } from 'react'
import { useSelector, useIntl } from "umi";
import styles from "./index.less";
import { Table, Select, Input, Button, theme, Space, message,Modal } from "antd"
import { apiGetAllUserAndInfos } from "@/services/user"
import AddUser from '../AddUserModal'
import { apiSaveOrUpdateUser, apiDeleteUserById, apiUpdatePassword, apiListUserWithOptions } from '@/services/total'
import  { ExclamationCircleFilled } from '@ant-design/icons';
const RealtimeAlarm = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [level, setLevel] = useState();
  const [textLike, setTextLike] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);
  const { token } = theme.useToken();
  const [title, setTitle] = useState('新增用户');
  const [formData, setFormData] = useState();
  const [delId, setDelId] = useState();
  const intl = useIntl();
  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
  }
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
  const userTable = [
    {
      title: t('用户名'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('角色'),
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: t('手机号'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: t('邮箱'),
      dataIndex: 'mail',
      key: 'mail',
    },
    {
      title: t('公司'),
      dataIndex: 'company',
      key: 'company',
      width: 200

    },
    {
      title: t('备注'),
      dataIndex: 'desc',
      key: 'desc',
      // width: 200
    },
    {
      title: t('操作'),
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return (
          <Space>
            <Button type="primary" onClick={() => edit(record)}>{t('编辑')}</Button>
            <Button type="primary" danger onClick={() => changeIsOpenDel(record)}>{t('删除')}</Button>
            <Button type="primary" onClick={() => resetPwd(record)} style={{ backgroundColor: token.defaultBg }}>{t('重置密码')}</Button>
          </Space>
        )
      }
    }
  ];
  useEffect(() => {
    searchData();
  }, [level, textLike,formData]);
  

  const searchData = async () => {
    const { data } = await apiListUserWithOptions({
      name: textLike,
      roleId: level
    });
    setData(data.data);
  }
  const changIsOpen = () => {
    setFormData({
      name: '',
      password: '',
      desc: '',
      phone: '',
      mail: '',
      company: '',
      roleId: '1',
    });
    setTitle('新增用户');
    setIsOpen(!isOpen);
  }
  const changeIsOpenDel=(record)=>{
    setDelId(record.f0102_Id);
    setIsOpenDel(!isOpenDel)
  }
  const cancle = () => {
    setIsOpen(!isOpen);
  }
  const onSearch = (value, _e, info) => {
    setTextLike(value);
  };
  const roleIdSearch = (value) => {
    setLevel(value);

  };
  const edit = (record) => {
    setFormData(record);
    setTitle('编辑用户');
    setIsOpen(!isOpen);
  }
  const del = async () => {
    let data = await apiDeleteUserById({ userId: delId });
    if (data.data) {
      // getData();
      // message.success(data.msg)
    };
    setIsOpenDel(!isOpenDel)

  }
  const resetPwd = (record) => {

  }
  const changeData = async (value) => {
    const { data } = await apiSaveOrUpdateUser(value)
    if (data.data) {
      setFormData(value);
    } else {
      message.error(data.msg)
    }
  }
  return (
    <div className={styles.content}>
      <div className={styles.title} style={{ backgroundColor: token.cardBgc }}>
        <Select
          style={{
            width: 120,
          }}
          placeholder={t('选择') + t('角色')}
          options={alarmLevel}
          onChange={roleIdSearch}
          allowClear
        />
        <div className={styles.level}>
          <Search style={{ width: 280 }} placeholder={t("用户名")} onSearch={onSearch} enterButton allowClear />
        </div>
        <div className={styles.dataItem}>
          <Button type='primary' onClick={changIsOpen} >{t('新增')}</Button>
        </div>
      </div>
      <div className={styles.tablePart} style={{ backgroundColor: token.cardBgc }}>
        <Table
          columns={userTable}
          dataSource={data}
          scroll={{ x: 'max-content' }}
        />
      </div>
      <AddUser isOpen={isOpen} title={title} formData={formData} onRef={cancle} changeData={(value) => changeData(value)} />
      <Modal 
      title={[<><ExclamationCircleFilled style={{color:'#FAAD14',marginRight:'10px'}}/>系统提示</>]}
      open={isOpenDel} 
      onOk={del}  
      onCancel={changeIsOpenDel}
      >
          数据删除后将无法恢复，是否确认删除该条数据？
      </Modal>
    </div>
  )
}

export default RealtimeAlarm;