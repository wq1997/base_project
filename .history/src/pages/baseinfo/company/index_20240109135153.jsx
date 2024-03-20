import React, { useState, useEffect } from "react";
import { Button, Space, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import AddCompany from "./AddCompany";
import { getCompanyList as getCompanyListServer } from "@/services/company";
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
        render: () => <a>编辑</a>,
    },
];

const Company = () => {
    const [name, setName] = useState();
    const [pagination, setPagination] = useState({
        total: 0,
        current: 1,
        pageSize: 8,
        showSizeChanger: false,
    });
    const [companyList, setCompanyList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addCompanyOpen, setAddCompanyOpen] = useState(false);

    const onSelectChange = newSelectedRowKeys => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const onAddCompanyClose = result => {
        setAddCompanyOpen(false);
    };

    const getCompanyList = async () => {
        const { current, pageSize } = pagination;
        const res = await getCompanyListServer({
            pageNum: current,
            pageSize,
            queryCmd: { name },
        });
        console.log(res);
    };

    useEffect(() => {
        getCompanyList();
    }, []);

    return (
        <div>
            <AddCompany open={addCompanyOpen} onClose={result => onAddCompanyClose(result)} />
            <Space className="search">
                <SearchInput label="公司名称" value={name} onChange={value => setName(value)} />
                <Button type="primary">搜索</Button>
                <Button>重置</Button>
            </Space>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
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

export default Company;
