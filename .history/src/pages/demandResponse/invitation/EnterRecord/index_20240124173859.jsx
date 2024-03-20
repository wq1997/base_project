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
    Radio,
    DatePicker,
    Space,
} from "antd";
import {
    getUpdateInitData as getUpdateInitDataServer,
    updateUser as updateUserServer,
} from "@/services/account";
import { getSearchInitData as getSearchInitDataServer } from "@/services/invitation";

const Company = ({ open, editId, onClose }) => {
    const [form] = Form.useForm();
    const [responseTypeList, setResponseTypeList] = useState();
    const [responseTimeTypeList, setResponseTimeTypeList] = useState();

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { responseTypes, responseTimeTypes } = res?.data?.data;
            setResponseTypeList(responseTypes);
            setResponseTimeTypeList(responseTimeTypes);
        }
    };

    const onFinish = async values => {
        const res = await updateUserServer({
            id: editId,
            ...values,
        });

        if (res?.data?.status == "SUCCESS") {
            message.success(`${editId ? "编辑" : "添加"}成功`);
            onClose(true);
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        open && getSearchInitData();
    }, [open]);

    return (
        <Modal
            title="手工录入"
            width={700}
            confirmLoading={true}
            open={true}
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
                <Form.Item
                    label="是否默认确认任务"
                    name="autoConfirmTask"
                    rules={[
                        {
                            required: true,
                            message: "请选择是否默认确认任务",
                        },
                    ]}
                >
                    <Radio.Group>
                        {responseTypeList?.map(item => (
                            <Radio value={item?.code}>{item.name}</Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="是否默认确认任务"
                    name="autoConfirmTask"
                    rules={[
                        {
                            required: true,
                            message: "请选择是否默认确认任务",
                        },
                    ]}
                >
                    <Radio.Group>
                        {responseTimeTypeList?.map(item => (
                            <Radio value={item?.code}>{item.name}</Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="度电报价(元)"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "请输入度电报价",
                        },
                    ]}
                >
                    <Input placeholder="请输入度电报价" />
                </Form.Item>
                <Form.Item
                    label="响应功率(kW)"
                    name="phoneNo"
                    rules={[
                        {
                            required: true,
                            message: "请输入响应功率",
                        },
                    ]}
                >
                    <Input placeholder="请输入响应功率" />
                </Form.Item>
                <Form.Item
                    label="约定开始时间"
                    name="startDate"
                    rules={[
                        {
                            required: true,
                            message: "请选择约定开始时间",
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="约定结束时间"
                    name="startDate"
                    rules={[
                        {
                            required: true,
                            message: "请选择约定结束时间",
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 16,
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
