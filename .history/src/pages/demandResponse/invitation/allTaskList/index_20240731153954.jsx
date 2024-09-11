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
import TaskDetail from "./TaskDetail";

const Account = () => {
    recordPage("op:invite_task");
    const { user } = useSelector(state => state.user);
    const releaseTimeRef = useRef();
    const [releaseTime, setReleaseTime] = useState();
    const invitationIdRef = useRef();
    const [invitationId, setInvitationId] = useState();
    const taskCodeRef = useRef();
    const [taskCode, setTaskCode] = useState();
    const stationNameRef = useRef();
    const [stationName, setStationName] = useState();
    const deadlineTimeRef = useRef();
    const [deadlineTime, setDeadlineTime] = useState();
    const userConfirmStatusRef = useRef();
    const [userConfirmStatus, setUserConfirmStatus] = useState();
    const [userConfirmStatusList, setUserConfirmStatusList] = useState();
    const szConfirmStatusRef = useRef();
    const [szConfirmStatus, setSzConfirmStatus] = useState();
    const [szConfirmStatusList, setSzConfirmStatusList] = useState();
    const responseTypeRef = useRef();
    const [responseType, setResponseType] = useState();
    const [responseTypeList, setResponseTypeList] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [taskDetailData, setTaskDetailData] = useState();
    const [canRefuseOrConfirm, setCanRefuseOrConfirm] = useState(true);

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
            dataIndex: "capacityKWh",
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
            render: (_, data) => {
                return (
                    <Space>
                        <a
                            onClick={() => {
                                setTaskDetailData(data);
                            }}
                        >
                            查看任务要求
                        </a>
                    </Space>
                );
            },
        },
    ];

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        const hasNoRefuseOrConfirm = Boolean(
            newSelectedRows?.some(item => item.resourcePlan.supportRefuseOrConfirm == false)
        );
        setCanRefuseOrConfirm(!hasNoRefuseOrConfirm);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { szConfirmStatus, userConfirmStatus } = res?.data?.data;
            setUserConfirmStatusList(userConfirmStatus);
            setSzConfirmStatusList(szConfirmStatus);
        }
    };

    const getInviteList = async () => {
        const { current, pageSize } = paginationRef.current;
        const [releaseTimeFrom, releaseTimeStartTo] = releaseTimeRef.current || [];
        const invitationId = invitationIdRef.current;
        const taskCode = taskCodeRef.current;
        const responseType = responseTypeRef?.current;
        const stationName = stationNameRef.current;
        const [deadlineTimeFrom, deadlineTimeTo] = deadlineTimeRef.current || [];
        const userConfirmStatus = userConfirmStatusRef.current;
        const szConfirmStatus = szConfirmStatusRef.current;
        const res = await getTaskistServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                createdTimeFrom: releaseTimeFrom,
                createdTimeTo: releaseTimeStartTo,
                invitationId,
                code: taskCode,
                exchangeType: responseType,
                stationName,
                confirmDeadlineFrom: deadlineTimeFrom,
                confirmDeadlineTo: deadlineTimeTo,
                userConfirmStatus: userConfirmStatus ? [userConfirmStatus] : null,
                szConfirmStatus: szConfirmStatus ? [szConfirmStatus] : null,
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
        releaseTimeRef.current = undefined;
        setReleaseTime([]);
        invitationIdRef.current = undefined;
        setInvitationId();
        taskCodeRef.current = undefined
        setTaskCode()
        responseTypeRef.current=undefined
        setResponseType()
        stationNameRef.current=undefined
        setStationName()
        deadlineTimeRef.current=undefined
        setDeadlineTime()
        userConfirmStatusRef.current=undefined
        setUserConfirmStatus()
        sz

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
            <TaskDetail
                taskDetailData={taskDetailData}
                onClose={() => {
                    setTaskDetailData();
                }}
            />
            <Space className="search">
                <div>
                    <span>任务发布时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            releaseTimeRef.current = dateStr;
                            setReleaseTime(dateStr);
                        }}
                        value={
                            releaseTime &&
                            releaseTime.length > 0 &&
                            releaseTime[0] &&
                            releaseTime[1]
                                ? [dayjs(releaseTime[0]), dayjs(releaseTime[1])]
                                : []
                        }
                    />
                </div>
                <SearchInput
                    label="邀约编号"
                    value={invitationId}
                    onChange={value => {
                        invitationIdRef.current = value;
                        setInvitationId(value);
                    }}
                />
                <SearchInput
                    label="任务编号"
                    value={taskCode}
                    onChange={value => {
                        taskCodeRef.current = value;
                        setTaskCode(value);
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
                    label="场站名称"
                    value={stationName}
                    onChange={value => {
                        stationNameRef.current = value;
                        setStationName(value);
                    }}
                />
                <div>
                    <span>确认截止时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            deadlineTimeRef.current = dateStr;
                            setDeadlineTime(dateStr);
                        }}
                        value={
                            deadlineTime &&
                            deadlineTime.length > 0 &&
                            deadlineTime[0] &&
                            deadlineTime[1]
                                ? [dayjs(deadlineTime[0]), dayjs(deadlineTime[1])]
                                : []
                        }
                    />
                </div>
                <SearchInput
                    label="用户确认状态"
                    type="select"
                    value={userConfirmStatus}
                    options={userConfirmStatusList}
                    onChange={value => {
                        userConfirmStatusRef.current = value;
                        setUserConfirmStatus(value);
                    }}
                />
                <SearchInput
                    label="上游确认状态"
                    type="select"
                    value={szConfirmStatus}
                    options={szConfirmStatusList}
                    onChange={value => {
                        szConfirmStatusRef.current = value;
                        setSzConfirmStatus(value);
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
                        {hasPerm(user, "op:invitation_resource_plan_confirm") && (
                            <Tooltip
                                placement="bottom"
                                title="只有任务状态为【未确认】的数据可以确认"
                            >
                                <Button
                                    type="primary"
                                    disabled={!canRefuseOrConfirm}
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
                        {hasPerm(user, "op:invitation_resource_plan_refuse") && (
                            <Tooltip
                                placement="bottom"
                                title="只有任务状态为【未确认】的数据可以拒绝"
                            >
                                <Button
                                    type="primary"
                                    danger
                                    disabled={!canRefuseOrConfirm}
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
