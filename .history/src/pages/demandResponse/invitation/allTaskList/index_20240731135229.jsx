import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { history, useLocation, useSelector } from "umi";
import { SearchInput } from "@/components";
import {
    getTaskist as getTaskistServer,
    getSearchInitData as getSearchInitDataServer,
    confirmTask as confirmTaskServer,
    refuseTask as refuseTaskServer,
} from "@/services/task";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { hasPerm, recordPage } from "@/utils/utils";
import "./index.less";
import dayjs from "dayjs";
import TaskDetail from './TaskDetail'

const Account = () => {
    recordPage("op:invite_task");
    const location = useLocation();
    const initInviteCode = location?.search.split("=")[1];
    const { user } = useSelector(state => state.user);
    const [canSure, setCanSure] = useState(true);
    const [canRefuse, setCanRefuse] = useState(true);
    const endTimeRef = useRef();
    const executeTimeRef = useRef();
    const createTimeRef = useRef();
    const codeRef = useRef();
    const inviteCodeRef = useRef(initInviteCode);
    const confirmStatusRef = useRef();
    const splitStatusRef = useRef();
    const responseTypeRef = useRef();
    const responseTimeTypeRef = useRef();
    const [code, setCode] = useState();
    const [inviteCode, setInviteCode] = useState(initInviteCode);
    const [endTime, setEndTime] = useState();
    const [executeTime, setExecuteTime] = useState();
    const [createTime, setCreateTime] = useState();
    const [confirmStatus, setConfirmStatus] = useState();
    const [confirmStatusList, setConfirmStatusList] = useState();
    const [responseType, setResponseType] = useState();
    const [responseTypeList, setResponseTypeList] = useState();
    const [responseTimeType, setResponseTimeType] = useState();
    const [responseTimeTypeList, setResponseTimeTypeList] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const columns = [
        {
            title: "邀约编号",
            dataIndex: "invitationId",
            render: (_, { resourcePlan }) => {
                return resourcePlan?.invitationId;
            },
        },
        {
            title: "任务编号",
            dataIndex: "id",
            render: (_, { resourcePlan }) => {
                return resourcePlan?.id;
            },
        },
        {
            title: "响应场站名称",
            dataIndex: "resourceName",
            render: (_, { resourcePlan }) => {
                return resourcePlan?.resourceName;
            },
        },
        {
            title: "用户确认状态",
            dataIndex: "userConfirmStatusZh",
            render: (_, { resourcePlan }) => {
                return resourcePlan?.userConfirmStatusZh;
            },
        },
        {
            title: "上游确认状态",
            dataIndex: "szConfirmStatusZh",
            render: (_, { resourcePlan }) => {
                return resourcePlan?.szConfirmStatusZh;
            },
        },
        {
            title: "任务发布时间",
            dataIndex: "createdTime",
            render: (_, { invitation }) => {
                return invitation?.invitationTime;
            },
        },
        {
            title: "确认截止时间",
            dataIndex: "replyTime",
            render: (_, { invitation }) => {
                return invitation?.replyTime;
            },
        },
        {
            title: "响应类型",
            dataIndex: "responseTypeZh",
            render: (_, { invitation }) => {
                return invitation?.responseTypeZh;
            },
        },
        {
            title: "度电报价(元)",
            dataIndex: "whPrice",
            render: (_, { resourcePlan }) => {
                return resourcePlan?.priceKWh;
            },
        },
        {
            title: "计划申报量(kWh)",
            dataIndex: "responsePower",
            render: (_, { resourcePlan }) => {
                return resourcePlan?.capacityKWh;
            },
        },
        {
            title: "实际下发量(kWh)",
            dataIndex: "appointedTimeFrom",
            render: (_, { dayaheadResourcePlan }) => {
                return dayaheadResourcePlan?.capacityKWh;
            },
        },
        {
            title: "约定开始时间",
            dataIndex: "appointedTimeTo",
            render: (_, { invitation }) => {
                return invitation?.startTime;
            },
        },
        {
            title: "约定结束时间",
            dataIndex: "appointedTimeTo",
            render: (_, { invitation }) => {
                return invitation?.endTime;
            },
        },
        {
            title: "备注",
            dataIndex: "remark",
            key: "remark",
            ellipsis: true,
            render: (_, { invitation }) => {
                return invitation?.remark;
            },
        },
        {
            title: "操作",
            dataIndex: "operate",
            fixed: "right",
            width: 200,
            render: (_, { inviteCode }) => {
                return (
                    <Space>
                        <a onClick={() => {}}>查看任务要求</a>
                    </Space>
                );
            },
        },
    ];

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        const hasNoSure = Boolean(newSelectedRows?.some(item => item.supportConfirm == false));
        setCanSure(!hasNoSure);
        const hasNoRefuse = Boolean(newSelectedRows?.some(item => item.supportRefuse == false));
        setCanRefuse(!hasNoRefuse);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { statuses, responseTypes, responseTimeTypes } = res?.data?.data;
            setConfirmStatusList(statuses);
            setResponseTypeList(responseTypes);
            setResponseTimeTypeList(responseTimeTypes);
        }
    };

    const getInviteList = async () => {
        const { current, pageSize } = paginationRef.current;
        const [confirmationDeadlineFrom, confirmationDeadlineTo] = endTimeRef.current || [];
        const [appointedTimeRangeStart, appointedTimeRangeEnd] = executeTimeRef.current || [];
        const [createdTimeFrom, createdTimeTo] = createTimeRef.current || [];
        const code = codeRef.current;
        const inviteCode = inviteCodeRef.current;
        const confirmStatus = confirmStatusRef.current;
        const splitStatus = splitStatusRef.current;
        const responseType = responseTypeRef.current;
        const responseTimeType = responseTimeTypeRef.current;
        const res = await getTaskistServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                confirmationDeadlineFrom,
                confirmationDeadlineTo,
                appointedTimeRangeStart,
                appointedTimeRangeEnd,
                createdTimeFrom,
                createdTimeTo,
                code,
                inviteCode,
                status: confirmStatus,
                splitStatus,
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
            setUserList(
                recordList?.map(item => ({
                    ...item,
                    id: item.resourcePlan?.id,
                }))
            );
        }
    };

    const handleReset = () => {
        history.push("/vpp/demandResponse/invitation/allTaskList");
        paginationRef.current = DEFAULT_PAGINATION;
        endTimeRef.current = undefined;
        setEndTime([]);
        executeTimeRef.current = undefined;
        setExecuteTime([]);
        createTimeRef.current = undefined;
        setCreateTime([]);
        inviteCodeRef.current = undefined;
        setInviteCode();
        codeRef.current = undefined;
        setCode();
        confirmStatusRef.current = undefined;
        setConfirmStatus();
        responseTypeRef.current = undefined;
        setResponseType();
        responseTimeTypeRef.current = undefined;
        setResponseTimeType();
        getInviteList();
    };

    const handleOperate = typeId => {
        const operates = {
            0: {
                type: "确认",
                tip: "任务确认后不可取消",
                fn: confirmTaskServer,
            },
            1: {
                type: "拒绝",
                tip: "任务拒绝后不可取消",
                fn: refuseTaskServer,
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
                    getInviteList();
                }
            },
        });
    };

    useEffect(() => {
        getInviteList();
        getSearchInitData();
    }, []);

    return (
        <div>
            <Detail
                detailId={detailId}
                onClose={() => {
                    setDetailId();
                }}
            />
            <Space className="search">
                <div>
                    <span>确认截止时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            endTimeRef.current = dateStr;
                            setEndTime(dateStr);
                        }}
                        value={
                            endTime && endTime.length > 0 && endTime[0] && endTime[1]
                                ? [dayjs(endTime[0]), dayjs(endTime[1])]
                                : []
                        }
                    />
                </div>
                <SearchInput
                    label="邀约编号"
                    value={inviteCode}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        inviteCodeRef.current = value;
                        setInviteCode(value);
                    }}
                />
                <SearchInput
                    label="任务编号"
                    value={code}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
                    }}
                />
                <SearchInput
                    label="响应类型"
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
                    label="任务确认状态"
                    value={confirmStatus}
                    type="select"
                    options={confirmStatusList}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        confirmStatusRef.current = value;
                        setConfirmStatus(value);
                    }}
                />

                <div>
                    <span>约定执行时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            executeTimeRef.current = dateStr;
                            setExecuteTime(dateStr);
                        }}
                        value={
                            executeTime &&
                            executeTime.length > 0 &&
                            executeTime[0] &&
                            executeTime[1]
                                ? [dayjs(executeTime[0]), dayjs(executeTime[1])]
                                : []
                        }
                    />
                </div>

                <div>
                    <span>任务发布时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            createTimeRef.current = dateStr;
                            setCreateTime(dateStr);
                        }}
                        value={
                            createTime && createTime.length > 0 && createTime[0] && createTime[1]
                                ? [dayjs(createTime[0]), dayjs(createTime[1])]
                                : []
                        }
                    />
                </div>

                <SearchInput
                    label="响应要求"
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
                scroll={{
                    x: "100%",
                }}
                title={() => (
                    <Space className="table-title">
                        {hasPerm(user, "op:invite_task_confirm") && (
                            <Tooltip
                                placement="bottom"
                                title="只有任务状态为【未确认】的数据可以确认"
                            >
                                <Button
                                    type="primary"
                                    disabled={!canSure}
                                    onClick={() => handleOperate(0)}
                                >
                                    批量确认
                                    {selectedRowKeys?.length ? (
                                        <span>({selectedRowKeys?.length})</span>
                                    ) : (
                                        ""
                                    )}
                                </Button>
                            </Tooltip>
                        )}
                        {hasPerm(user, "op:invite_task_refuse") && (
                            <Tooltip
                                placement="bottom"
                                title="只有任务状态为【未确认】的数据可以拒绝"
                            >
                                <Button
                                    type="primary"
                                    danger
                                    disabled={!canRefuse}
                                    onClick={() => handleOperate(1)}
                                >
                                    批量拒绝
                                    {selectedRowKeys?.length ? (
                                        <span>({selectedRowKeys?.length})</span>
                                    ) : (
                                        ""
                                    )}
                                </Button>
                            </Tooltip>
                        )}
                    </Space>
                )}
            ></Table>
        </div>
    );
};

export default Account;
