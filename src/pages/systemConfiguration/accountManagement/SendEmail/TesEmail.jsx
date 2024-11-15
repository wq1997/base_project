import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Space } from "antd";

import { EMAIL_REG, ALL_SPACE_REG } from "@/utils/constants";
import { sendTestEmail as sendTestEmailServer } from "@/services";
import "./index.less";

const AddProject = ({ showTestEmail, onClose }) => {
    const [form] = Form.useForm();

    const onFinish = async values => {
        const res = await sendTestEmailServer(values);
        if (res?.data?.status == "SUCCESS") {
            message.success("保存成功");
            onClose();
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        form.resetFields();
    }, [showTestEmail]);

    return (
        <>
            <Modal
                title="邮件发送测试"
                width={600}
                confirmLoading={true}
                open={showTestEmail}
                footer={null}
                onCancel={() => onClose()}
            >
                <Form
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
                        label="收件人邮箱"
                        name="to"
                        rules={[
                            {
                                required: true,
                                message: "请输入收件邮箱",
                            },
                            {
                                pattern: EMAIL_REG,
                                message: "邮箱格式错误",
                            },
                        ]}
                    >
                        <Input style={{ width: "100%" }} placeholder="请输入收件人邮箱" />
                    </Form.Item>

                    <Form.Item
                        label="主题"
                        name="subject"
                        rules={[
                            {
                                required: true,
                                message: "请输入主题",
                            },
                            {
                                pattern: ALL_SPACE_REG,
                                message: "请输入主题",
                            },
                        ]}
                    >
                        <Input style={{ width: "100%" }} placeholder="请输入主题" />
                    </Form.Item>

                    <Form.Item
                        label="正文"
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: "请输入正文",
                            },
                            {
                                pattern: ALL_SPACE_REG,
                                message: "请输入正文",
                            },
                        ]}
                    >
                        <Input.TextArea
                            minLength={500}
                            rows={3}
                            style={{ width: "100%" }}
                            placeholder="请输入正文"
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 16,
                            span: 5,
                        }}
                    >
                        <Space
                            style={{
                                position: "relative",
                                left: "-15px",
                            }}
                        >
                            <Button onClick={() => onClose(false)}>取消</Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddProject;
