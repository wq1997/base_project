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

const Device = ({ open, deviceId, onClose }) => {
    const [form] = Form.useForm();
    const [editData, setEditData] = useState();

    const onFinish = async values => {
        const res = await setDeviceServer({
            id: deviceId,
            ...values,
        });
        if (res?.data?.code == 200) {
            message.success(`设置成功`);

            onCancel();
        } else {
            message.info(res?.data?.description);
        }
    };

    useEffect(() => {}, [open]);

    const onCancel = isSaveOK => {
        onClose();
    };

    return (
        <Modal
            title="提示"
            width={900}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onCancel(false)}
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
                    label="密码"
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
