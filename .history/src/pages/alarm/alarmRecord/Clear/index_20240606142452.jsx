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

const Device = ({ open, clearId, onClose }) => {
    const [form] = Form.useForm();

    const onFinish = async values => {
        const res = await clearAlarmServer({
            id: clearId,

            ...values,
        });
        if (res?.data?.code == 200) {
            message.success(`${editData?.id ? "保存" : "添加"}成功`);

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
            title="新增设备"
            width={900}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onCancel()}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 14,
                }}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="设备名称"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "请输入设备名称",
                        },
                        {
                            pattern: ALL_SPACE_REG,
                            message: "请输入设备名称",
                        },
                    ]}
                >
                    <Input placeholder="请输入设备名称" />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 19,
                        span: 5,
                    }}
                >
                    <Space style={{ position: "relative", left: 8 }}>
                        <Button onClick={() => onCancel(false)}>取消</Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Device;
