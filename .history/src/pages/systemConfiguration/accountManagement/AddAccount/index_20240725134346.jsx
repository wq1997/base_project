import React, { useState, useEffect } from "react";
import {
    message,
    Button,
    Form,
    Input,
    Modal,
    Steps,
    DatePicker,
    Space,
    Select,
    Row,
    Col,
    Radio,
    Collapse,
} from "antd";
import dayjs from "dayjs";
import { Title } from "@/components";
import { ExclamationCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import {
    getAccountUpdateIndexData as getAccountUpdateIndexDataServer,
    updateAccount as updateAccountServer,
} from "@/services/user";
import "./index.less";

const { Panel } = Collapse;

const AddProject = ({ open, editId, onClose }) => {
    const [form] = Form.useForm();
    const [roleOptions, setRoleOptions] = useState([]);
    const [regionsOptions, setRegionOptions] = useState([]);

    const getInitData = async () => {
        const res = await getAccountUpdateIndexDataServer(editId || "");
        if (res?.data?.status == "SUCCESS") {
            const { roles, regions } = res?.data?.data;
            setRoleOptions(roles);
            setRegionOptions(regions);
        }
    };

    const onFinish = async values => {
        const res = await updateAccountServer({
            ...values,
            id: editId || undefined,
        });
        if (res?.data?.status == "SUCCESS") {
            message.success("操作成功");
            onClose();
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        if (open) {
            getInitData();
        }
    }, [open]);

    return (
        <Modal
            title={<Title>`${editId ? "编辑" : "新增"}账号`</Title>}
            width={800}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose()}
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
                    label="账号"
                    name="account"
                    rules={[
                        {
                            required: true,
                            message: "请输入账号",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入账号" />
                </Form.Item>

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
                    <Input style={{ width: "100%" }} placeholder="请输入姓名" />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "请输入密码",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入姓名" />
                </Form.Item>

                <Form.Item
                    label="关联手机号"
                    name="phoneNo"
                    rules={[
                        {
                            required: true,
                            message: "请输入关联手机号",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入关联手机号" />
                </Form.Item>

                <Form.Item
                    label="管辖区域"
                    name="regions"
                    rules={[
                        {
                            required: true,
                            message: "请选择管辖区域",
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="请选择管辖区域"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={regionsOptions}
                    />
                </Form.Item>

                <Form.Item
                    label="绑定角色"
                    name="roleCodes"
                    rules={[
                        {
                            required: true,
                            message: "请选择绑定角色",
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="请选择绑定角色"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={roleOptions}
                    />
                </Form.Item>

                <Form.Item
                    label="备注"
                    name="desc"
                    rules={[
                        {
                            required: true,
                            message: "请输入备注",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入备注" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 11,
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

export default AddProject;
