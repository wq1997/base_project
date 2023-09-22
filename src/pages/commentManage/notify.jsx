import { PageTitle, Search } from "@/components";
import { Row, Button, Form, Table, Modal, Input, Tooltip, Select } from "antd";
import { useState, useRef } from "react";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE } from "@/utils/constants";
import { useDebounceEffect } from "ahooks";
import { 
    getNotify as getNotifyServe,
    getNotifyByName as getNotifyByNameServe,
    addNotify as addNotifyServe,
    updateNotify as updateNotifyServe,
    deleteNotify as deleteNotifyServe,
    getNotifyType as getNotifyTypeServe
} from "@/services/serve";
import { useEffect } from "react";

const Notify = () => {
    const [form] = Form.useForm();
    const [keyword, setKeyword] = useState("");
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState("");
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [notifyTypeList, setNotifyTypeList] = useState([]);
    const paginationRef = useRef(DEFAULT_PAGINATION);

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render(text,record,index){
                return index+1;
            }
        },
        {
            title: '通知类型',
            dataIndex: 'informType',
            key: 'informType',
        },
        {
            title: '通知内容',
            dataIndex: 'text',
            key: 'text',
            ellipsis: true,
            width: 400,
            render(value){
                return (
                    <Tooltip title={value}>
                        <div 
                            style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                width: 400,
                            }}
                        >
                            {value}
                        </div>
                    </Tooltip>
                )
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            dataIndex: 'Actions',
            key: 'Actions',
            render(text,record){
                return (
                    <Row>
                        <Button 
                            type="link"
                            onClick={()=>{
                                form.setFieldsValue({
                                    ...record
                                })
                                setType("Edit");
                                setVisible(true);
                                setCurrentRecord(record);
                            }}
                        >
                            编辑
                        </Button>
                        <Button 
                            type="link"
                            onClick={()=>{
                               Modal.confirm({
                                 title: "系统提示",
                                 content: "数据删除后将无法恢复，是否确认删除该条数据？",
                                 okText: '确定',
                                 cancelText: '取消',
                                 onOk: async () => {
                                    const res = await deleteNotifyServe({id: record?.id});
                                    if(res?.data){
                                        getList();
                                    }
                                 }
                               });
                            }}
                        >
                            删除
                        </Button>
                    </Row>
                )
            }
        },
    ]

    const onSubmit = async () => {
        let res = null;
        try {
            const values = await form.validateFields();
            if(type==="Edit"){
                res = await updateNotifyServe({
                    ...values,
                    id: currentRecord?.id
                })
            }else{
                res = await addNotifyServe(values);
            }
            if(res?.data){
                getList();
                onCancel();
            }

          } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }

    const onCancel = () => {
        setVisible(false);
        form.resetFields();
        setCurrentRecord(null);
    }

    const getList = async () => {
        setLoading(true);
        let res = null;
        const { current, pageSize } = paginationRef.current;
        if(!keyword){
            res = await getNotifyServe({
                current, 
                size: pageSize
            })
        }else{
            res = await getNotifyByNameServe({
                current, 
                size: pageSize,
                name: keyword
            })
        }
        if(res?.data?.records){
            setDataSource(res?.data?.records);
            setPagination({
                ...paginationRef.current,
                total: res?.data?.total
            })
        }
        setLoading(false);
    }

    const getNotifyType = async () => {
        const res = await getNotifyTypeServe();
        if(res?.data){
            setNotifyTypeList(res?.data)
        }
    }

    useDebounceEffect(()=>{
        getList();
    }, [keyword], {
        wait: 500
    });

    useEffect(()=>{
        getNotifyType();
    }, [])

    return (
        <div>
            <PageTitle title="消息通知" type="page" />
            <Row justify="space-between">
                <Search 
                    style={{width: 200, marginBottom: 15}} 
                    placeholder="请输入关键字" 
                    onChange={e=>{
                        paginationRef.current = DEFAULT_PAGINATION
                        setKeyword(e.target.value);
                    }} 
                    allowClear
                />
                <Button 
                    type="primary"
                    onClick={()=>{
                        setType("Add");
                        setVisible(true)
                    }}
                >
                    新增
                </Button>
            </Row>
            <Table 
                columns={columns}
                pagination={pagination}
                dataSource={dataSource}
                onChange={(pagination)=>{
                    paginationRef.current = pagination;
                    getList();
                }}
                loading={loading}
            />
            {
                visible&&
                <Modal 
                    title={type==="Add"?"新增消息通知":"编辑消息通知"}
                    open={visible} 
                    onOk={onSubmit} 
                    onCancel={onCancel}
                    okText="确定"
                    cancelText="取消"
                    width={700}
                >
                    <Form
                        form={form}
                        style={{marginTop: 24}}
                        autoComplete="off"
                        labelCol={{span: 4}}
                    >
                        <Form.Item label="通知类型" name="informType" rules={[{...FORM_REQUIRED_RULE}]}> 
                            <Select 
                                placeholder="请选择通知类型" 
                                options={notifyTypeList?.map(item => {
                                    return {
                                        value: item.value,
                                        label: item.name
                                    }
                                })}
                            />
                        </Form.Item>
                        <Form.Item label="通知内容" name="text" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input.TextArea placeholder="请输入消息通知内容" />
                        </Form.Item>
                    </Form>
                </Modal>
            }
        </div>
    )
}

export default Notify;