import { Form, Input, Checkbox, Button, Typography, theme, Tooltip, message } from "antd";
import { FORM_REQUIRED_RULE, PUBLIC_FILE_PATH } from "@/utils/constants";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login as loginSever } from "@/services";
import { getEncrypt, setLocalStorage } from "@/utils/utils";
import styles from "./index.less";
import { history, useDispatch } from "umi";
import { useEffect, useState } from "react";
const { Title } = Typography;

const Login = () => {
    const { token } = theme.useToken();
    const dispatch = useDispatch();
    const [publicKey, setPublicKey] = useState("");

    const onFinish = async values => {
        const res = await loginSever(values);
        if (res?.data?.data) {
            const data = res?.data;
            setLocalStorage("Token", data?.data);
            dispatch({
                type: "user/updateState",
                payload: {
                    user: {
                        userName: data?.nickName,
                    },
                },
            });
            history.push("/cet/user");
        }else{
            message.info(res?.data?.message)
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
                        padding: "70px 30px",
                        borderRadius: 8,
                    }}
                >
                    <Title
                        level={2}
                        style={{
                            marginBottom: 50,
                            color: token.colorPrimary,
                            textAlign: "center",
                            fontSize: 30,
                        }}
                    >
                        电池诊断工具账号审批系统
                    </Title>
                    <Form
                        onFinish={onFinish}
                        autoComplete="off"
                        style={{
                            width: 450,
                        }}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ ...FORM_REQUIRED_RULE }]}
                            style={{ marginBottom: 40 }}
                        >
                            <Input
                                prefix={<UserOutlined style={{ fontSize: 15, color: "#73787F" }} />}
                                placeholder="请输入用户名"
                                style={{ height: 40 }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ ...FORM_REQUIRED_RULE }]}
                            style={{ marginBottom: 40 }}
                        >
                            <Input.Password
                                prefix={<LockOutlined style={{ fontSize: 15, color: "#73787F" }} />}
                                placeholder="请输入密码"
                                style={{ height: 40 }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%", height: 40 }}
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
