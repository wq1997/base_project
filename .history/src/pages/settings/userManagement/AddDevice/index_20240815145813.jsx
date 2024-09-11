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
import { ALL_SPACE_REG, PASSWORD_RGE, TELPHONE_REG,USERNAME_RGE } from "@/utils/constants";
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
            title="新增用户"
            width={700}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onCancel(false)}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 7,
                }}
                wrapperCol={{
                    span: 13,
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
                            pattern: USERNAME_RGE,
                            message: "8-16个字符，只能填写英文、数字、下划线",
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
                            pattern: PASSWORD_RGE,
                            message: "密码长度为8-16位，至少2种字符",
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
                            pattern: ALL_SPACE_REG,
                            message: "请输入手机号",
                        },
                        {
                            pattern: TELPHONE_REG,
                            message: "手机号格式错误",
                        },
                    ]}
                >
                    <Input placeholder="请输入手机号" />
                </Form.Item>

                <Form.Item
                    label="电子邮箱"
                    name="snNumber"
                    rules={[
                        {
                            pattern: ALL_SPACE_REG,
                            message: "请输入电子邮箱",
                        },
                    ]}
                >
                    <Input placeholder="请输入电子邮箱" />
                </Form.Item>

                <Form.Item
                    label="备注"
                    name="snNumber"
                    rules={[
                        {
                            pattern: ALL_SPACE_REG,
                            message: "请输入备注",
                        },
                    ]}
                >
                    <Input placeholder="请输入备注" />
                </Form.Item>

                <Form.Item label="告警推送配置" name="snNumber">
                    <Input placeholder="请输入备注" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 15,
                        span: 5,
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
