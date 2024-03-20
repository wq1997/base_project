import React, { useState } from "react";
import { Button, Radio, Slider, Space } from 'antd';
import { SearchInput } from "@/components";
import "./index.less";

const Company = () => {
    const [name, setName] = useState(1);

    return (
        <div>
            <div className="search">
                <SearchInput label="公司名称" value={name} onChange={value => setName(value)} />
                <Space>
                    <Button>重置</Button>
                    <Button type="primary">搜索</Button>
                </Space>
            </div>
        </div>
    );
};

export default Company;
