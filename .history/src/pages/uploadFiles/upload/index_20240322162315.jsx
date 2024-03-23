import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Select, DatePicker, Space, Upload } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Title } from "@/components";
import { MyUpload } from "@/components";
import "./index.less";
import { save,login } from '@/services/api'

const uploadUrl = process.env.API_URL_1 + "/attachment/upload2";
console.log(uploadUrl);

const Company = ({ uploadOpen, onClose }) => {
    const [form] = Form.useForm();
    const [testFiles, setTestFiles] = useState([{ name: undefined, value: undefined }]);
    const [editData, setEditData] = useState();

    const addTestFiles = () => {
        setTestFiles([...testFiles, { name: undefined, value: undefined }]);
    };

    const minusTestFiles = index => {
        const _testFiles = [...testFiles];
        _testFiles.splice(index, 1);
        setTestFiles(_testFiles);
    };

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { responseTypes, responseTimeTypes } = res?.data?.data;
            setResponseTypeList(responseTypes);
            setResponseTimeTypeList(responseTimeTypes);
        }
    };

    const onFinish = async values => {
        console.log(values)
        const formData = new FormData();
        values.files?.fileList.forEach(file => {
            formData.append("file", file);
        });
        console.log(formData)
        const { appointedTimeFrom, appointedTimeTo } = values;
        const res = await login({
            // ...values,
            // files: formData,
            username:'',
            
        });
        files
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
                    name="projectName"
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
                    name="childrenProjectName"
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
                    name="dataType"
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
                        options={[
                            {
                                name: "1",
                                code: "BMS_SYSTEM",
                            },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="设备类型"
                    name="deviceType"
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
                        options={[
                            {
                                name: "1",
                                code: "BMS_SYSTEM_CAI_HEAP",
                            },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="设备位置"
                    name="devicePosition"
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
                    name="deviceBoxNo"
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
                    name="dimension"
                    rules={[
                        {
                            required: true,
                            message: "请选择取值维度",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择设取值维度"
                        options={[
                            { label: "堆", value: "HEAP" },
                            { label: "簇", value: 2 },
                        ]}
                    // fieldNames={{
                    //     label: "name",
                    //     value: "code",
                    // }}
                    />
                </Form.Item>

                <Form.Item
                    label="测试单元"
                    name="testUnit"
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
                        style={{ width: "260px" }}
                    />
                </Form.Item>

                <Form.Item label="备注" name="remark">
                    <Input.TextArea placeholder="请输入备注" />
                </Form.Item>

                <Form.Item label="文件" name="files">
                    <Upload

                         

                    >
                        <Button  >Click to Upload</Button>
                    </Upload>
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
