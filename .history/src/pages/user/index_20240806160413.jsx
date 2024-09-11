import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import {
    getTaskist as getTaskistServer,
    getSearchInitData as getSearchInitDataServer,
} from "@/services/index";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { history, useLocation, useSelector } from "umi";

import dayjs from "dayjs";

const Account = () => {
    const location = useLocation();
    const { user } = useSelector(state => state.user);
    const endTimeRef = useRef();
    const executeTimeRef = useRef();
    const codeRef = useRef();
    const statusRef = useRef();
    const responseTypeRef = useRef();
    const responseTimeTypeRef = useRef();
    const [code, setCode] = useState();

    const [status, setStatus] = useState();
    const [statusList, setStatusList] = useState();
    const [responseType, setResponseType] = useState();
    const [responseTypeList, setResponseTypeList] = useState();

    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([]);

    const columns = [
        {
            title: "申请状态",
            dataIndex: "code",
            width: 150,
        },
        {
            title: "姓名",
            dataIndex: "姓名",
            key: "statusZh",
            width: 150,
        },
        {
            title: "手机号",
            dataIndex: "confirmationDeadline",
            width: 200,
        },
        {
            title: "职务",
            dataIndex: "responseTypeZh",
            width: 150,
        },
        {
            title: "所在末级部门",
            dataIndex: "responseTimeTypeZh",
            width: 150,
        },
        {
            title: "绑定设备序列号",
            dataIndex: "whPrice",
            width: 150,
        },
        {
            title: "是否具备用户管理权限",
            dataIndex: "responsePower",
            width: 150,
        },
        {
            title: "操作",
            dataIndex: "operate",
            fixed: "right",
            width: 200,
            render: (_, { supportConfirm }) => {
                if (supportConfirm) {
                    return (
                        hasPerm(user, "op:task_confirm") && (
                            <a
                                onClick={() => {
                                    history.push(`/vpp/demandResponse/task/confirm?taskId=${id}`);
                                }}
                            >
                                前往确认
                            </a>
                        )
                    );
                }
            },
        },
    ];

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { statuses, responseTypes, responseTimeTypes } = res?.data?.data;
            setStatusList(statuses);
            setResponseTypeList(responseTypes);
            setResponseTimeTypeList(responseTimeTypes);
        }
    };

    const getInviteList = async () => {
        const taskCode = location?.search.split("=")[1];
        setCode(taskCode);
        const { current, pageSize } = paginationRef.current;

        const code = taskCode || codeRef.current;
        const status = statusRef.current;
        const responseType = responseTypeRef.current;
        const responseTimeType = responseTimeTypeRef?.current;
        const res = await getTaskistServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                code,
                status,
                responseType,
                responseTimeType,
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
        endTimeRef.current = undefined;
        setEndTime([]);
        executeTimeRef.current = undefined;
        setExecuteTime([]);
        codeRef.current = undefined;
        setCode();
        statusRef.current = undefined;
        setStatus();
        responseTypeRef.current = undefined;
        setResponseType();
        responseTimeTypeRef.current = undefined;
        setResponseTimeType();
        getInviteList();
    };

    useEffect(() => {
        getInviteList();
        getSearchInitData();
    }, []);

    return (
        <div>
            <Space
                className="search"
                style={{
                    flexWrap: "wrap",
                    marginBottom: 8,
                }}
            >
                <SearchInput
                    label="申请状态"
                    value={status}
                    type="select"
                    options={statusList}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        statusRef.current = value;
                        setStatus(value);
                    }}
                />

                <SearchInput
                    label="姓名"
                    value={code}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
                    }}
                />

                <SearchInput
                    label="手机号"
                    value={code}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
                    }}
                />

                <SearchInput
                    label="绑定用户序列号"
                    value={code}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
                    }}
                />

                <SearchInput
                    label="是否具备管理员权限"
                    type="select"
                    options={responseTypeList}
                    value={responseType}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTypeRef.current = value;
                        setResponseType(value);
                    }}
                />

                <Button type="primary" onClick={getInviteList}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={userList}
                columns={columns}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getInviteList();
                }}
                scroll={{
                    x: "100%",
                }}
            ></Table>
        </div>
    );
};

export default Account;
