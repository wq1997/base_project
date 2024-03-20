import React, { useState } from "react";
import { Button, Space } from 'antd';
import { SearchInput } from "@/components";
import "./index.less";

const Company = () => {
    const [name, setName] = useState();

    return (
        <div>
            <Space className="search">
                <SearchInput label="公司名称" value={name} onChange={value => setName(value)} />
                <Button type="primary">搜索</Button>
                <Button>重置</Button>
            </Space>
        </div>
    );
};

export default Company;
