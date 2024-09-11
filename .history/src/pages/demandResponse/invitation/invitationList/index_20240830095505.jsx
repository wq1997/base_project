import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { history, useLocation, useSelector } from "umi";
import { SearchInput } from "@/components";
import EnterRecord from "./EnterRecord";
import InvitationSplit from "./InvitationSplit";
import Detail from "./Detail";
import {
    getInviteList as getInviteListServer,
    getSearchInitData as getSearchInitDataServer,
    sureInvite as sureInviteServer,
    deleteInvite as deleteInviteServer,
    invalidInvite as invalidInviteServer,
} from "@/services/invitation";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { hasPerm, recordPage } from "@/utils/utils";
import "./index.less";
import dayjs from "dayjs";

let invalidReason = undefined;

const Account = () => {
    recordPage("op:invite_list");
    const location = useLocation();
    const initCode = location?.search.split("=")[1];
    const { user } = useSelector(state => state.user);
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
            title: "邀约编号",
            dataIndex: "code",
            width: 200,
            render(_, recode) {
                return (
                    <a
                        onClick={_ =>
                            history.push(
                                `/vpp/demandResponse/invitation/allTaskList?inviteCode=${recode.code}`
                            )
                        }
                    >
                        {recode.code}
                    </a>
                );
            },
        },
        {
            title: "邀约状态",
            dataIndex: "confirmStatusZh",
            width: 200,
        },
        // {
        //     title: "邀约拆分状态",
        //     dataIndex: "splitStatusZh",
        //     width: 200,
        // },
        {
            title: "邀约发布时间",
            dataIndex: "createdTime",
            width: 300,
        },
        {
            title: "响应类型",
            dataIndex: "responseTypeZh",
            width: 200,
        },
        {
            title: "响应要求",
            dataIndex: "responseTimeTypeZh",
            width: 200,
        },
        {
            title: "度电报价(元)",
            dataIndex: "whPrice",
            width: 200,
        },
        {
            title: "响应功率(kW)",
            dataIndex: "responsePower",
            width: 200,
        },
        {
            title: "约定开始时间",
            dataIndex: "appointedTimeFrom",
            width: 300,
        },
        {
            title: "约定结束时间",
            dataIndex: "appointedTimeTo",
            width: 200,
        },
        {
            title: "备注",
            dataIndex: "remark",
            key: "remark",
            ellipsis: true,
            width: 250,
            render(value) {
                return (
                    <Tooltip title={value}>
                        <div
                            style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                width: 200,
                            }}
                        >
                            {value}
                        </div>
                    </Tooltip>
                );
            },
        },
        // {
        //     title: "操作",
        //     dataIndex: "operate",
        //     fixed: "right",
        //     width: 200,
        //     render: (_, { id, supportSplit, supportReSplit }) => {
        //         return (
        //             <Space>
        //                 {hasPerm(user, "op:invite_split") && (
        //                     <a onClick={() => setInvitationSplitId(id)}>
        //                         {supportSplit ? "邀约拆分" : supportReSplit ? "重新拆分" : ""}
        //                     </a>
        //                 )}
        //                 <a onClick={() => setDetailId(id)}>详情</a>
        //             </Space>
        //         );
        //     },
        // },
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
        const responseTimeType = responseTimeTypeRef.current;
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

    const handleInvalid = () => {
        if (selectedRowKeys?.length == 0) {
            return message.info("请先勾选需要作废的数据");
        }
        Modal.confirm({
            title: "批量作废",
            icon: <ExclamationCircleOutlined />,
            width: 500,
            content: (
                <div>
                    <div style={{ marginBottom: "10px" }}>
                        作废邀约，关联任务将被同步作废，不再统计进入流水，请输入作废原因
                    </div>
                    <Input.TextArea
                        rows={4}
                        placeholder="请输入作废原因，最多50字"
                        maxLength={50}
                        onChange={e => (invalidReason = e.target.value)}
                    />
                </div>
            ),
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
                if (!invalidReason) {
                    message.info("请输入作废原因");
                    return Promise.reject();
                }
                const res = await invalidInviteServer({
                    ids: selectedRowKeys,
                    reason: invalidReason,
                });
                if (res?.data?.status == "SUCCESS") {
                    message.success("作废成功");
                    setPagination({
                        current: 1,
                    });
                    setSelectedRowKeys([]);
                    getInviteList();
                    invalidReason = undefined;
                }
            },
            onCancel: () => {
                invalidReason = undefined;
            },
        });
    };

    const handleOperate = typeId => {
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
                    getInviteList();
                }
            },
        });
    };

    useEffect(() => {
        getInviteList();
        getSearchInitData();
    }, []);

    useEffect(() => {
        if (selectedRowKeys?.length === 0) {
            setCanSure(true);
            setCanDelete(true);
            setCanInvalid(true);
        }
    }, [selectedRowKeys]);

    return (
        <div>
            <EnterRecord
                open={enterRecordOpen}
                onClose={resFlag => {
                    setEnterRecordOpen(false);
                    resFlag && getInviteList();
                }}
            />
            <Detail
                detailId={detailId}
                onClose={() => {
                    setDetailId();
                }}
            />
            <InvitationSplit
                invitationSplitId={invitationSplitId}
                onClose={resFlag => {
                    setInvitationSplitId();
                    resFlag && getInviteList();
                }}
            />
            <Space className="search">
                <div>
                    <span>邀约发布时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
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
                    value={code}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
                    }}
                />
                <SearchInput
                    label="邀约状态"
                    value={confirmStatus}
                    type="select"
                    options={[
                        { code: "未拆分", name: "未拆分" },
                        { code: "已拆分", name: "已拆分" },
                        { code: "已执行", name: "已执行" },
                        { code: "执行成功", name: "执行成功" },
                        { code: "执行失败", name: "执行失败" },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        confirmStatusRef.current = value;
                        setConfirmStatus(value);
                    }}
                />
                {/* <SearchInput
                    label="邀约拆分状态"
                    type="select"
                    value={splitStatus}
                    options={splitStatusList}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        splitStatusRef.current = value;
                        setSplitStatus(value);
                    }}
                /> */}
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
                <SearchInput
                    label="响应功率(kW)"
                    value={responsePower}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responsePowerRef.current = value;
                        setResponsePower(value);
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
                        {hasPerm(user, "op:invite_add") && (
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setEnterRecordOpen(true)}
                            >
                                手工录入
                            </Button>
                        )}
                        {hasPerm(user, "op:invite_confirm") && (
                            <Tooltip
                                placement="bottom"
                                title="只有邀约状态为【未确认】的数据可以确认"
                            >
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
                        )}
                        {hasPerm(user, "op:invite_delete") && (
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
                        )}
                        {hasPerm(user, "op:invite_invalid") && (
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
                        )}
                    </Space>
                )}
            ></Table>
        </div>
    );
};

export default Account;
