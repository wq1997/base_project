import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { changePassword as changePasswordServer } from "@/services/user";
import { PASSWORD_REG } from "@/utils/constants";

const onFinish = async values => {
    const res = await changePasswordServer(values);
    if (res?.data?.code == 200) {
        message.info("修改成功");
    } else {
        message.info(res?.data?.description);
    }
};

const Index = () => (
    <Form
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
        <Form.Item
            label="旧密码"
            name="oldPassword"
            rules={[
                {
                    required: true,
                    message: "请输入旧密码",
                },
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
                {
                    required: true,
                    message: "请输入新密码",
                },
                {
                    pattern: PASSWORD_RGE,
                    message: "密码长度为8-16位，至少2种字符",
                },
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            label="确认密码"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
                {
                    required: true,
                    message: "请确认密码",
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (value && getFieldValue("newPassword") != value) {
                            return Promise.reject(new Error("两次密码不一致"));
                        }
                        return Promise.resolve();
                    },
                }),
            ]}
        >
            <Input.Password />
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
export default Index;
