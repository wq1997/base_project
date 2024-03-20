import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

const Company = () => {
    return (
        <div>
            <div className="search">
                <div>
                     <span></span>
                </div>
                <Form.Item label="平台名称">
                    <Input />
                </Form.Item>
                <Form.Item label="省份">
                    <Input />
                </Form.Item>
            </div>
        </div>
    );
};

export default Company;
