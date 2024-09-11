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
import { setDevice as setDeviceServer } from "@/services/device";

const Device = ({ isPowerOn, open, deviceInfo, onClose }) => {
    const [form] = Form.useForm();

    const onFinish = async values => {
        const res = await setDeviceServer({
            id: deviceInfo?.deviceId,
            deviceConfig: "ACTIVE_POWER_ADJUST",
            ...values,
        });
        if (res?.data?.code == 200) {
            message.success(`设置成功`);
            onCancel(true);
        } else {
            message.info(res?.data?.description);
        }
    };

    const onCancel = flag => {
        onClose(flag);
        form.resetFields();
    };

    return (
        <Modal
            title="提示"
            width={600}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={onCancel}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 16,
                }}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item label="设备名称" name="name">
                    <Input placeholder="请输入设备名称" />
                </Form.Item>

                <Form.Item
                    label="调节值（kW）"
                    name="adjust"
                    rules={[
                        {
                            required: true,
                            message: "请输入调节值（kW）",
                        },
                    ]}
                >
                    <InputNumber placeholder="请输入调节值（kW）" value={}/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 16,
                        span: 6,
                    }}
                >
                    <Space>
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
