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
import dayjs from "dayjs";

const Device = ({ isPowerOn, open, deviceId, onClose }) => {
    const [form] = Form.useForm();

    const onFinish = async values => {
        const res = await setDeviceServer({
            id: deviceId,
            deviceConfig: "POWER_ON",
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
                <div style={{ marginBottom: "10px" }}>
                直流电弧故障告警需要业主确认后才能清除，并且在业主确认清除后会触发逆变器自动复位，请谨慎操作。
                </div>
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
                    <Input.Password placeholder="请输入密码" />
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
