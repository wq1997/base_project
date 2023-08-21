import { PageTitle, Search } from "@/components";
import { Row, Button, Form, Table, Modal, Input } from "antd";
import { useState } from "react";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE } from "@/utils/constants";
import { useDebounceEffect } from "ahooks";

const Notify = () => {
    const [form] = Form.useForm();
    const [keyword, setKeyword] = useState("");
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState("")

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
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '通知内容',
            dataIndex: 'content',
            key: 'content',
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
                                 onOk(){
                                    console.log("删除")
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
        try {
            const values = await form.validateFields();
            console.log('Success:', values);
          } catch (errorInfo) {
            console.log('Failed:', errorInfo);
          }
    }

    const onCancel = () => {
        setVisible(false);
        form.resetFields();
    }

    const getList = async () => {
        console.log("消息通知", keyword, pagination)
    }

    useDebounceEffect(()=>{
        getList();
    }, [keyword, pagination], {
        wait: 300
    });

    return (
        <div>
            <PageTitle title="消息通知" type="page" />
            <Row justify="space-between">
                <Search 
                    style={{width: 200, marginBottom: 15}} 
                    placeholder="请输入关键字" 
                    onChange={e=>{
                        setKeyword(e.target.value);
                        setPagination(DEFAULT_PAGINATION);
                    }} 
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
                dataSource={[
                    {
                        id: '1',
                        type: '政策',
                        content: '哈哈哈哈哈哈'
                    }
                ]}
                onChange={(pagination)=>{
                    setPagination({...pagination})
                }}
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
                        <Form.Item label="通知类型" name="type" rules={[{...FORM_REQUIRED_RULE}]}> 
                            <Input placeholder="请输入消息通知类型" />
                        </Form.Item>
                        <Form.Item label="通知内容" name="content">
                            <Input.TextArea placeholder="请输入消息通知内容" />
                        </Form.Item>
                    </Form>
                </Modal>
            }
        </div>
    )
}

export default Notify;