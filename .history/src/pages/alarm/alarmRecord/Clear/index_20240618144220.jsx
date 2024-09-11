import React, { useState, useEffect } from "react";
import {
    message,
    Button,
    Select,
    Form,
    Input,
    Modal,
    Row,
    Col,
    DatePicker,
    Space,
    InputNumber,
} from "antd";
import { ALL_SPACE_REG } from "@/utils/constants";
import { clearAlarm as clearAlarmServer } from "@/services/alarm";

const Index = ({ clearId, onClose }) => {
    const [form] = Form.useForm();

    const onFinish = async values => {
        const res = await clearAlarmServer({
            id: clearId,
            ...values,
        });
        if (res?.data?.code == 200) {
            message.success(`清除成功`);
            onCancel(true);
        } else {
            message.info(res?.data?.description);
        }
    };

    const onCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="清除告警"
            width={700}
            confirmLoading={true}
            open={Boolean(clearId)}
            footer={null}
            onCancel={() => onCancel()}
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
                    label="处理意见"
                    name="experience"
                    rules={[
                        {
                            required: true,
                            message: "请输入处理意见",
                        },
                        {
                            pattern: ALL_SPACE_REG,
                            message: "请输入处理意见",
                        },
                    ]}
                >
                    <Input.TextArea placeholder="请输入处理意见" />
                </Form.Item>

                <Form.Item
                    label="维护经验"
                    name="suggestion"
                    rules={[
                        {
                            pattern: ALL_SPACE_REG,
                            message: "请输入维护经验",
                        },
                    ]}
                >
                    <Input.TextArea placeholder="请输入维护经验" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 16,
                        span: 4,
                    }}
                >
                    <Space>
                        <Button onClick={() => onCancel()}>取消</Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Index;
