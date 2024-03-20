Username
Password

Remember me
基本使用
基本的表单数据域控制展示，包含布局、初始化、验证、提交。

TypeScript
JavaScript
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const Company = () => {


    return (
        <div>

            <div className="search">
                <Form.Item
                    label="Username"
                    name="username"
                >
                    <Input />
                </Form.Item>
            </div>

        </div>
    )
}

export default Company;