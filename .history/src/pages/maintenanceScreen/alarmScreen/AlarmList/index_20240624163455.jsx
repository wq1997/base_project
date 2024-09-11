import styles from "./index.less";
import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";

const Index = () => {
    const nameRef = useRef();
    const [name, setName] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [companyList, setCompanyList] = useState([]);

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
            render: value => (value ? "是" : "否"),
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
            render: (_, record) =>
                record?.code != "SERMATEC" &&
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

    const getCompanyList = async () => {
        return;
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
        <div className={styles.index}>
            <div className={styles.title}>告警列表</div>
            <div className={styles.list}>
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
            </div>
        </div>
    );
};

export default Index;
