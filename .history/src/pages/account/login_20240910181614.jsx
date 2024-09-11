import { Form, Input, message, Button, Typography, theme, Tooltip } from "antd";
import { FORM_REQUIRED_RULE, PUBLIC_FILE_PATH, PROJECT_NAME } from "@/utils/constants";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { getEncrypt, setLocalStorage } from "@/utils/utils";
import { login as loginSever } from "@/services/user";
import styles from "./index.less";
import { history, useDispatch } from "umi";
import { useEffect, useState } from "react";
const { Title } = Typography;

const Login = () => {
    const { token } = theme.useToken();
    const dispatch = useDispatch();
    const [publicKey, setPublicKey] = useState("");

    const onFinish = async values => {
        const res = await loginSever({
            ...values,
            password: values.password,
        });
        if (res?.data?.code == 200) {
            const data = res?.data;
            setLocalStorage("Token", data?.data?.token);
            dispatch({
                type: "user/updateState",
                payload: {
                    user: {
                        userName: data?.nickName,
                    },
                },
            });
            history.push("/plant-monitoring/plant-overview");
        } else {
            message.error(res?.data?.description);
        }
    };

    const getPublicKey = async () => {
        setPublicKey();
    };

    useEffect(() => {
        getPublicKey();
    }, []);
    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                background: "black",
            }}
            className={styles.login}
        >
            {/* <img
                src={`${PUBLIC_FILE_PATH}background.jpg`}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    verticalAlign: "middle",
                }}
            /> */}
            <div
                style={{
                    background:``,
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
                    <Title level={2} style={{ marginBottom: 50, color: token.colorPrimary }}>
                        {PROJECT_NAME}
                    </Title>
                    <Form
                        onFinish={onFinish}
                        autoComplete="off"
                        style={{
                            width: 450,
                        }}
                    >
                        <Form.Item
                            name="userName"
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
