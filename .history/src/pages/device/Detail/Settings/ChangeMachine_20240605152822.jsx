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
            deviceConfig: "REPLACE",
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
                    label="SN号"
                    name="snNumber"
                    rules={[
                        {
                            required: true,
                            message: "请输入SN号",
                        },
                        {
                            pattern: ALL_SPACE_REG,
                            message: "请输入SN号",
                        },
                    ]}
                >
                    <Input placeholder="请输入SN号" />
                </Form.Item>

                <Form.Item
                    label="设备型号"
                    name="model"
                    rules={[
                        {
                            required: true,
                            message: "请输入设备型号",
                        },
                        {
                            pattern: ALL_SPACE_REG,
                            message: "请输入设备型号",
                        },
                    ]}
                >
                    <Input placeholder="请输入设备型号" />
                </Form.Item>

                <Form.Item label="质保有效期" name="warrantyPeriod">
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 14,
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
