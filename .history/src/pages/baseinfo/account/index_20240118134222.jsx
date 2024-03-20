import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import AddCompany from "./AddCompany";
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
        title: "账号编号",
        dataIndex: "name",
    },
    {
        title: "用户昵称",
        dataIndex: "age",
    },
    {
        title: "关联手机号",
        dataIndex: "关联平台",
    },
    {
        title: "所属公司",
        dataIndex: "关联平台",
    },
    {
        title: "绑定角色",
        dataIndex: "关联平台",
    },
    {
        title: "需求响应自动确认",
        dataIndex: "关联平台",
    },
    {
        title: "紧急联系电话",
        dataIndex: "关联平台",
    },
    {
        title: "操作",
        dataIndex: "operate",
        render: () => <a>编辑</a>,
    },
];

const Account = () => {
    const [name, setName] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addCompanyOpen, setAddCompanyOpen] = useState(false);

    const onSelectChange = newSelectedRowKeys => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const onAddCompanyClose = result => {
        setAddCompanyOpen(false)
    }

    return (
        <div>
            <AddCompany open={addCompanyOpen} onClose={result => onAddCompanyClose(result)} />
            <Space className="search">
                <SearchInput label="账号名称" value={name} onChange={value => setName(value)} />
                <SearchInput label="所属公司" value={name} onChange={value => setName(value)} />
                <SearchInput label="绑定角色" value={name} onChange={value => setName(value)} />
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
                    <Space className="table-title">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setAddCompanyOpen(true)}
                        >
                            新增公司
                        </Button>
                        <Button type="primary">删除公司</Button>
                    </Space>
                )}
            ></Table>
        </div>
    );
};

export default Account;
