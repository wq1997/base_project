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
import { TELPHONE_REG, EMAIL_REG, ALL_SPACE_REG } from "@/utils/constants";
import {
    getEmailConfigData as getEmailConfigDataServer,
    saveEmailConfigData as saveEmailConfigDataServer,
    sendTestEmail as sendTestEmailServer,
} from "@/services";
import TesEmail from "./TesEmail";
import "./index.less";

const { Panel } = Collapse;

const AddProject = ({ showSendEmail, onClose }) => {
    const [form] = Form.useForm();
    const [showTestEmail, setShowTestEmail] = useState(false);
    const [regionsOptions, setRegionOptions] = useState([]);

    const getInitData = async () => {
        const res = await getEmailConfigDataServer();
        // if (res?.data?.status == "SUCCESS") {
        //     const { editUser, roles, regions } = res?.data?.data;
        //     setRoleOptions(roles);
        //     setRegionOptions(regions);
        //     form.setFieldsValue(editUser);
        // }
    };

    const onFinish = async values => {
        const res = await saveEmailConfigDataServer(values);
        if (res?.data?.status == "SUCCESS") {
            message.success("保存成功");
            onClose();
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        if (showSendEmail) {
            getInitData();
        } else {
            form.resetFields();
        }
    }, [showSendEmail]);

    return (
        <>
            <TesEmail
                showTestEmail={showTestEmail}
                onCancel={() => {
                    setShowTestEmail(false);
                }}
            />
            <Modal
                title="邮箱维护"
                width={650}
                confirmLoading={true}
                open={showSendEmail}
                footer={null}
                onCancel={() => onClose()}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 13,
                    }}
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="邮箱地址"
                        name="mailAddress"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                            {
                                pattern: EMAIL_REG,
                                message: "邮箱格式错误",
                            },
                        ]}
                    >
                        <Input style={{ width: "100%" }} placeholder="请输入邮箱地址" />
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
                                pattern: ALL_SPACE_REG,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input style={{ width: "100%" }} placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item
                        label="发信服务器host"
                        name="smtpServerHost"
                        rules={[
                            {
                                required: true,
                                message: "请输入发信服务器host",
                            },
                            {
                                pattern: ALL_SPACE_REG,
                                message: "请输入发信服务器host",
                            },
                        ]}
                    >
                        <Input style={{ width: "100%" }} placeholder="请输入发信服务器host" />
                    </Form.Item>

                    <Form.Item
                        label="发信服务器端口"
                        name="smtpServerPort"
                        rules={[
                            {
                                required: true,
                                message: "请输入发信服务器端口",
                            },
                            {
                                pattern: ALL_SPACE_REG,
                                message: "请输入发信服务器端口",
                            },
                        ]}
                    >
                        <Input style={{ width: "100%" }} placeholder="请输入发信服务器端口" />
                    </Form.Item>

                    <Form.Item
                        label="收信服务器host"
                        name="imapServerHost"
                        rules={[
                            {
                                required: true,
                                message: "请输入收信服务器host",
                            },
                            {
                                pattern: ALL_SPACE_REG,
                                message: "收信服务器host",
                            },
                        ]}
                    >
                        <Input style={{ width: "100%" }} placeholder="请输入收信服务器host" />
                    </Form.Item>

                    <Form.Item
                        label="收信服务器端口"
                        name="imapServerPort"
                        rules={[
                            {
                                required: true,
                                message: "请输入收信服务器端口",
                            },
                            {
                                pattern: ALL_SPACE_REG,
                                message: "请输入收信服务器端口",
                            },
                        ]}
                    >
                        <Input style={{ width: "100%" }} placeholder="请输入收信服务器端口" />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 11,
                            span: 5,
                        }}
                    >
                        <Space
                            style={{
                                position: "relative",
                                left: "-15px",
                                marginTop: 10,
                            }}
                        >
                            <Button onClick={() => onClose(false)}>取消</Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                            <Button
                                style={{ background: "rgb(22, 118, 239)" }}
                                onClick={() => {
                                    console.log(form.getFieldsValue());
                                    form.validateFields()
                                        .then(res => {
                                            setShowTestEmail(true);
                                        })
                                        .catch(e => {
                                            return message.info("请输入完整字段");
                                        });
                                }}
                            >
                                发送测试邮件
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddProject;
