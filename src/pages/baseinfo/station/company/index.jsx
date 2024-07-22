import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, Card } from "antd";
import { useSelector } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import { SearchInput, CardPage } from "@/components";
import AddCompany from "./AddCompany";
import {
    getCompanyList as getCompanyListServer,
    deleteCompany as deleteCompanyServer,
} from "@/services/sz_index";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { hasPerm } from "@/utils/utils";
import "./index.less";

const Company = () => {
    const nameRef = useRef();
    const [editId, setEditId] = useState();
    const { user } = useSelector(state => state.user);
    const [name, setName] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [companyList, setCompanyList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addCompanyOpen, setAddCompanyOpen] = useState(false);

    const columns = [
        {
            title: "公司类型",
            dataIndex: "companyType"
        },
        {
            title: "公司名称",
            dataIndex: "userName",
        },
        {
            title: "公司税号",
            dataIndex: "creditCode",
        },
        {
            title: "注册地址",
            dataIndex: "operatorAddress",
        },
        {
            title: "联系人",
            dataIndex: "operator",
        },
        {
            title: "联系电话1",
            dataIndex: "operatorTel1",
        },
        {
            title: "联系电话2",
            dataIndex: "operatorTel2",
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, record) =>
                !record?.aggregator &&
                hasPerm(user, "op:company_edit") && (
                    <a
                        onClick={() => {
                            setAddCompanyOpen(true);
                            setEditId(record.id);
                        }}
                    >
                        编辑
                    </a>
                ),
        },
    ];

    const onSelectChange = newSelectedRowKeys => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const onAddCompanyClose = resFlag => {
        setEditId();
        resFlag && getCompanyList();
        setAddCompanyOpen(false);
    };

    const getCompanyList = async () => {
        const { current, pageSize } = paginationRef.current;
        const name = nameRef.current;
        const res = await getCompanyListServer({
            pageNum: current,
            pageSize,
            queryCmd: { keyword: name },
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

    const handleDelete = () => {
        if (selectedRowKeys?.length == 0) {
            return message.info("请先勾选需要删除的数据");
        }
        Modal.confirm({
            title: "确定删除?",
            content: "删除后不可恢复",
            onOk: async () => {
                const res = await deleteCompanyServer(selectedRowKeys);
                if (res?.data?.status == "SUCCESS") {
                    message.success("删除成功");
                    setPagination({
                        current: 1,
                    });
                    setSelectedRowKeys([]);
                    getCompanyList();
                }
            },
        });
    };

    useEffect(() => {
        getCompanyList();
    }, []);

    return (
        <CardPage>
            <AddCompany
                open={addCompanyOpen}
                editId={editId}
                onClose={resFlag => onAddCompanyClose(resFlag)}
            />
            <Space className="search">
                <SearchInput
                    label="公司"
                    value={name}
                    inputWidth={250}
                    placeholder="请输入公司名称或公司编号"
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
                rowKey="id"
                dataSource={companyList}
                columns={columns}
                pagination={pagination}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                    getCheckboxProps: record => ({
                        disabled: record.code === "SERMATEC",
                    }),
                }}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getCompanyList();
                }}
                title={() => (
                    <Space className="table-title">
                        {hasPerm(user, "op:company_add") && (
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setAddCompanyOpen(true)}
                            >
                                新增公司
                            </Button>
                        )}
                        {hasPerm(user, "op:company_delete") && (
                            <Button type="primary" danger onClick={handleDelete}>
                                删除公司
                                {selectedRowKeys?.length ? (
                                    <span>（{selectedRowKeys?.length}）</span>
                                ) : (
                                    ""
                                )}
                            </Button>
                        )}
                    </Space>
                )}
            ></Table>
        </CardPage>
    );
};

export default Company;
