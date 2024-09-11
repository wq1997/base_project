import React, { useState, useEffect } from "react";
import {
    message,
    Button,
    Form,
    Input,
    Modal,
    Steps,
    DatePicker,
    Space,
    Select,
    Row,
    Col,
    Radio,
    Collapse,
} from "antd";
import dayjs from "dayjs";
import { Title } from "@/components";
import { ExclamationCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import { getAccountUpdateIndexData as getAccountUpdateIndexDataServer } from "@/services/user";
import "./index.less";

const { Panel } = Collapse;

const AddProject = ({ open, editId, onClose }) => {
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(3);

    const getInitData = async () => {
        const res = await getAccountUpdateIndexDataServer(editId||'');
        if (res?.data?.status == "SUCCESS") {
            const { responseTypes, responseTimeTypes } = res?.data?.data;
        }
    };

    const onFinish = async values => {
        return;
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
        if (open) {
            getInitData();
        }
    }, [open]);

    return (
        <Modal
            title={<Title>新增巡检项</Title>}
            width={800}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <Form
                style={{
                    width: currentStep == 1 || currentStep == 3 ? "100%" : "50%",
                    margin: "0 auto",
                }}
                name="basic"
                labelCol={{
                    span: 7,
                }}
                wrapperCol={{
                    span: 13,
                }}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="账号"
                    name="account"
                    rules={[
                        {
                            required: true,
                            message: "请输入账号",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入账号" />
                </Form.Item>

                <Form.Item
                    label="姓名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "请输入姓名",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入姓名" />
                </Form.Item>

                <Form.Item
                    label="关联手机号"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "请输入关联手机号",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入关联手机号" />
                </Form.Item>

                <Form.Item
                    label="所属区域"
                    name="area"
                    rules={[
                        {
                            required: true,
                            message: "请选择所属区域",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择所属区域"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[
                            { name: "江苏", code: 0 },
                            { name: "浙江", code: 1 },
                            { name: "上海", code: 1 },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="绑定角色"
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: "请选择绑定角色",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择绑定角色"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[
                            { name: "业务操作人员", code: 0 },
                            { name: "管理人员", code: 1 },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="备注"
                    name="desc"
                    rules={[
                        {
                            required: true,
                            message: "请输入备注",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入备注" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 11,
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

export default AddProject;
