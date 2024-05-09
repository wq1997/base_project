import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { TELPHONE_REG, EMAIL_REG } from "@/utils/constants";

const onFinish = values => {
    console.log("Success:", values);
};
const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item label="角色名称" name="username">
            <Input disabled={true} />
        </Form.Item>

        <Form.Item
            label="手机号"
            name="password"
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
            name="password"
            rules={[
                {
                    required: true,
                    message: "请输入电子邮箱",
                },
                {
                    pattern: EMAIL_REG,
                    message: "邮箱格式错误",
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
export default Index;
