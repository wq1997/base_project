import { PageTitle, Search } from "@/components";
import { Row, Button, Form, Table, Modal, Input, DatePicker, Col, Upload, Typography } from "antd";
import { useState } from "react";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE } from "@/utils/constants";
import { useDebounceEffect } from "ahooks";
import { InboxOutlined } from '@ant-design/icons';

const PolicyInformation = () => {
    const [form] = Form.useForm();
    const [keyword, setKeyword] = useState("");
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [visible, setVisible] = useState(false);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [type, setType] = useState("");
    const [date, setDate] = useState("");

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
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '发布单位',
            dataIndex: 'publisher',
            key: 'publisher',
        },
        {
            title: '发布名称',
            dataIndex: 'publishName',
            key: 'publishName',
        },
        {
            title: '政策要点',
            dataIndex: 'importance',
            key: 'importance',
        },
        {
            title: '政策解读',
            dataIndex: 'read',
            key: 'read',
        },
        {
            title: '原文链接',
            dataIndex: 'link',
            key: 'link',
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
        setUploadVisible(false);
        form.resetFields();
    }

    const getList = async () => {
        console.log("政策信息", keyword, pagination, date)
    }

    const onChangeDatePicker = (date, dateString) => {
        setDate(dateString);
        setPagination(DEFAULT_PAGINATION);
    }

    useDebounceEffect(()=>{
        getList();
    }, [keyword, pagination, date], {
        wait: 300
    });
    
    return (
        <div>
            <PageTitle title="政策信息" type="page" />
            <Row justify="space-between">
                <Col>
                    <Search 
                        style={{width: 200, marginBottom: 16, marginRight: 16}} 
                        placeholder="请输入关键字" 
                        onChange={e=>{
                            setKeyword(e.target.value);
                            setPagination(DEFAULT_PAGINATION);
                        }} 
                    />
                    <DatePicker placeholder="请选择时间" onChange={onChangeDatePicker} />
                </Col>
                <Col gutter={[16,16]}>
                    <Button 
                        type="primary"
                        style={{marginRight: 16}} 
                        onClick={()=>{
                            setType("Add");
                            setVisible(true)
                        }}
                    >
                        新增
                    </Button>
                    <Button 
                        type="primary"
                        onClick={()=>{
                            setUploadVisible(true)
                        }}
                    >
                        导入
                    </Button>
                </Col>
            </Row>
            <Table 
                columns={columns}
                pagination={pagination}
                dataSource={[
                    {
                        id: '1',
                        publisher: '中华人民共和国国务院',
                    }
                ]}
                onChange={(pagination)=>{
                    setPagination({...pagination})
                }}
            />
            {
                visible&&
                <Modal 
                    title={type==="Add"?"新增政策信息":"编辑政策信息"}
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
                        <Form.Item label="时间" name="time" rules={[{...FORM_REQUIRED_RULE}]}> 
                            <DatePicker placeholder="请选择时间" />
                        </Form.Item>
                        <Form.Item label="发布单位" name="publisher" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="请输入发布单位" />
                        </Form.Item>
                        <Form.Item label="发布名称" name="publishName" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="请输入发布名称" />
                        </Form.Item>
                        <Form.Item label="政策要点" name="importance" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input.TextArea placeholder="请输入政策要点" />
                        </Form.Item>
                        <Form.Item label="政策解读" name="read" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input.TextArea placeholder="请输入政策解读" />
                        </Form.Item>
                        <Form.Item label="原文链接" name="link" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="请输入原文链接" />
                        </Form.Item>
                    </Form>
                </Modal>
            }
            {
                uploadVisible&&
                <Modal
                    title="导入"
                    okText="确定"
                    cancelText="取消"
                    width={700}
                    open={uploadVisible}
                    onCancel={onCancel}
                >
                    <div style={{padding: 24}}>
                        <Upload.Dragger
                            accept=".xlsx,.xls"
                            customRequest={(file)=>{
                                console.log(file)
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">点击或拖拽文件至此处上传</p>
                            <p className="ant-upload-hint">
                                请上传.xlsx .xls后缀文件
                            </p>
                        </Upload.Dragger>
                        <p>
                            <Typography.Text type="secondary">上传之前请下载模版，按照格式填入数据</Typography.Text>
                        </p>
                        <a>模版下载</a>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default PolicyInformation;