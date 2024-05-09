import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
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
            margin:'0 auto',
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item label="用户名" name="username">
            <Input disabled={true} />
        </Form.Item>

        <Form.Item
            label="旧密码"
            name="password"
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
            name="password"
            rules={[
                {
                    required: true,
                    message: "请输入新密码",
                },
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            label="确认密码"
            name="password"
            rules={[
                {
                    required: true,
                    message: "请确认密码",
                },
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
