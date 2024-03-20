import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

const Company = () => {
    return (
        <div>
            <div className="search">
                <div>
                    <span>平台名称：</span>
                    <Input style={{ width: 200 }} />
                </div>
                <div>
                    <span>省份</span>
                    <Input />
                </div>

            </div>
        </div>
    );
};

export default Company;
