import React, { useEffect } from "react";
import { Outlet, useDispatch, useSelector } from "umi";
import { Button, message, Form, Input } from "antd";
import { TELPHONE_REG, EMAIL_REG, ALL_SPACE_REG } from "@/utils/constants";
import { changeUserInfo as changeUserInfoServer } from "@/services/user";

const Index = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user);

    const onFinish = async values => {
        const res = await changeUserInfoServer(values);
        if (res?.data?.code == 200) {
            message.info("修改成功");
            dispatch({
                type: "user/queryUser",
            });
        } else {
            message.info(res?.data?.description);
        }
    };

    useEffect(() => {
        form.setFieldsValue(userInfo);
    }, []);

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 15,
            }}
            style={{
                maxWidth: 600,
                margin: "0 auto",
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item label="角色名" name="username" initialValue={"系统管理员"}>
                <Input disabled={true} />
            </Form.Item>

            <Form.Item
                label="用户名"
                name="nickName"
                rules={[
                    {
                        required: true,
                        message: "请输入用户名",
                    },
                    {
                        pattern: ALL_SPACE_REG,
                        message: "请输入用户名",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="手机号"
                name="phoneNumber"
                rules={[
                    {
                        required: true,
                        message: "请输入手机号",
                    },
                    {
                        pattern: TELPHONE_REG,
                        message: "手机号格式错误",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="电子邮箱"
                name="email"
                rules={[
                    {
                        required: true,
                        message: "请输入电子邮箱",
                    },
                    {
                        pattern: EMAIL_REG.reg,
                        message: EMAIL_REG.desc,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 5,
                    span: 15,
                }}
            >
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Index;
