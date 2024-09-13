import React, { useState, useEffect } from "react";
import { message, Button, Select, Form, Input, Modal, Row, Col, Table, Space, Switch } from "antd";
import {
    ALL_SPACE_REG,
    PASSWORD_REG,
    USERNAME_REG,
    TELPHONE_REG,
    EMAIL_REG,
} from "@/utils/constants";
import { getRoles as getRolesServer, getRoleNames as getRoleNamesServer } from "@/services/role";
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
    const [dataSource, setDataSource] = useState([
        { level: "PROMPT", levelText: "提示", disposeType: "", status: false },
        { level: "MINOR", levelText: "次要", disposeType: "", status: false },
        { level: "IMPORTANT", levelText: "重要", disposeType: "", status: false },
        { level: "URGENT", levelText: "紧急", disposeType: "", status: false },
    ]);
    const [form] = Form.useForm();
    const [editData, setEditData] = useState();
    const [roleOptions, setRoleOptions] = useState([]);
    const [superiorOptions, setSuperiorOptions] = useState([]);

    const columns = [
        {
            title: "告警级别",
            dataIndex: "levelText",

            render: (_, record, index) => {
                return <span style={{ color: colors[record?.level] }}>{record?.levelText}</span>;
            },
        },
        {
            title: "推送方式",
            dataIndex: "disposeType",

            render: (_, record, index) => {
                return (
                    <SearchInput
                        inputWidth={100}
                        label=""
                        value={record?.disposeType}
                        type="select"
                        size="small"
                        options={[
                            { displayName: "短信", name: "MESSAGE" },
                            { displayName: "邮件", name: "EMAIL" },
                        ]}
                        onChange={value => {
                            const _dataSource = [...dataSource];
                            _dataSource[index].disposeType = value;
                            setDataSource(_dataSource);
                        }}
                    />
                );
            },
        },
        {
            title: "状态",

            dataIndex: "status",
            render: (_, record, index) => {
                return (
                    <Switch
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        checked={record?.status}
                        size="small"
                        onChange={value => {
                            const _dataSource = [...dataSource];
                            _dataSource[index].status = value;
                            setDataSource(_dataSource);
                        }}
                    />
                );
            },
        },
    ];

    const getPlantInfo = async () => {
        const res = await getDeviceInfoServer(editId);
        if (res?.data?.code == 200) {
            const values = res?.data?.data || {};
            form.setFieldsValue(values);
            setEditData(values);
        }
    };

    const onFinish = async values => {
        const fn = editId ? updateDeviceServer : saveDeviceServer;
        const res = await fn({
            id: editData?.id,
            commit: true,
            ...values,
            alarm: dataSource?.map(item => ({
                disposeType: item.disposeType,
                level: item?.level,
                status: item?.status,
                receivingUser: "admin",
            })),
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
            }
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
                    label="角色名称"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "请输入角色名称",
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
                    label="角色描述"
                    name="role"
                    rules={[
                        {
                            pattern: USERNAME_REG.reg,
                            message: USERNAME_REG.desc,
                        },
                    ]}
                >
                    <Input placeholder="请输入用户名" />
                </Form.Item>

                <Form.Item
                    label="角色授权"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "请选择授权角色",
                        },
                    ]}
                >
                    <Input placeholder="请输入用户名" />
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
