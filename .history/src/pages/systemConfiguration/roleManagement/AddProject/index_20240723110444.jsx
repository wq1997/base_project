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
import { updateRole as updateRoleServer } from "@/services/user";
import "./index.less";


const AddProject = ({ open, onClose }) => {
    const [form] = Form.useForm();

    const onFinish = async values => {
        const res = await updateRoleServer({
            ...values,
        });
        if (res?.data?.status == "SUCCESS") {
            message.success("录入成功");
            onClose(true);
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {}, [open]);

    return (
        <Modal
            title={<Title>新增角色</Title>}
            width={800}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <Form
                style={{
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
                    label="角色名称"
                    name="account"
                    rules={[
                        {
                            required: true,
                            message: "请输入角色名称",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入角色名称" />
                </Form.Item>

                <Form.Item
                    label="角色编号"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "请输入角色编号",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入角色编号" />
                </Form.Item>

                <Form.Item
                    label="角色说明"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "请输入角色说明",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入角色说明" />
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
