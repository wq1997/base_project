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
import { getPlantNames as getPlantNamesServer } from "@/services/plant";
import {
    getDeviceType as getDeviceTypeServer,
    getDeviceInfo as getDeviceInfoServer,
    saveDevice as saveDeviceServer,
    updateDevice as updateDeviceServer,
} from "@/services/device";
import dayjs from "dayjs";

const formatTime = time => (time ? dayjs(time).format("YYYY-MM-DD") : undefined);

const Device = ({ open, editId, onClose }) => {
    const [form] = Form.useForm();
    const [editData, setEditData] = useState();
    const [roleOptions, setRoleOptions] = useState([]);
    const [superiorOptions, setSuperiorOptions] = useState([]);

    const getPlantInfo = async () => {
        const res = await getDeviceInfoServer(editId);
        if (res?.data?.code == 200) {
            const values = res?.data?.data || {};
            form.setFieldsValue({
                ...values,
                warrantyPeriod: dayjs(values?.warrantyPeriod, "YYYY-MM-DD"),
            });
            setEditData(values);
        }
    };

    const onFinish = async values => {
        const fn = editId ? updateDeviceServer : saveDeviceServer;
        const res = await fn({
            id: editData?.id,
            commit: true,
            ...values,
            warrantyPeriod: formatTime(values?.warrantyPeriod),
        });
        if (res?.data?.code == 200) {
            message.success(`${editData?.id ? "保存" : "添加"}成功`);
            localStorage.removeItem("deviceDraft");
            onCancel(true);
        } else {
            message.info(res?.data?.description);
        }
    };

    useEffect(() => {
        if (open) {
            if (editId) {
                getPlantInfo();
            } else {
                const deviceDraft = JSON.parse(localStorage.getItem("deviceDraft"));
                if (deviceDraft) {
                    setEditData(deviceDraft);
                    form.setFieldsValue({
                        ...deviceDraft,
                        warrantyPeriod: deviceDraft?.warrantyPeriod
                            ? dayjs(deviceDraft?.warrantyPeriod, "YYYY-MM-DD")
                            : undefined,
                    });
                }
            }
        }
    }, [open]);

    const onCancel = isSaveOK => {
        if (!editId && !isSaveOK) {
            localStorage.setItem("deviceDraft", JSON.stringify(form.getFieldsValue()));
        }
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="新增设备"
            width={950}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onCancel(false)}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 12,
                }}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "请输入用户名",
                        },
                        {
                            pattern: ALL_SPACE_REG,
                            message: "请输入用户名",
                        },
                    ]}
                >
                    <Input placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                    label="角色"
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: "请选择角色",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择角色"
                        options={roleOptions}
                        fieldNames={{ label: "displayName", value: "name" }}
                    />
                </Form.Item>

                <Form.Item
                    label="所属上级"
                    name="plantId"
                    rules={[
                        {
                            required: true,
                            message: "请选择所属上级",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择所属上级"
                        options={superiorOptions}
                        fieldNames={{ label: "name", value: "id" }}
                    />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="snNumber"
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
                    <Input placeholder="请输入密码" />
                </Form.Item>

                <Form.Item
                    label="手机号"
                    name="snNumber"
                    rules={[
                        {
                            required: true,
                            message: "请输入手机号",
                        },
                        {
                            pattern: ALL_SPACE_REG,
                            message: "请输入手机号",
                        },
                    ]}
                >
                    <Input placeholder="请输入密码" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 19,
                        span: 5,
                    }}
                >
                    <Space style={{ position: "relative", left: 10 }}>
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
