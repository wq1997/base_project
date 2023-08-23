
import { PageTitle, Search } from "@/components";
import { useDebounceEffect } from "ahooks";
import { Table, Row, Button, Modal, Form, Input, Tooltip } from "antd";
import { useState, useRef } from "react";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE } from "@/utils/constants";
import { 
    getInvestmentList as getInvestmentListServe,
    getInvestmentListByName as getInvestmentListByNameServe,
    deleteInvestment as deleteInvestmentServe,
    addInvestment as addInvestmentServe,
    updateInvestment as updateInvestmentServe
} from "@/services/serve"; 

const Investment = () => {
    const [form] = Form.useForm();
    const [keyword, setKeyword] = useState("");
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState("")
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
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
            title: '名称',
            dataIndex: 'keyName',
            key: 'keyName',
        },
        {
            title: '数值',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
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
                                    const res = await deleteInvestmentServe({id: record?.id});
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

    const getList = async () => {
        setLoading(true);
        let res = null;
        const { current, pageSize } = paginationRef.current;
        if(!keyword){
            res = await getInvestmentListServe({
                current, 
                size: pageSize
            })
        }else{
            res = await getInvestmentListByNameServe({
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

    const onSubmit = async () => {
        let res = null;
        try {
            const values = await form.validateFields();
            if(type==="Edit"){
                res = await updateInvestmentServe({
                    ...values,
                    id: currentRecord?.id
                })
            }else{
                res = await addInvestmentServe(values);
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

    useDebounceEffect(()=>{
        getList();
    }, [keyword], {
        wait: 500
    });

    return (
        <div>
            <PageTitle title="投资测算" type="page" />
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
                    title={type==="Add"?"新增投资测算":"编辑投资测算"}
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
                        <Form.Item label="名称" name="keyName" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="请输入名称"/>
                        </Form.Item>
                        <Form.Item label="数值" name="total" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="请输入数值" />
                        </Form.Item>
                        <Form.Item label="备注" name="remark">
                            <Input.TextArea placeholder="请输入备注" />
                        </Form.Item>
                    </Form>
                </Modal>
            }
        </div>
    )
}

export default Investment;