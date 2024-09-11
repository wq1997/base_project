import { Form, Input, Checkbox, Button, Typography, theme, Tooltip, message } from "antd";
import { FORM_REQUIRED_RULE, PUBLIC_FILE_PATH, PROJECT_NAME } from "@/utils/constants";
import { UserOutlined, PhoneOutlined, AuditOutlined, BranchesOutlined } from "@ant-design/icons";
import { getUrlParams, setLocalStorage } from "@/utils/utils";
import styles from "./index.less";
import { history, useLocation } from "umi";
import { useEffect, useState } from "react";
const { Title } = Typography;

const Login = () => {
    const { token } = theme.useToken();
    const location = useLocation();

    const onFinish = async values => {
        const { serial, secret } = getUrlParams(location?.search);
        if (!serial || !secret) return message.info("缺少参数");
        const res = await loginSever({
            ...values,
            cpuSerial:serial,
            cpuSerialHmac:secret
        });
        if (res?.data?.data) {
            message.info(res?.data?.message);
        } else {
            message.info(res?.data?.message);
        }
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                background: "black",
            }}
            className={styles.login}
        >
            <img
                src={`${PUBLIC_FILE_PATH}background.jpg`}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    verticalAlign: "middle",
                }}
            />
            <div
                style={{
                    width: 600,
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    right: "10%",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        background: "#ffffff40",
                        padding: "30px 50px",
                        borderRadius: 8,
                    }}
                >
                    <Title
                        level={2}
                        style={{
                            marginBottom: 30,
                            color: token.colorPrimary,
                            fontSize: 25,
                            textAlign: "center",
                        }}
                    >
                        {PROJECT_NAME}
                    </Title>
                    <Form
                        onFinish={onFinish}
                        autoComplete="off"
                        style={{
                            width: 400,
                        }}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ ...FORM_REQUIRED_RULE }]}
                            style={{ marginBottom: 20 }}
                        >
                            <Input
                                prefix={<UserOutlined style={{ fontSize: 15, color: "#73787F" }} />}
                                placeholder="请输入姓名"
                                style={{ height: 40 }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            rules={[{ ...FORM_REQUIRED_RULE }]}
                            style={{ marginBottom: 20 }}
                        >
                            <Input
                                prefix={
                                    <PhoneOutlined style={{ fontSize: 15, color: "#73787F" }} />
                                }
                                placeholder="请输入手机号"
                                style={{ height: 40 }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="jobTitle"
                            rules={[{ ...FORM_REQUIRED_RULE }]}
                            style={{ marginBottom: 20 }}
                        >
                            <Input
                                prefix={
                                    <AuditOutlined style={{ fontSize: 15, color: "#73787F" }} />
                                }
                                placeholder="请输入职务"
                                style={{ height: 40 }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="department"
                            rules={[{ ...FORM_REQUIRED_RULE }]}
                            style={{ marginBottom: 20 }}
                        >
                            <Input
                                prefix={
                                    <BranchesOutlined style={{ fontSize: 15, color: "#73787F" }} />
                                }
                                placeholder="请输入所在末级部门"
                                style={{ height: 40 }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%", height: 40 }}
                            >
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
