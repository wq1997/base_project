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
        if (res?.data?.status == "SUCCESS") {
            setLocalStorage("Token", res?.data?.data);
            dispatch({
                type: "user/updateState",
                payload: {
                    user: {
                        username: res?.data?.nickName,
                    },
                },
            });
            history.push("/workbench/management-roles");
        } else {
            message.error(res?.data?.msg);
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
                position: "relative",
                minWidth: 1200,
                minHeight: 600,
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
               
            </div>
        </div>
    );
};

export default Login;
