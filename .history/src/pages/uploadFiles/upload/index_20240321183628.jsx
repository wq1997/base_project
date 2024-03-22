import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Select, DatePicker, Space, InputNumber } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Title } from "@/components";
import { MyUpload } from "@/components";
import "./index.less";

const uploadUrl = process.env.API_URL_1 + "/attachment/upload2";

const Company = ({ uploadOpen, onClose }) => {
    const [form] = Form.useForm();
    const [files, setFiles] = useState([{}]);
    const [editData, setEditData] = useState();

    const addFiles = () => {
        setFiles([...files, {}]);
    };

    const minusFiles = ()=>{
       const 
    }

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { responseTypes, responseTimeTypes } = res?.data?.data;
            setResponseTypeList(responseTypes);
            setResponseTimeTypeList(responseTimeTypes);
        }
    };

    const onFinish = async values => {
        const { appointedTimeFrom, appointedTimeTo } = values;
        const res = await saveEnterRecordServer({
            ...values,
            appointedTimeFrom: dayjs(appointedTimeFrom).format("YYYY-MM-DD HH:mm"),
            appointedTimeTo: dayjs(appointedTimeTo).format("YYYY-MM-DD HH:mm"),
        });
        if (res?.data?.status == "SUCCESS") {
            message.success("录入成功");
            onClose(true);
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        if (uploadOpen) {
            // getSearchInitData();
        } else {
            form.resetFields();
        }
    }, [uploadOpen]);

    return (
        <Modal
            title={<Title>上传文件</Title>}
            width={700}
            confirmLoading={true}
            open={uploadOpen}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 7,
                }}
                wrapperCol={{
                    span: 14,
                }}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="项目名称"
                    name="whPrice"
                    rules={[
                        {
                            required: true,
                            message: "请输入项目名称",
                        },
                    ]}
                >
                    <Input placeholder="可以重复，最多输入30个字符" maxLength={30} />
                </Form.Item>

                <Form.Item
                    label="子项目名称"
                    name="whPrice"
                    rules={[
                        {
                            required: true,
                            message: "请输入子项目名称",
                        },
                    ]}
                >
                    <Input placeholder="不可以重复，最多输入30个字符" maxLength={30} />
                </Form.Item>

                <Form.Item
                    label="数据类型"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择数据类型",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择数据类型"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                    // options={companies}
                    // onChange={value => {
                    //     const { contractedResponsePower } = companies?.find(
                    //         item => item?.code == value
                    //     );
                    //     setContractedResponsePower(contractedResponsePower);
                    // }}
                    />
                </Form.Item>

                <Form.Item
                    label="设备类型"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择设备类型",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择设备类型"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="设备位置"
                    name="whPrice"
                    rules={[
                        {
                            required: true,
                            message: "请输入设备位置",
                        },
                    ]}
                >
                    <Input placeholder="最多输入30个字符" maxLength={30} />
                </Form.Item>

                <Form.Item
                    label="设备编号"
                    name="whPrice"
                    rules={[
                        {
                            required: true,
                            message: "请输入设备编号",
                        },
                    ]}
                >
                    <Input placeholder="最多输入30个字符" maxLength={30} />
                </Form.Item>

                <Form.Item
                    label="取值维度"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择取值维度",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择设取值维度"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                    />
                </Form.Item>

                {/* <Form.Item
                    label="测试单元"
                    name="whPrice"
                    rules={[
                        {
                            required: true,
                            message: "请输入测试单元",
                        },
                    ]}
                >
                    <Input
                        placeholder="最多输入30个字符"
                        maxLength={30}
                        style={{ width: "70%", marginRight: "20px" }}
                    />
                    <PlusCircleOutlined style={{ cursor: "pointer", fontSize: 17 }} />
                </Form.Item> */}

                <Form.Item
                    label="测试单元"
                    name="whPrice"
                    rules={[
                        {
                            required: true,
                            message: "请输入测试单元",
                        },
                    ]}
                >
                    {files?.map((item, index) => {
                        return (
                            <div style={{ marginBottom: '10px' }}>
                                <Input
                                    placeholder="最多输入30个字符"
                                    maxLength={30}
                                    style={{ width: "70%", marginRight: "20px" }}
                                />
                                {
                                    index == 0 ? <PlusCircleOutlined
                                        onClick={addFiles}
                                        style={{ cursor: "pointer", fontSize: 17 }}
                                    /> : <MinusCircleOutlined
                                        onClick={minusFiles}
                                        style={{ cursor: "pointer", fontSize: 17 }}
                                    />
                                }
                            </div>
                        );
                    })}
                </Form.Item>

                <Form.Item label="备注" name="remark">
                    <Input.TextArea placeholder="请输入备注" />
                </Form.Item>

                <Form.Item label="文件" name="contractAtt">
                    <MyUpload
                        url={uploadUrl}
                        files={editData?.contractAtt?.map(item => ({
                            ...item,
                            name: item.fileName,
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 16,
                        span: 5,
                    }}
                >
                    <Space>
                        <Button onClick={() => onClose(false)}>取消</Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Company;
