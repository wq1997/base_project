import React, { useState, useEffect } from "react";
import { Button, Space, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import AddCompany from "./AddCompany";
import { getCompanyList as getCompanyListServer } from "@/services/company";
import "./index.less";

const columns = [
    {
        title: "公司名称",
        dataIndex: "name",
    },
    {
        title: "公司编号",
        dataIndex: "code",
    },
    {
        title: "是否默认确认任务",
        dataIndex: "autoConfirmTask",
    },
    {
        title: "平台分润比例",
        dataIndex: "profitSharingRatio",
    },
    {
        title: "紧急联系人",
        dataIndex: "contactPerson",
    },
    {
        title: "紧急联系电话",
        dataIndex: "contractPhone",
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
        if (res?.data?.status == "SUCCESS") {
            const { recordList } = res?.data?.data;
            setCompanyList(recordList);
        }
    };

    useEffect(() => {
        getCompanyList();
    }, []);

    return (
        <div>
            <AddCompany open={addCompanyOpen} onClose={result => onAddCompanyClose(result)} />
            <Space className="search">
                <SearchInput label="公司名称" value={name} onChange={value => setName(value)} />
                <Button type="primary" onClick={()=>{
                    setPagination({
                        
                    })
                }}>搜索</Button>
                <Button>重置</Button>
            </Space>
            <Table
                dataSource={companyList}
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
