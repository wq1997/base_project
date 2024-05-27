import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import AddCompany from "./AddCompany";
import { getCompanyList as getCompanyListServer } from "@/services/company";
import { DEFAULT_PAGINATION } from "@/utils/constants";
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
        render: (value) => value ? '是' : '否'
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
    },
];

const Company = () => {
    const nameRef = useRef();
    const [name, setName] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [companyList, setCompanyList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addCompanyOpen, setAddCompanyOpen] = useState(false);

    const onSelectChange = newSelectedRowKeys => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const onAddCompanyClose = resFlag => {
        resFlag && getCompanyList();
        setAddCompanyOpen(false);
    };

    const getCompanyList = async () => {
        const { current, pageSize } = paginationRef.current;
        const name = nameRef.current;
        const res = await getCompanyListServer({
            pageNum: current,
            pageSize,
            queryCmd: { name },
        });
        if (res?.data?.status == "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setCompanyList(recordList);
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        nameRef.current = "";
        setName("");
        getCompanyList();
    };

    useEffect(() => {
        getCompanyList();
    }, []);

    return (
        <div>
            <AddCompany open={addCompanyOpen} onClose={resFlag => onAddCompanyClose(resFlag)} />
            <Space className="search">
                <SearchInput
                    label="公司名称"
                    value={name}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <Button type="primary" onClick={getCompanyList}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                dataSource={companyList}
                columns={columns}
                pagination={pagination}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                }}
                onChange={(pagination) => {
                    paginationRef.current = pagination;
                    getCompanyList();
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
            >
                <Table.Column
                    title="操作"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a>Invite {record.lastName}</a>
                            <a>Delete</a>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
};

export default Company;