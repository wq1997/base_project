import { PageTitle, Search } from "@/components";
import { useDebounceEffect } from "ahooks";
import { Table, Row, Button, Modal, Form, Input } from "antd";
import { useState } from "react";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE } from "@/utils/constants";

const FirstArea = () => {
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
            title: '一级区域名称',
            dataIndex: 'firstArea',
            key: 'firstArea',
        },
        {
            title: '所属国家',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: '备注',
            dataIndex: 'comment',
            key: 'comment',
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

    const getList = async () => {
        console.log("一级区域", keyword, pagination)
    }

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

    useDebounceEffect(()=>{
        getList();
    }, [keyword, pagination], {
        wait: 300
    });

    return (
        <div>
            <PageTitle title="一级区域" type="page" />
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
                        firstArea: '上海',
                        country: '中国',
                        comment: '哈哈哈哈哈哈'
                    }
                ]}
                onChange={(pagination)=>{
                    setPagination({...pagination})
                }}
            />
            {
                visible&&
                <Modal 
                    title={type==="Add"?"新增一级区域":"编辑一级区域"}
                    open={visible} 
                    onOk={onSubmit} 
                    onCancel={onCancel}
                    okText="确定"
                    cancelText="取消"
                    width={600}
                >
                    <Form
                        form={form}
                        style={{marginTop: 24}}
                        autoComplete="off"
                        labelCol={{span: 4}}
                        initialValues={{
                            country: '中国'
                        }}
                    >
                        <Form.Item label="区域名称" name="firstArea" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="请输入区域名称"/>
                        </Form.Item>
                        <Form.Item label="所属国家" name="country">
                            <Input  />
                        </Form.Item>
                        <Form.Item label="备注" name="comment">
                            <Input.TextArea placeholder="请输入备注" />
                        </Form.Item>
                    </Form>
                </Modal>
            }
        </div>
    )
}

export default FirstArea;