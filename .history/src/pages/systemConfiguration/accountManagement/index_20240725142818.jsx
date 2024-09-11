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
    Popconfirm,
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
    const regionRef = useRef();
    const [regionsOptions, setRegionOptions] = useState([]);
    const [region, setRegion] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addAccountOpen, setAddAccountOpen] = useState(false);
    const [editId, setEditId] = useState();

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
            title: "管辖区域",
            dataIndex: "regionVos",
            render: (_, { regionVos }) => {
                return regionVos?.map(item => item.name)?.join("，");
            },
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
            width: 180,
            render: (_, { id, wxOpenId }) => {
                return (
                    <Space size="middle">
                        <a
                            onClick={() => {
                                setAddAccountOpen(true);
                                setEditId(id);
                            }}
                        >
                            编辑
                        </a>
                        {wxOpenId && (
                            <Popconfirm
                                title="Delete the task"
                                description="确定解绑chi?"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a style={{ color: "#F5222D" }} onClick={() => {}}>
                                    解绑
                                </a>
                            </Popconfirm>
                        )}
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
            setRegionOptions(regions);
        }
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const account = accountRef.current;
        const name = nameRef.current;
        const region = regionRef.current;
        const roleCode = roleCodeRef?.current;
        const res = await getAccountListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                account,
                name,
                region,
                roleCode,
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
        nameRef.current = undefined;
        setName();
        roleCodeRef.current = undefined;
        setRoleCode();
        regionRef.current = undefined;
        setRegion();
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
                editId={editId}
                onClose={() => {
                    setAddAccountOpen(false);
                    setEditId();
                    getList();
                }}
            />
            <Space className="search" size="middle">
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
                    label="管辖区域"
                    type="select"
                    value={region}
                    options={regionsOptions}
                    onChange={value => {
                        regionRef.current = value;
                        setRegion(value);
                    }}
                />
                <Button type="primary" onClick={getList}>
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
                            onClick={() => setAddAccountOpen(true)}
                        >
                            新增账号
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
