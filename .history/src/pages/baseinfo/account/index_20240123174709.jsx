import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import AddCompany from "./AddCompany";
import {
    getUserList as getUserListServer,
    deleteUser as deleteUserServer,
    getSearchInitData as getSearchInitDataServer,
} from "@/services/account";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";

const Account = () => {
    const accountRef = useRef();
    const nameRef = useRef();
    const companyCodeRef = useRef();
    const roleCodeRef = useRef();
    const [editId, setEditId] = useState();
    const [account, setAccount] = useState();
    const [name, setName] = useState();
    const [companyCode, setCompanyCode] = useState();
    const [roleCode, setRoleCode] = useState();
    const [companyList, setCompanyList] = useState();
    const [roleList, setRoleList] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addCompanyOpen, setAddCompanyOpen] = useState(false);

    const columns = [
        {
            title: "账号",
            dataIndex: "account",
        },
        {
            title: "姓名",
            dataIndex: "name",
        },
        {
            title: "关联手机号",
            dataIndex: "phoneNo",
        },
        {
            title: "所属公司",
            dataIndex: "company",
            render: value => value?.name,
        },
        {
            title: "绑定角色",
            dataIndex: "roles",
            render: value => value?.map(item => item?.name)?.join("，"),
        },
        {
            title: "备注",
            dataIndex: "remark",
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, record) =>
                record.account != "admin" && (
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
        resFlag && getUserList();
        setAddCompanyOpen(false);
    };

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { companies, roles } = res?.data?.data;
            setCompanyList(companies);
            setRoleList(roles);
        }
    };

    const getUserList = async () => {
        const { current, pageSize } = paginationRef.current;
        const account = accountRef.current;
        const name = nameRef.current;
        const companyCode = companyCodeRef.current;
        const roleCode = roleCodeRef.current;
        const res = await getUserListServer({
            pageNum: current,
            pageSize,
            queryCmd: { account, name, companyCode, roleCode },
        });
        if (res?.data?.status == "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setUserList(recordList);
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        accountRef.current = "";
        setAccount("");
        nameRef.current = "";
        setName("");
        companyCodeRef.current = "";
        setCompanyCode("");
        roleCodeRef.current = undefined;
        setRoleCode("");
        getUserList();
    };

    const handleDelete = () => {
        if (selectedRowKeys?.length == 0) {
            return message.info("请先勾选需要删除的数据");
        }
        Modal.confirm({
            title: "确定删除?",
            content: "删除后不可恢复",
            onOk: async () => {
                const res = await deleteUserServer(selectedRowKeys);
                if (res?.data?.status == "SUCCESS") {
                    message.success("删除成功");
                    setPagination({
                        current: 1,
                    });
                    setSelectedRowKeys([]);
                    getUserList();
                }
            },
        });
    };

    useEffect(() => {
        getUserList();
        getSearchInitData();
    }, []);

    return (
        <div>
            <AddCompany
                open={addCompanyOpen}
                editId={editId}
                onClose={resFlag => onAddCompanyClose(resFlag)}
            />
            <Space className="search">
                <SearchInput
                    label="邀约编号"
                    value={account}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        accountRef.current = value;
                        setAccount(value);
                    }}
                />
                <SearchInput
                    label="邀约确认状态"
                    value={name}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <SearchInput
                    label="邀约拆分状态"
                    type="select"
                    value={companyCode}
                    options={companyList}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        companyCodeRef.current = value;
                        setCompanyCode(value);
                    }}
                />
                <SearchInput
                    label="绑定角色"
                    type="select"
                    options={roleList}
                    value={roleCode}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        roleCodeRef.current = value;
                        setRoleCode(value);
                    }}
                />
                <Button type="primary" onClick={getUserList}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={userList}
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
                    getUserList();
                }}
                title={() => (
                    <Space className="table-title">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setAddCompanyOpen(true)}
                        >
                            新增账号
                        </Button>
                        <Button type="primary" danger onClick={handleDelete}>
                            删除账号
                            {selectedRowKeys?.length ? (
                                <span>（{selectedRowKeys?.length}）</span>
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