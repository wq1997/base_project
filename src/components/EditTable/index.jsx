import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  theme,
  Form,
  InputNumber,
  Popconfirm,
  Table,
  Input,
  Space,
  Select,
  DatePicker,
  Button,
  Row,
  message,
} from 'antd';
import { useIntl } from "umi";
import { cloneObject } from "@/utils/utils";
import CustomDatePicker from '../CustomDatePicker';
import moment from 'moment';
import dayjs from 'dayjs';
import styles from "./index.less";

// 编辑行的表格
const EditRowTable = ({
  data = [],
  columns,
  showAdd,
  showEdit,
  showClear,
  showDelete,
  onChange,
  tabValue,
  correlationList,
  maxLength,
  ...rest
}) => {
  const intl = useIntl();
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(data);
  const [defaultColumns, setDefaultColumns] = useState(columns);
  const [editingKey, setEditingKey] = useState(-1);
  const isEditing = (record) => record.key === editingKey;
  const hasEditing = editingKey > 0;
  const EditableCell = (props) => {
    const {
      title,
      editable,
      children,
      dataIndex,
      record,
      handleSave,
      inputType = "Input",
      editing,
      options,
      mode,
      ...restProps
    } = props;
    const getFormByType = () => {
      const props = {
        style: {
          width: '100%'
        }
      }
      switch (inputType) {
        case "InputNumber":
          return <InputNumber {...props} min={0} />
        case "CustomDatePicker":
          return <CustomDatePicker {...props} />
        case "Select":
          return (
            <Select options={options} mode={mode} {...props} />
          )
        case "DatePicker":
          return <DatePicker options={options} />
        default:
          return <Input {...props} />
      }
    }
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `${title} ${intl.formatMessage({ id: '是必填的!' })}!`,
              },
            ]}
          >
            {getFormByType()}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const handleClear = (key) => {
    const index = dataSource.findIndex((item) => item?.key === key);
    let newData = cloneObject(dataSource);
    newData[index] = {};
    setDataSource(newData);
    onChange(newData);
    setEditingKey(-1);
  };

  const handleDelete = (key) => {
    const index = dataSource.findIndex((item) => item?.key === key);
    let newData = cloneObject(dataSource);
    newData[index] = null;
    newData = newData?.filter(item => item);
    setDataSource(newData);
    onChange(newData);
    setEditingKey(-1);
  }

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => item?.key === key);
      if (index > -1) {
        const columns = cloneObject(defaultColumns);
        let object = cloneObject(row);
        columns?.forEach(column => {
          if (column.editable) {
            if (column.inputType === "DatePicker") {
              object[column.dataIndex] = moment(object[column.dataIndex]).format("YYYY-MM-DD");
            } else if (column.inputType === "Select" && column.mode === "multiple") {
              object[column.dataIndex] = object[column.dataIndex]?.join(',')
            } else {
              object[column.dataIndex] = object[column.dataIndex]
            }
          }
        })
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...object,
        });
        setDataSource(newData);
        onChange(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        onChange(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const edit = (record) => {
    const columns = cloneObject(defaultColumns);
    let object = {};
    columns?.forEach(column => {
      if (column.editable) {
        if (column.inputType === "DatePicker") {
          object[column.dataIndex] = dayjs(record[column.dataIndex]);
        } else if (column.inputType === "Select" && column.mode === "multiple") {
          object[column.dataIndex] = Array.isArray(record[column.dataIndex])?record[column.dataIndex]:record[column.dataIndex]?.split(',')
        } else {
          object[column.dataIndex] = record[column.dataIndex]
        }
      }
    })
    form.setFieldsValue(object);
    setEditingKey(record?.key);
  }

  const getDefaultDataSource = () => {
    let newDataSource = cloneObject(data);
    newDataSource = newDataSource?.map((item, index) => {
      return {
        ...item,
        key: index + 1
      }
    })
    setDataSource(newDataSource);
    if (newDataSource?.length > 0) {
      onChange(newDataSource);
    }
  }

  const getDefaultColoums = () => {
    const newColumns = cloneObject(columns || []);
    if (showEdit || showClear || showDelete) {
      newColumns.push({
        title: intl.formatMessage({ id: '操作' }),
        dataIndex: 'operation',
        render: (_, record) => {
          return (
            <Space size={20}>
              {
                showEdit &&
                <div
                  type="link"
                  onClick={() => isEditing(record) ? save(record?.key) : edit(record)}
                  style={{ color: token.colorPrimary, cursor: 'pointer' }}
                >
                  {isEditing(record) ? intl.formatMessage({ id: '保存' }) : intl.formatMessage({ id: '编辑' })}
                </div>
              }
              {
                showClear &&
                <Popconfirm
                  title={`${intl.formatMessage({ id: '确认清空' })}?`}
                  onConfirm={() => {
                    if (hasEditing) {
                      message.error(intl.formatMessage({ id: "当前在编辑状态，不可操作" }));
                    } else {
                      handleClear(record?.key)
                    }
                  }}
                >
                  <div type="link" style={{ color: '#F7A037', cursor: 'pointer' }}>{intl.formatMessage({ id: '清空' })}</div>
                </Popconfirm>
              }
              {
                showDelete &&
                <Popconfirm
                  title={`${intl.formatMessage({ id: '确认删除' })}?`}
                  onConfirm={() => {
                    handleDelete(record?.key)
                  }}
                >
                  <div type="link" style={{ color: '#F03535', cursor: 'pointer' }}>{intl.formatMessage({ id: '删除' })}</div>
                </Popconfirm>
              }
            </Space>
          )
        }
      })
    }
    setDefaultColumns(newColumns);
  }

  const add = async () => {
    if (dataSource?.length >= maxLength) {
      message.error(intl.formatMessage({ id: "最多可配置{count}条策略！" }, { count: maxLength }));
      return;
    }
    if (hasEditing) {
      message.error(intl.formatMessage({ id: "当前在编辑状态，不可操作" }));
    } else {
      let newDataSource = cloneObject(dataSource);
      let keyList = newDataSource.map(data => data.key);
      let key = Math.max(...keyList) + 1;
      newDataSource.push({
        key
      });
      await form.resetFields();
      setDataSource(newDataSource);
      setEditingKey(key);
    }
  }

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    onChange(newData);
  };

  const components = {
    body: {
      cell: EditableCell,
    },
  };
  const myColumns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => {
        return {
          options: col.options,
          inputType: col.inputType,
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          mode: col?.mode,
          editing: isEditing(record),
          handleSave,
        }
      },
    };
  });

  useEffect(() => {
    getDefaultColoums();
  }, [editingKey, dataSource, showClear, showEdit, showDelete])

  useEffect(() => {
    getDefaultDataSource();
  }, [data])

  return (
    <div className={styles.editTable}>
      <Space direction="vertical" size={20} style={{ width: '100%' }}>
        <Row justify="end">
          <Button
            style={{ background: 'linear-gradient(90deg, #0787DB 0%, #034FB4 100%)', border: 'none' }}
            onClick={add}
            disabled={!showAdd}
          >
            {intl.formatMessage({ id: '新增' })}
          </Button>
        </Row>
        <Form
          form={form}
          component={false}
          onValuesChange={(changedValues, allValues) => {
            if (correlationList?.length > 0) {
              if (Object.keys(changedValues)[0] === correlationList[0] && dataSource?.length > 0) {
                const currentObject = dataSource.find(item => item[correlationList[0]] === Object.values(changedValues)[0]);
                if (currentObject) {
                  form.setFieldsValue({
                    [correlationList[1]]: currentObject[correlationList[1]]
                  })
                } else {
                  form.setFieldsValue({
                    [correlationList[1]]: undefined
                  })
                }
              }
            }
          }}
        >
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={myColumns}
            pagination={false}
            {...rest}
          />
        </Form>
      </Space>
    </div>
  );
};
let EditTable = {};
EditTable.EditRowTable = EditRowTable; // 编辑行的表格
export default EditTable;