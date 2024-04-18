import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, InputNumber, Popconfirm, Table, theme,message } from 'antd';
import { useSelector, useIntl, history } from "umi";
import styles from './index.less'
import { sendBurCmd2 } from '@/services/policy'

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },

        ]}
      >
        <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const App = ({ devId,dtuId }) => {
  const { token } = theme.useToken();
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      firstLine: '00:00-01:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    },
    {
      key: '2',
      firstLine: '01:00-02:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    },
    {
      key: '3',
      firstLine: '02:00-03:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '4',
      firstLine: '03:00-04:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '5',
      firstLine: '04:00-05:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '6',
      firstLine: '05:00-06:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '7',
      firstLine: '06:00-07:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '8',
      firstLine: '07:00-08:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '9',
      firstLine: '08:00-09:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '10',
      firstLine: '09:00-10:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '11',
      firstLine: '10:00-11:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '12',
      firstLine: '11:00-12:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '13',
      firstLine: '12:00-13:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '14',
      firstLine: '13:00-14:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '15',
      firstLine: '14:00-15:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '16',
      firstLine: '15:00-16:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '17',
      firstLine: '16:00-17:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '18',
      firstLine: '17:00-18:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '19',
      firstLine: '18:00-19:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '20',
      firstLine: '19:00-20:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '21',
      firstLine: '20:00-21:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '22',
      firstLine: '21:00-22:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }, {
      key: '23',
      firstLine: '22:00-23:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    },
    {
      key: '24',
      firstLine: '23:00-24:00',
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    },
  ]);
  const [count, setCount] = useState(2);
  const intl = useIntl();
  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
  }
  const handleDelete = (key) => {
    const index = dataSource.findIndex((item) => item.key === key);
    let newData = JSON.parse(JSON.stringify(dataSource));
    newData[index] = {
      ...dataSource[index],
      monPowers: 0,
      tuePowers: 0,
      wedPowers: 0,
      thuPowers: 0,
      friPowers: 0,
      satPowers: 0,
      sunPowers: 0,
    }
    setDataSource(newData);
  };

  const handleDeleteCloum = (key) => {
    let newData = JSON.parse(JSON.stringify(dataSource));
    if (key === defaultColumns.length - 1) {
      newData.map((it, i) => {
        newData[i] = {
          ...dataSource[i],
          monPowers: 0,
          tuePowers: 0,
          wedPowers: 0,
          thuPowers: 0,
          friPowers: 0,
          satPowers: 0,
          sunPowers: 0,
        };
      })
    } else {
      const dataIndex = defaultColumns.find((item) => item.key === key).dataIndex;
      newData?.map(it => {
        it[dataIndex] = 0;
        console.log(it[dataIndex], 1212121);
      })
    }
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: '',
      dataIndex: 'firstLine',
      className: styles.firstLine,
    },
    {
      title: 'Mon',
      dataIndex: 'monPowers',
      key: 1,
      editable: true,
      width: '12%'
    },
    {
      title: 'Tue',
      dataIndex: 'tuePowers',
      key: 2,
      editable: true,
      width: '12%'

    },
    {
      title: 'Wed',
      dataIndex: 'wedPowers',
      key: 3,
      editable: true,
      width: '12%'

    },
    {
      title: 'Thu',
      dataIndex: 'thuPowers',
      key: 4,
      editable: true,
      width: '12%'
    },
    {
      title: 'Fri',
      dataIndex: 'friPowers',
      key: 5,
      editable: true,
      width: '12%'
    },
    {
      title: 'Sat',
      dataIndex: 'satPowers',
      key: 6,
      editable: true,
      width: '12%'
    },
    {
      title: 'Sun',
      dataIndex: 'sunPowers',
      key: 7,
      editable: true,
      width: '12%'
    },
    {
      title: t('操作'),
      dataIndex: 'operation',
      align: 'center',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a className={styles.option}>{t('清空')}</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const [flag,setFlag]=useState(false)
  useEffect(() => {
    const timer = setInterval(() => {
        setFlag(prev => !prev )
    }, 1000*10)
    // 清除定时器
    return () => clearInterval(timer)
}, [])

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const finish = async () => {
    setFlag(prv=>!prv)
    let monPowers = [], tuePowers = [], wedPowers = [], thuPowers = [], friPowers = [], satPowers = [], sunPowers = [];
    dataSource?.map((it, index) => {
      monPowers?.push(it?.monPowers);
      tuePowers?.push(it?.tuePowers);
      wedPowers?.push(it?.wedPowers);
      thuPowers?.push(it?.thuPowers);
      friPowers?.push(it?.friPowers);
      satPowers?.push(it?.satPowers);
      sunPowers?.push(it?.sunPowers);
    })
    let { data } = await sendBurCmd2({
      devId: devId.pcsDevId,
      dtuId,
      mode: 1,
      cmdTypeId:7013,
      monPowers,
      tuePowers,
      wedPowers,
      thuPowers,
      friPowers,
      satPowers,
      sunPowers
    });
    if (data.code=='ok') {
      message.success(t('命令下发成功'), 3);
  }else{
      message.error(t('命令下发失败'), 3);
  }
  }
  return (
    <div className={styles.manual}>
      <Button type="primary"  onClick={finish} style={{ backgroundColor: token.defaultBg, marginBottom: "30px", display: 'block', marginLeft: 'auto' }}>{t("下发")}</Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        summary={() => (
          <Table.Summary >
            <Table.Summary.Row>
              {defaultColumns.map((it, index) => {
                return (
                  <Table.Summary.Cell index={index} align='center'>
                    {index == 0 ?
                      t('操作') :
                      <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteCloum(index)}>
                        <a className={styles.option}>{t('清空')}</a>
                      </Popconfirm>
                    }
                  </Table.Summary.Cell>)
              })}
            </Table.Summary.Row>
          </Table.Summary>
        )}

      />
    </div>
  );
};
export default App;