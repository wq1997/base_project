import React, { useState } from "react";
import { Button, Space } from "antd";
import { SearchInput } from "@/components";
import "./index.less";

const dataSource = [
    {
        key: "1",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
    },
    {
        key: "2",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号",
    },
];

const columns = [
    {
        title: "姓名",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "年龄",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "住址",
        dataIndex: "address",
        key: "address",
    },
];

const Company = () => {
    const [name, setName] = useState();

    return (
        <div>
            <Space className="search">
                <SearchInput label="公司名称" value={name} onChange={value => setName(value)} />
                <Button type="primary">搜索</Button>
                <Button>重置</Button>
            </Space>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    );
};

export default Company;
