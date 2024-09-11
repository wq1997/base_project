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
            onClose(true);
        } else {
            message.info(res?.data?.description);
        }
    };

    return (
        <Modal
            title="提示"
            width={600}
            confirmLoading={true}
            open={open}
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
                <div style={{ marginBottom: "10px" }}>
                    确认下发{isPowerOn ? "关机" : "开机"}指令？
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
                        offset: 15,
                        span: 5,
                    }}
                >
                    <Space style={{ position: "relative", left: 8 }}>
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

export default Device;
