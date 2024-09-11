import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { SearchInput } from "@/components";
import AddRole from "./AddRole";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";
import { getRoleList as getRoleListServer } from "@/services/user";

const Account = () => {
    const nameRef = useRef();
    const [name, setName] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [list, setList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addRoleOpen, setAddRoleOpen] = useState(false);

    const columns = [
        {
            title: "角色名称",
            dataIndex: "name",
        },
        {
            title: "角色编号",
            dataIndex: "code",
        },
        {
            title: "角色说明",
            dataIndex: "remark",
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, row) => {
                return (
                    <Button type="link" danger>
                        编辑
                    </Button>
                );
            },
        },
    ];

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const name = nameRef.current;
        const res = await getRoleListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                name,
            },
        });
        if (res?.data?.status == "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setList(recordList);
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        nameRef.current = undefined;
        setName();
        getList();
    };

    const handleDelete = typeId => {
        const operates = {
            0: {
                type: "确认",
                tip: "邀约确认后不可取消",
                fn: sureInviteServer,
            },
            1: {
                type: "删除",
                tip: "删除后不可恢复",
                fn: deleteInviteServer,
            },
        };
        const { type, tip, fn } = operates[typeId];
        if (selectedRowKeys?.length == 0) {
            return message.info(`请先勾选需要${type}的数据`);
        }
        Modal.confirm({
            title: `确定${type}？`,
            content: tip,
            onOk: async () => {
                const res = await fn(selectedRowKeys);
                if (res?.data?.status == "SUCCESS") {
                    message.success(`${type}成功`);
                    setPagination({
                        current: 1,
                    });
                    setSelectedRowKeys([]);
                    getList();
                }
            },
        });
    };

    useEffect(() => {
        getInviteList();
    }, []);
    2;

    return (
        <div className="electronic-archives">
            <AddRole open={addRoleOpen} onClose={() => setAddRoleOpen(false)} />
            <Space className="search">
                <SearchInput
                    label="角色名称"
                    value={name}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <Button type="primary" onClick={getList}>搜索</Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={list}
                columns={columns}
                pagination={pagination}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                    getCheckboxProps: record => ({
                        disabled: record.account === "admin",
                    }),
                }}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getInviteList();
                }}
                title={() => (
                    <Space
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            type="primary"
                            icon={<PlusCircleFilled style={{ fontSize: 13 }} />}
                            onClick={() => setAddProjectOpen(true)}
                        >
                            新增角色
                        </Button>
                        <Button type="primary" danger onClick={handleDelete}>
                            批量删除
                            {selectedRowKeys?.length ? (
                                <span>({selectedRowKeys?.length})</span>
                            ) : (
                                ""
                            )}
                        </Button>
                    </Space>
                )}
            ></Table>
        </div>
    );
};

export default Account;
