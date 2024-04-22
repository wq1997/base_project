import React, { useContext, useEffect, useRef, useState } from 'react';
import { 
    Button, 
    Form, 
    InputNumber, 
    Popconfirm, 
    Table, 
    Input,
    Space,
    Select,
    DatePicker,
} from 'antd';
import { cloneObject } from "@/utils/utils";
import CustomDatePicker from '../CustomDatePicker';
import moment from 'moment';
import dayjs from 'dayjs';

// 编辑行的表格
const EditRowTable = ({ data, columns, showEdit, showClear, onChange, ...rest}) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(data);
  const [defaultColumns, setDefaultColumns] = useState(columns);
  const [editingKey, setEditingKey] = useState(-1);
  const isEditing = (record) => record.key === editingKey;
  const EditableCell = (props) => {
    const {
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        inputType="Input",
        editing,
        options,
        ...restProps
    } = props;

    const getFormByType = () =>{
        const props = {
            style: {
                width: '100%'
            }
        }
        switch(inputType){
            case "InputNumber":
                return <InputNumber {...props} />
            case "CustomDatePicker":
                return <CustomDatePicker {...props} />
            case "Select":
                return (
                    <Select options={options} {...props}/>
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
                            message: `${title} 是必填的!`,
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
    const index = dataSource.findIndex((item) => item.key === key);
    let newData = cloneObject(dataSource);
    newData[index] = {};
    setDataSource(newData);
    onChange(newData)
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const columns = cloneObject(defaultColumns);
        let object = cloneObject(row);
        columns?.forEach(column => {
            if(column.editable){
                if(column.inputType === "DatePicker"){
                    object[column.dataIndex] = moment(object[column.dataIndex]).format("YYYY-MM-DD");
                }else{
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
        if(column.editable){
            if(column.inputType === "DatePicker"){
                object[column.dataIndex] = dayjs(record[column.dataIndex]);
            }else{
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
            key: index
        }
    })
    setDataSource(newDataSource);
    onChange(newDataSource);
  }

  const getDefaultColoums = () => {
    const newColumns = cloneObject(columns);
    if(showEdit || showClear){
        newColumns.push({
            title: '操作',
            dataIndex: 'operation',
            align: 'center',
            render: (_, record) => {
              return (
                  <Space>
                        {
                            showEdit &&
                            <Button type="link" onClick={() => isEditing(record)?save(record?.key):edit(record)}>
                                {isEditing(record)?"保存":"编辑"}      
                            </Button>
                        }
                        {
                            showClear &&
                            <Popconfirm title="确认删除?" onConfirm={() => handleClear(record.key)}>
                                <Button type="link">清空</Button>    
                            </Popconfirm>
                        }
                  </Space>
              )
            }
        })
    }
    setDefaultColumns(newColumns);
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
                editing: isEditing(record),
                handleSave,
        }
      },
    };
  });

  useEffect(()=>{
    getDefaultColoums();
  }, [editingKey])

  useEffect(()=>{
    getDefaultDataSource();
  }, [])

  return (
    <Form form={form} component={false}>
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
  );
};
let EditTable = {};
EditTable.EditRowTable = EditRowTable; // 编辑行的表格
export default EditTable;