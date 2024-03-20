import React, { useState, useEffect } from "react";
import { message, Button, Select, Form, Input, Modal, Row, Col, Radio, Space } from "antd";
import {
    getUpdateInitData as getUpdateInitDataServer,
    updateUser as updateUserServer,
} from "@/services/account";

const Company = ({ open, editId, onClose }) => {
    const [form] = Form.useForm();
    const [companyList, setCompanyList] = useState();
    const [roleList, setRoleList] = useState();

    const getUpdateInitData = async () => {
        const res = await getUpdateInitDataServer(editId);
        if (res?.data?.status == "SUCCESS") {
            const { editUser, companies, roles } = res?.data?.data;
            editUser ? form.setFieldsValue(editUser) : form.resetFields();
            setCompanyList(companies);
            setRoleList(roles);
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
        open && getUpdateInitData();
    }, [open]);

    return (
        <Modal
            title={`${editId ? "编辑" : "新增"}账号`}
            width={700}
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
                {
                    !editId && <Form.Item
                        label="用户名"
                        name="account"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号",
                            },
                        ]}
                    >
                        <Input placeholder="请输入账号" />
                    </Form.Item>

                }

                <Form.Item
                    label="姓名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "请输入姓名",
                        },
                    ]}
                >
                    <Input placeholder="请输入姓名" />
                </Form.Item>

                {
                    !editId && <Form.Item
                        label="账号密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号密码",
                            },
                        ]}
                    >
                        <Input placeholder="请输入账号密码" />
                    </Form.Item>
                }

                <Form.Item
                    label="用户手机号"
                    name="phoneNo"
                    rules={[
                        {
                            required: true,
                            message: "请输入用户手机号",
                        },
                    ]}
                >
                    <Input placeholder="请输入用户手机号" />
                </Form.Item>

                <Form.Item
                    label="所属公司"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择所属公司",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择所属公司"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={companyList}
                    />
                </Form.Item>

                <Form.Item
                    label="关联角色"
                    name="roleCodes"
                    rules={[
                        {
                            required: true,
                            message: "请选择关联角色",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择关联角色"
                        mode="multiple"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={roleList}
                    />
                </Form.Item>

                <Form.Item
                    label="备注"
                    name="remark"
                    rules={[
                        {
                            required: true,
                            message: "请输入备注",
                        },
                    ]}
                >
                    <Input.TextArea placeholder="请输入备注" />
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
