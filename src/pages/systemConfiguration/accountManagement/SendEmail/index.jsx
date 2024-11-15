import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Space, InputNumber } from "antd";

import { EMAIL_REG, ALL_SPACE_REG } from "@/utils/constants";
import {
    getEmailConfigData as getEmailConfigDataServer,
    saveEmailConfigData as saveEmailConfigDataServer,
    deleteEmail as deleteEmailServer,
} from "@/services";
import TesEmail from "./TesEmail";
import "./index.less";

const AddProject = ({ showSendEmail, onClose }) => {
    const [form] = Form.useForm();
    const [showTestEmail, setShowTestEmail] = useState(false);
    const [emailData, setEmailData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getInitData = async () => {
        const res = await getEmailConfigDataServer();
        if (res?.data?.status == "SUCCESS") {
            const data = res?.data?.data;
            setEmailData(data);
            form.setFieldsValue(data);
        }
    };

    const deleteEmail = async () => {
        const res = await deleteEmailServer();
        if (res?.data?.status == "SUCCESS") {
            form.resetFields();
            setEmailData(null);
        }
        message.info(res?.data?.msg);
    };

    const onFinish = async values => {
        setLoading(true);
        const res = await saveEmailConfigDataServer(values);
        setLoading(false);
        if (res?.data?.status == "SUCCESS") {
            message.success("保存成功");
            onClose();
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        if (showSendEmail) {
            getInitData();
        } else {
            form.resetFields();
        }
    }, [showSendEmail]);

    return (
        <>
            <TesEmail
                showTestEmail={showTestEmail}
                emailData={emailData}
                onClose={() => {
                    setShowTestEmail(false);
                }}
            />
            <Modal
                title="邮箱维护"
                width={650}
                confirmLoading={true}
                open={showSendEmail}
                footer={null}
                onCancel={() => {
                    onClose();
                }}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 13,
                    }}
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                    onFieldsChange={(changedFields, allFields) => {
                        setEmailData({
                            ...emailData,
                            [changedFields[0]?.name]: changedFields[0]?.value,
                        });
                    }}
                >
                    <Form.Item
                        label="邮箱地址"
                        name="mailAddress"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                            {
                                pattern: EMAIL_REG,
                                message: "邮箱格式错误",
                            },
                        ]}
                    >
                        <Input style={{ width: "100%" }} placeholder="请输入邮箱地址" />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                            {
                                pattern: ALL_SPACE_REG,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input style={{ width: "100%" }} placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item
                        label="发信服务器host"
                        name="smtpServerHost"
                        rules={[
                            {
                                required: true,
                                message: "请输入发信服务器host",
                            },
                            {
                                pattern: ALL_SPACE_REG,
                                message: "请输入发信服务器host",
                            },
                        ]}
                    >
                        <Input style={{ width: "100%" }} placeholder="请输入发信服务器host" />
                    </Form.Item>

                    <Form.Item
                        label="发信服务器端口"
                        name="smtpServerPort"
                        rules={[
                            {
                                required: true,
                                message: "请输入发信服务器端口",
                            },
                            {
                                pattern: ALL_SPACE_REG,
                                message: "请输入发信服务器端口",
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} placeholder="请输入发信服务器端口" />
                    </Form.Item>

                    <Form.Item
                        label="收信服务器host"
                        name="imapServerHost"
                        rules={[
                            {
                                required: true,
                                message: "请输入收信服务器host",
                            },
                            {
                                pattern: ALL_SPACE_REG,
                                message: "收信服务器host",
                            },
                        ]}
                    >
                        <Input style={{ width: "100%" }} placeholder="请输入收信服务器host" />
                    </Form.Item>

                    <Form.Item
                        label="收信服务器端口"
                        name="imapServerPort"
                        rules={[
                            {
                                required: true,
                                message: "请输入收信服务器端口",
                            },
                            {
                                pattern: ALL_SPACE_REG,
                                message: "请输入收信服务器端口",
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} placeholder="请输入收信服务器端口" />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 5,
                        }}
                    >
                        <Space
                            style={{
                                position: "relative",
                                left: "-15px",
                                marginTop: 10,
                            }}
                        >
                            <Button onClick={() => onClose(false)}>取消</Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                确定
                            </Button>
                            <Button
                                loading={loading}
                                style={{ background: "rgb(22, 118, 239)" }}
                                onClick={() => {
                                    form.validateFields()
                                        .then(res => {
                                            setShowTestEmail(true);
                                        })
                                        .catch(e => {
                                            return message.info("请输入完整字段");
                                        });
                                }}
                            >
                                发送测试邮件
                            </Button>
                            <Button type="primary" danger onClick={deleteEmail} loading={loading}>
                                删除
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddProject;
