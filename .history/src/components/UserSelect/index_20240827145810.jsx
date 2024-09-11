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
import { SearchInput, Title } from "@/components";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";
import dayjs from "dayjs";
import {
    getAccountSearchIndexData as getAccountSearchIndexDataServer,
    getAccountList as getAccountListServer,
    unBindWx as unBindWxServer,
} from "@/services/user";
import './index.less'

const Account = ({ open, onClose }) => {
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
    ];

    const handleUnbind = async ids => {
        const res = await unBindWxServer(ids);
        if (res?.data?.status == "SUCCESS") {
            message.success("操作成功");
            getList();
        }
    };

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

    useEffect(() => {
        getList();
        getSearchInitData();
    }, []);

    return (
        <Modal
            title={<Title>用户选择</Title>}
            width={'80%'}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose()}
        >
            <div className="electronic-archives">
                <Space  style={{marginBottom:8,flexWrap:''}}>
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
                    <Button onClick={handleReset} type="primary" danger>
                        重置
                    </Button>
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
                ></Table>
            </div>
        </Modal>
    );
};

export default Account;
