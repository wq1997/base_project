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
            id: deviceInfo?.id,
            deviceConfig: "POWER_FACTOR_ADJUST",
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
                <Form.Item label="设备名称" name="name" initialValue={deviceInfo?.name}>
                    <Input disabled={true} />
                </Form.Item>

                <Form.Item
                    label="调节值（kW）"
                    name="powerFactor"
                    rules={[
                        {
                            required: true,
                            message: "请输入调节值（kW）",
                        },
                        {
                            validator: (rule, value, callback) => {
                                if (
                                    (value > -1.000 && value <= -0.8) ||
                                    (value >= 0.8 && value <= 1.0)
                                ) {
                                    callback();
                                } else {
                                    callback("调节范围：(-1.000 ~ -0.800] U [0.800 ~ 1.000]");
                                }
                            },
                        },
                    ]}
                >
                    <InputNumber
                        precision={1}
                        placeholder="请输入调节值（kW）"
                        style={{ width: 200 }}
                    />
                </Form.Item>

                <Form.Item
                    label="调节范围"
                    name="range"
                    initialValue={`(-1.000 ~ -0.800] U [0.800 ~ 1.000]`}
                >
                    <Input disabled={true} />
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
