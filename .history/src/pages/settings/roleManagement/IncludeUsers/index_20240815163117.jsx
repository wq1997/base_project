import React, { useState, useEffect } from "react";
import { message, Button, Select, Form, Input, Modal, Row, Col, Table, Space, Switch } from "antd";
import {
    ALL_SPACE_REG,
    PASSWORD_REG,
    USERNAME_REG,
    TELPHONE_REG,
    EMAIL_REG,
} from "@/utils/constants";
import { getPlantNames as getPlantNamesServer } from "@/services/plant";
import { SearchInput } from "@/components";
import {
    getDeviceType as getDeviceTypeServer,
    getDeviceInfo as getDeviceInfoServer,
    saveDevice as saveDeviceServer,
    updateDevice as updateDeviceServer,
} from "@/services/device";
import dayjs from "dayjs";

const colors = {
    PROMPT: "blue",
    MINOR: "orange",
    IMPORTANT: "#EB2F96",
    URGENT: "#FA541C",
};

const Device = ({ open, editId, onClose }) => {
    const [dataSource, setDataSource] = useState([]);

    const columns = [
        {
            title: "告警级别",
            dataIndex: "levelText",
        },
    ];

    const getList = async () => {
        const res = await getDeviceInfoServer(editId);
        if (res?.data?.code == 200) {
            const values = res?.data?.data || {};
            form.setFieldsValue(values);
            setEditData(values);
        }
    };

    useEffect(() => {
        if (editId) {
            getList();
        }
    }, [open]);

    const onCancel = isSaveOK => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title={`${editId ? "编辑" : "新增"}角色`}
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
                            pattern: USERNAME_REG.reg,
                            message: USERNAME_REG.desc,
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
                    name="superior"
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
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "请输入密码",
                        },
                        {
                            pattern: PASSWORD_REG.reg,
                            message: PASSWORD_REG.desc,
                        },
                    ]}
                >
                    <Input placeholder="请输入密码" />
                </Form.Item>

                <Form.Item
                    label="手机号"
                    name="phoneNumber"
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
                    name="email"
                    rules={[
                        {
                            pattern: EMAIL_REG.reg,
                            message: EMAIL_REG.desc,
                        },
                    ]}
                >
                    <Input placeholder="请输入电子邮箱" />
                </Form.Item>

                <Form.Item
                    label="备注"
                    name="remark"
                    rules={[
                        {
                            pattern: ALL_SPACE_REG,
                            message: "请输入备注",
                        },
                    ]}
                >
                    <Input.TextArea placeholder="请输入备注" maxLength={50} showCount />
                </Form.Item>

                <Form.Item label="告警推送配置" name="alarm">
                    <Table
                        size="small"
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                    />
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
