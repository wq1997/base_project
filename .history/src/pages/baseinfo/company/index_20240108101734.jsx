import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const Company = () => {


    return (
        <div>

            <div className="search">
                <Form.Item
                    label="平台名称"

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Username"

                >
                    <Input />
                </Form.Item>
            </div>

        </div>
    )
}

export default Company;