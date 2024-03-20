import React, { useState, useEffect } from "react";
import { message, Button, Select, Form, DatePicker, Modal, Space } from "antd";
import {
    getAutoLevelInitData as getAutoLevelInitDataServer,
    updateAutoLevel as updateAutoLevelServer,
} from "@/services/company";
import dayjs from 'dayjs';

const Company = ({ open, editId, onClose }) => {
    const [form] = Form.useForm();
    const [cycles, setCycles] = useState([]);

    const getAutoLevelInitData = async () => {
        const res = await getAutoLevelInitDataServer(editId);
        if (res?.data?.status == "SUCCESS") {
            const { cycles, task } = res?.data?.data;
            task
                ? form.setFieldsValue({
                    ...task,
                    startDate: dayjs(task?.startDate, "YYYY-MM-DD"),
                })
                : form.resetFields();
            setCycles(cycles);
        }
    };

    const onFinish = async values => {
        const res = await updateAutoLevelServer({
            ...values,
            
        });
        if (res?.data?.status == "SUCCESS") {
            message.success("更新成功");
            onClose(true);
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        open && getAutoLevelInitData();
    }, [open]);

    return (
        <Modal
            title="编辑"
            width={700}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
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
                    label="开始更新时间"
                    name="startDate"
                    rules={[
                        {
                            required: true,
                            message: "请选择开始更新时间",
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    label="更新周期"
                    name="cycle"
                    rules={[
                        {
                            required: true,
                            message: "请选择更新周期",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择更新周期"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={cycles}
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 17,
                        span: 5,
                    }}
                >
                    <Space>
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

export default Company;
