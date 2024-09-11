import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    Space,
    Table,
    message,
    Modal,
    DatePicker,
    Tooltip,
    Input,
    Radio,
    Dropdown,
} from "antd";
import {
    EllipsisOutlined,
    FileSearchOutlined,
    FileProtectOutlined,
    UnorderedListOutlined,
    UserOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    PlusCircleFilled,
} from "@ant-design/icons";
import { history, useLocation } from "umi";
import { SearchInput } from "@/components";
import AddAccount from "./AddAccount";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";
import dayjs from "dayjs";
import {
    getAccountSearchIndexData as getAccountSearchIndexDataServer,
    getAccountList as getAccountListServer,
} from "@/services/user";

const Account = () => {
    const accountRef = useRef();
    const [account, setAccount] = useState();
    const nameRef = useRef();
    const [name, setName] = useState();
    const roleCodeRef = useRef();
    const [roleOptions, setRoleOptions] = useState([]);
    const [roleCode, setRoleCode] = useState();
    const regionsRef = useRef();
    const [regionsOptions, setRegionsOptions] = useState([]);
    const [regions, setRegions] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addAccountOpen, setAddAccountOpen] = useState(false);

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
            title: "所属区域",
            dataIndex: "",
        },
        {
            title: "绑定角色",
            dataIndex: "roles",
            render: (_, { roles }) => {
                return roles?.map(item => item.name)?.join("，");
            },
        },
        {
            title: "备注",
            dataIndex: "remark",
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, row) => {
                return (
                    <Space>
                        <Button type="link" danger>
                            编辑
                        </Button>
                    </Space>
                );
            },
        },
    ];

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getSearchInitData = async () => {
        const res = await getAccountSearchIndexDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { roles, regions } = res?.data?.data;
            setRoleOptions(roles);
            setRegionOptions(roles);
        }
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const account = accountRef.current;
        const res = await getAccountListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                account,
            },
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
        accountRef.current = undefined;
        setAccount();
        getList();
    };

    const handleDelete = () => {
        if (selectedRowKeys?.length == 0) {
            return message.info(`请先勾选需要删除的数据`);
        }
        Modal.confirm({
            title: `确定删除？`,
            content: "删除后无法恢复",
            onOk: async () => {
                const res = await deleteRoleServer(selectedRowKeys);
                if (res?.data?.status == "SUCCESS") {
                    message.success(`删除成功`);
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
        getList();
        getSearchInitData();
    }, []);

    return (
        <div className="electronic-archives">
            <AddAccount
                open={addAccountOpen}
                onClose={resFlag => {
                    setAddAccount(false);
                }}
            />
            <Space className="search">
                <SearchInput
                    label="账号"
                    value={account}
                    onChange={value => {
                        accountRef.current = value;
                        setAccount(value);
                    }}
                />
                <SearchInput
                    label="姓名"
                    value={name}
                    onChange={value => {
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <SearchInput
                    label="绑定角色"
                    type="select"
                    value={roleCode}
                    options={roleOptions}
                    onChange={value => {
                        roleCodeRef.current = value;
                        setRoleCode(value);
                    }}
                />
                 <SearchInput
                    label="所属区域"
                    type="select"
                    value={region}
                    options={regionsOptions}
                    onChange={value => {
                        roleCodeRef.current = value;
                        setRegion(value);
                    }}
                />
                <Button type="primary">搜索</Button>
                <Button>重置</Button>
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
                    getList();
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
                            onClick={() => setAddRoleOpen(true)}
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
