import React, { useState } from "react";
import { Button, Space, Table } from "antd";
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
        title: "公司名称",
        dataIndex: "name",
    },
    {
        title: "公司编号",
        dataIndex: "age",
    },
    {
        title: "住址",
        dataIndex: "关联平台",
    },
    {
        title: "是否默认确认任务",
        dataIndex: "关联平台",
    },
    {
        title: "平台分润比例",
        dataIndex: "关联平台",
    },
    {
        title: "紧急联系人",
        dataIndex: "关联平台",
    },
    {
        title: "紧急联系电话",
        dataIndex: "关联平台",
    },
    {
        title: "操作",
        dataIndex: "operate",
    },
];

const Company = () => {
    const [name, setName] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = newSelectedRowKeys => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    return (
        <div>
            <Space className="search">
                <SearchInput label="公司名称" value={name} onChange={value => setName(value)} />
                <Button type="primary">搜索</Button>
                <Button>重置</Button>
            </Space>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                }}
                title={() => (
                    <Space className="search">
                        <Button type="primary">搜索</Button>
                        <Button>重置</Button>
                    </Space>
                )}
            ></Table>
        </div>
    );
};

export default Company;
