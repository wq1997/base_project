import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { history, useLocation } from "umi";
import { SearchInput } from "@/components";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";
import dayjs from "dayjs";

let invalidReason = undefined;

const Account = () => {
    const location = useLocation();
    const initCode = location?.search.split("=")[1];
    const [canSure, setCanSure] = useState(true);
    const [canDelete, setCanDelete] = useState(true);
    const [canInvalid, setCanInvalid] = useState(true);
    const releaseTimeRef = useRef();
    const executeTimeRef = useRef();
    const codeRef = useRef(initCode);
    const confirmStatusRef = useRef();
    const splitStatusRef = useRef();
    const responsePowerRef = useRef();
    const responseTypeRef = useRef();
    const responseTimeTypeRef = useRef();
    const [code, setCode] = useState(initCode);
    const [releaseTime, setReleaseTime] = useState();
    const [executeTime, setExecuteTime] = useState();
    const [confirmStatus, setConfirmStatus] = useState();
    const [confirmStatusList, setConfirmStatusList] = useState();
    const [splitStatus, setSplitStatus] = useState();
    const [splitStatusList, setSplitStatusList] = useState();
    const [responsePower, setResponsePower] = useState();
    const [responseType, setResponseType] = useState();
    const [responseTypeList, setResponseTypeList] = useState();
    const [responseTimeType, setResponseTimeType] = useState();
    const [responseTimeTypeList, setResponseTimeTypeList] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [enterRecordOpen, setEnterRecordOpen] = useState(false);
    const [invitationSplitId, setInvitationSplitId] = useState();
    const [detailId, setDetailId] = useState(false);

    const columns = [
        {
            title: "项目名称",
            dataIndex: "code",
        },
        {
            title: "子项目名称",
            dataIndex: "confirmStatusZh",
        },
        {
            title: "数据类型",
            dataIndex: "splitStatusZh",
        },
        {
            title: "设备类型",
            dataIndex: "createdTime",
        },
        {
            title: "设备位置",
            dataIndex: "responseTypeZh",
        },
        {
            title: "设备编号",
            dataIndex: "responseTimeTypeZh",
        },
        {
            title: "取值维度",
            dataIndex: "whPrice",
        },
        {
            title: "测试单元",
            dataIndex: "responsePower",
        },
        {
            title: "上传时间",
            dataIndex: "appointedTimeFrom",
        },
        {
            title: "处理进度",
            dataIndex: "appointedTimeTo",
        },
        {
            title: "备注",
            dataIndex: "remark",
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, { id, supportSplit, supportReSplit }) => {
                return (
                    <Space>
                        <a onClick={() => setInvitationSplitId(id)}>
                            {supportSplit ? "邀约拆分" : supportReSplit ? "重新拆分" : ""}
                        </a>
                        <a onClick={() => setDetailId(id)}>详情</a>
                    </Space>
                );
            },
        },
    ];

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        const hasNoSure = Boolean(newSelectedRows?.some(item => item.supportConfirm == false));
        setCanSure(!hasNoSure);
        const hasNoDelete = Boolean(newSelectedRows?.some(item => item.supportDelete == false));
        setCanDelete(!hasNoDelete);
        const hasNoInvalid = Boolean(newSelectedRows?.some(item => item.supportInvalid == false));
        setCanInvalid(!hasNoInvalid);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { confirmStatuses, splitStatuses, responseTypes, responseTimeTypes } =
                res?.data?.data;
            setConfirmStatusList(confirmStatuses);
            setSplitStatusList(splitStatuses);
            setResponseTypeList(responseTypes);
            setResponseTimeTypeList(responseTimeTypes);
        }
    };

    const getInviteList = async () => {
        const { current, pageSize } = paginationRef.current;
        const [createdTimeFrom, createdTimeTo] = releaseTimeRef.current || [];
        const [appointedTimeRangeStart, appointedTimeRangeEnd] = executeTimeRef.current || [];
        const code = codeRef.current;
        const confirmStatus = confirmStatusRef.current;
        const splitStatus = splitStatusRef.current;
        const responsePower = +responsePowerRef.current;
        const responseType = responseTypeRef.current;
        const res = await getInviteListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                createdTimeFrom,
                createdTimeTo,
                appointedTimeRangeStart,
                appointedTimeRangeEnd,
                code,
                confirmStatus,
                splitStatus,
                responsePower,
                responseType,
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
        history.push("/vpp/demandResponse/invitation/invitationList");
        paginationRef.current = DEFAULT_PAGINATION;
        releaseTimeRef.current = undefined;
        setReleaseTime([]);
        executeTimeRef.current = undefined;
        setExecuteTime([]);
        codeRef.current = undefined;
        setCode();
        confirmStatusRef.current = undefined;
        setConfirmStatus();
        splitStatusRef.current = undefined;
        setSplitStatus();
        responsePowerRef.current = undefined;
        setResponsePower();
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
            <Space className="search">
                <SearchInput
                    label="项目名称"
                    value={code}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
                    }}
                />
                <SearchInput
                    label="子项目名称"
                    value={code}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
                    }}
                />
                <SearchInput
                    label="数据类型"
                    value={confirmStatus}
                    type="select"
                    options={confirmStatusList}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        confirmStatusRef.current = value;
                        setConfirmStatus(value);
                    }}
                />
                <SearchInput
                    label="设备位置"
                    type="select"
                    value={splitStatus}
                    options={splitStatusList}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        splitStatusRef.current = value;
                        setSplitStatus(value);
                    }}
                />
                <SearchInput
                    label="上传人"
                    value={responsePower}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responsePowerRef.current = value;
                        setResponsePower(value);
                    }}
                />
                <SearchInput
                    label="上传时间"
                    type="select"
                    options={responseTypeList}
                    value={responseType}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTypeRef.current = value;
                        setResponseType(value);
                    }}
                />
                <SearchInput
                    label="测试平台"
                    type="select"
                    options={responseTypeList}
                    value={responseType}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTypeRef.current = value;
                        setResponseType(value);
                    }}
                />
                <SearchInput
                    label="取值维度"
                    type="select"
                    options={responseTimeTypeList}
                    value={responseTimeType}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTimeTypeRef.current = value;
                        setResponseTimeType(value);
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
                    <Space className="table-title">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setEnterRecordOpen(true)}
                        >
                            手工录入
                        </Button>
                        <Tooltip placement="bottom" title="只有邀约状态为【未确认】的数据可以确认">
                            <Button
                                type="primary"
                                disabled={!canSure}
                                onClick={() => handleOperate(0)}
                            >
                                邀约确认
                                {selectedRowKeys?.length ? (
                                    <span>({selectedRowKeys?.length})</span>
                                ) : (
                                    ""
                                )}
                            </Button>
                        </Tooltip>
                        <Tooltip
                            placement="bottom"
                            title="只有邀约确认状态为【未确认】【已过期】的数据可以删除"
                        >
                            <Button
                                type="primary"
                                danger
                                disabled={!canDelete}
                                onClick={() => handleOperate(1)}
                            >
                                批量删除
                                {selectedRowKeys?.length ? (
                                    <span>({selectedRowKeys?.length})</span>
                                ) : (
                                    ""
                                )}
                            </Button>
                        </Tooltip>
                        <Tooltip
                            placement="bottom"
                            title="只有邀约确认状态为【已确认】的数据可以作废"
                        >
                            <Button
                                type="primary"
                                danger
                                disabled={!canInvalid}
                                onClick={handleInvalid}
                            >
                                批量作废
                                {selectedRowKeys?.length ? (
                                    <span>({selectedRowKeys?.length})</span>
                                ) : (
                                    ""
                                )}
                            </Button>
                        </Tooltip>
                    </Space>
                )}
            ></Table>
        </div>
    );
};

export default Account;
