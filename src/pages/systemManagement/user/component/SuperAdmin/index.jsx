import { useEffect, useState, } from 'react'
import { useSelector, useIntl } from "umi";
import styles from "./index.less";
import { Table, Select, Input, Button, theme, Space, message, Modal } from "antd"
import { getBurUserWithRole2, getAllUserRoot, updateUserAndInfos } from "@/services/user"
import AddUser from '../AddUserModal'
import { apiDeleteUserById, } from '@/services/user'
import { ExclamationCircleFilled } from '@ant-design/icons';
const RealtimeAlarm = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [level, setLevel] = useState(0);
  const [textLike, setTextLike] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);
  const { token } = theme.useToken();
  const [title, setTitle] = useState('新增用户');
  const [formData, setFormData] = useState();
  const [delId, setDelId] = useState();
  const [userUp, setUserUp] = useState([]);
  const [rootUp, setRootUp] = useState([]);

  const intl = useIntl();
  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
  }

  const userTable = [
    {
      title: t('用户名'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('角色'),
      dataIndex: 'roleId',
      key: 'roleId',
      render: (record) => {
        return record == 1 ? t('普通用户') : record == 2 ? t('管理员') : t('超级管理员');
      }
    },
    {
      title: t('手机'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: t('邮箱'),
      dataIndex: 'mail',
      key: 'mail',
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
            {/* <Button type="primary" onClick={() => resetPwd(record)} style={{ backgroundColor: token.defaultBg }}>{t('重置密码')}</Button> */}
          </Space>
        )
      }
    }
  ];
  useEffect(() => {
    searchData();
  }, [level, textLike, formData, delId]);
  useEffect(() => {
    getInitData();
  }, [])
  const getInitData = async () => {
    let { data } = await getBurUserWithRole2();
    let arr = [];
    data.data?.superusers.map(it => {
      arr.push({
        label: it.name,
        value: it.f0102_Id,
        roleId:2,
        disabled:false,
      })
    });
    arr.push({
      label: data.data?.root.name,
      value: data.data?.root.f0102_Id,
      roleId: 3,
      disabled:false,
    })

    setUserUp(arr)
  }

  const searchData = async () => {
    const { data } = await getAllUserRoot({
      name: textLike,
      roleId: level || 0
    });
    setData(data?.data);
  }
  const changIsOpen = () => {
    setFormData({
      name: '',
      password: '',
      desc: '',
      phone: '',
      mail: '',
      company: '',
      roleId: 1,
    });
    setTitle('新增用户');
    setIsOpen(!isOpen);
  }
  const changeIsOpenDel = (record) => {
    setDelId(record?.f0102_Id);
    setIsOpenDel(!isOpenDel)
  }
  const cancle = () => {
    setIsOpen(!isOpen);
  }

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
    if (data?.data) {
      // getData();
      // message.success(data.msg)
    };
    setIsOpenDel(!isOpenDel)
    searchData();

  }
  const changeData = async (value) => {
    const { data } = await updateUserAndInfos(value)
    if (data?.data) {
      setFormData(value);
      message.success(title=='编辑用户'?t('编辑成功'):t('新增成功'))
    } else {
      message.error(title=='编辑用户'?t('编辑失败'):t('新增失败'))
    }
  }
  return (
    <div className={styles.content}>
      <div className={styles.title} style={{ backgroundColor: token.cardBgc }}>
        <Select
          style={{
            width: 120,
          }}
          placeholder={t('选择角色')}
          options={[
            {
              label: t('普通用户'),
              value: 1,
            },
            {
              label: t('管理员'),
              value: 2,
            },
          ]}
          onChange={roleIdSearch}
          allowClear
        />
      
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
      <AddUser isOpen={isOpen} userUp={userUp} title={title} formData={formData} onRef={cancle} changeData={(value) => changeData(value)} />
      <Modal
        title={[<><ExclamationCircleFilled style={{ color: '#FAAD14', marginRight: '10px' }} />{t('系统提示')}</>]}
        open={isOpenDel}
        onOk={del}
        onCancel={changeIsOpenDel}
      >
        {t('数据删除后将无法恢复，是否确认删除该条数据？')}
      </Modal>
    </div>
  )
}

export default RealtimeAlarm;