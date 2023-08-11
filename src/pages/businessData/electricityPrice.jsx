import { PageTitle } from "@/components";
import { Row, Button, Form, Table, Modal, Input, Tooltip, Col, Upload, Typography, Select } from "antd";
import { useState } from "react";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE } from "@/utils/constants";
import { useDebounceEffect } from "ahooks";
import { InboxOutlined } from '@ant-design/icons';

const ElectricityPrice = () => {
    const [form] = Form.useForm();
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [visible, setVisible] = useState(false);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [type, setType] = useState("");

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: 100,
            render(text,record,index){
                return index+1;
            }
        },
        {
            title: '一级区域',
            dataIndex: 'firstArea',
            key: 'firstArea',
            width: 200
        },
        {
            title: '二级区域',
            dataIndex: 'firstArea',
            key: 'firstArea',
            width: 200
        },
        {
            title: '用电类型',
            dataIndex: 'firstArea',
            key: 'firstArea',
            width: 200
        },
        {
            title: '计费制度',
            dataIndex: 'firstArea',
            key: 'firstArea',
            width: 200
        },
        {
            title: '电压等级',
            dataIndex: 'firstArea',
            key: 'firstArea',
            width: 200
        },
        {
            title: '尖峰电价',
            dataIndex: 'firstArea',
            key: 'firstArea',
            width: 200
        },
        {
            title: '平段电价',
            dataIndex: 'firstArea',
            key: 'firstArea',
            width: 200
        },
        {
            title: '谷段电价',
            dataIndex: 'firstArea',
            key: 'firstArea',
            width: 200
        },
        {
            title: '基本电费按需价格',
            dataIndex: 'firstArea',
            key: 'firstArea',
            width: 200
        },
        {
            title: '基本电费按容价格',
            dataIndex: 'firstArea',
            key: 'firstArea',
            width: 200
        },
        {
            title: '备注时段',
            dataIndex: 'firstArea',
            key: 'firstArea',
            width: 400,
            render: (firstArea) => (
                <Tooltip placement="topLeft" title={firstArea}>
                    {firstArea}
                </Tooltip>
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'firstArea',
            key: 'firstArea',
            width: 200,
        },
        {
            title: '操作',
            dataIndex: 'Actions',
            key: 'Actions',
            fixed: 'right',
            width: 200,
            render(text,record){
                return (
                    <>
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
                    </>
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

    return (
        <div>
            <PageTitle title="电价列表" type="page" />
            <Row justify="space-between" style={{marginBottom: 16}}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 16
                    }}
                >
                    <Select placeholder="请选择一级区域" style={{width: 200}} />
                    <Select placeholder="请选择二级区域" style={{width: 200}} />
                    <Select placeholder="请选择用电类型" style={{width: 200}} />
                    <Select placeholder="请选择计费制度" style={{width: 200}} />
                </div>
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
                        firstArea: '江苏',
                    }
                ]}
                onChange={(pagination)=>{
                    setPagination({...pagination})
                }}
                scroll={{
                    x: 2000
                }}
            />
            {
                visible&&
                <Modal 
                    title={type==="Add"?"新增电价":"编辑电价"}
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
                        labelCol={{span: 5}}
                    >
                        <Form.Item label="一级区域" name="firstArea" rules={[{...FORM_REQUIRED_RULE}]}> 
                            <Select placeholder="请选择一级区域" />
                        </Form.Item>
                        <Form.Item label="二级区域" name="secondArea" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Select placeholder="请选择二级区域" />
                        </Form.Item>
                        <Form.Item label="用电类型" name="type" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Select placeholder="请选择用电类型" />
                        </Form.Item>
                        <Form.Item label="计费制度" name="zhidu" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Select placeholder="请选择计费制度" />
                        </Form.Item>
                        <Form.Item label="电压等级" name="read" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Select placeholder="请选择电压等级" />
                        </Form.Item>
                        <Form.Item label="尖峰电价" name="price1" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="请输入尖峰电价" />
                        </Form.Item>
                        <Form.Item label="高峰电价" name="price2" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="请输入高峰电价" />
                        </Form.Item>
                        <Form.Item label="平段电价" name="price3" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="请输入平段电价" />
                        </Form.Item>
                        <Form.Item label="谷段电价" name="price4" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="低谷/深谷" />
                        </Form.Item>
                        <Form.Item label="基本电费按需价格" name="price4" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="请输入基本电费按需价格" />
                        </Form.Item>
                        <Form.Item label="基本电费按容价格" name="price4" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="请输入基本电费按容价格" />
                        </Form.Item>
                        <Form.Item label="备注时段" name="price4">
                            <Input.TextArea placeholder="请输入备注时段" />
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

export default ElectricityPrice;