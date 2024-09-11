import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { history, useLocation, useSelector } from "umi";
import { SearchInput } from "@/components";
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
import { hasPerm, recordPage, getUrlParams } from "@/utils/utils";
import "./index.less";
import dayjs from "dayjs";

let invalidReason = undefined;

const Account = () => {
    recordPage("op:invite_list");
    const location = useLocation();
    const { search, pathname } = useLocation();
    const initCode = ;
    const { user } = useSelector(state => state.user);
    const [canDelete, setCanDelete] = useState(true);
    const releaseTimeRef = useRef();
    const executeTimeRef = useRef();
    const codeRef = useRef(initCode);
    const confirmStatusRef = useRef();
    const splitStatusRef = useRef();
    const responseTypeRef = useRef();
    const [code, setCode] = useState(initCode);
    const [releaseTime, setReleaseTime] = useState();
    const [executeTime, setExecuteTime] = useState();
    const [confirmStatus, setConfirmStatus] = useState();
    const [confirmStatusList, setConfirmStatusList] = useState();
    const [splitStatus, setSplitStatus] = useState();
    const [splitStatusList, setSplitStatusList] = useState();
    const [responseType, setResponseType] = useState();
    const [responseTypeList, setResponseTypeList] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [invitationSplitId, setInvitationSplitId] = useState();
    const [detailId, setDetailId] = useState();

    const columns = [
        {
            title: "邀约计划ID",
            dataIndex: "code",
            width: 200,
            render(_, recode) {
                return (
                    <a
                        onClick={_ =>
                            history.push(
                                `/vpp/demandResponse/invitation/allTaskList?inviteCode=${recode.invitationId}`
                            )
                        }
                    >
                        {recode.invitationId}
                    </a>
                );
            },
        },
        {
            title: "上游确认状态",
            dataIndex: "szConfirmStatusZh",
            width: 200,
        },
        {
            title: "邀约拆分状态",
            dataIndex: "splitStatusZh",
            width: 200,
        },
        {
            title: "邀约发布时间",
            dataIndex: "invitationTime",
            width: 300,
        },
        {
            title: "响应类型",
            dataIndex: "responseTypeZh",
            width: 200,
        },
        {
            title: "全网邀约电量(KWh)",
            dataIndex: "totalMrPower",
            width: 200,
        },
        {
            title: "度电报价(元)",
            dataIndex: "whPrice",
            width: 200,
            render(_, recode) {
                return (
                    <span>
                        {recode?.responsePlan?.averagePrice
                            ? recode?.responsePlan?.averagePrice / 1000
                            : ""}
                    </span>
                );
            },
        },
        {
            title: "计划申报量(KWh)",
            dataIndex: "responsePower",
            width: 200,
            render(_, recode) {
                return <span>{recode?.responsePlan?.totalRegulatedPower}</span>;
            },
        },
        {
            title: "实际下发量(KWh)",
            dataIndex: "responsePower",
            width: 200,
            render(_, recode) {
                return <span>{recode?.dayaheadPlan?.totalRegulatedPower}</span>;
            },
        },
        {
            title: "确认截止时间",
            dataIndex: "replyTime",
            width: 300,
        },
        {
            title: "约定开始时间",
            dataIndex: "startTime",
            width: 300,
        },
        {
            title: "约定结束时间",
            dataIndex: "endTime",
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
        {
            title: "操作",
            dataIndex: "operate",
            fixed: "right",
            width: 200,
            render: (_, { invitation: { invitationId, supportSplit, supportReSplit } }) => {
                return (
                    <Space>
                        {hasPerm(user, "op:invitation_split") && (
                            <a onClick={() => setInvitationSplitId(invitationId)}>
                                {supportSplit ? "邀约拆分" : supportReSplit ? "重新拆分" : ""}
                            </a>
                        )}
                        <a onClick={() => setDetailId(encodeURIComponent(invitationId))}>详情</a>
                    </Space>
                );
            },
        },
    ];

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        const hasNoDelete = Boolean(newSelectedRows?.some(item => item.supportDelete == false));
        setCanDelete(!hasNoDelete);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { szConfirmStatus, splitStatus, ExchangeTypes } = res?.data?.data;
            setConfirmStatusList(szConfirmStatus);
            setSplitStatusList(splitStatus);
            setResponseTypeList(ExchangeTypes);
        }
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const [createdTimeFrom, createdTimeTo] = releaseTimeRef.current || [];
        const [appointedTimeRangeStart, appointedTimeRangeEnd] = executeTimeRef.current || [];
        const code = codeRef.current;
        const confirmStatus = confirmStatusRef.current;
        const splitStatus = splitStatusRef.current;
        const responseType = responseTypeRef.current;
        const res = await getInviteListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                invitationTimeFrom: createdTimeFrom,
                invitationTimeTo: createdTimeTo,
                invitationId: code,
                szConfirmStatusIn: confirmStatus ? [confirmStatus] : null,
                splitStatusIn: splitStatus ? [splitStatus] : null,
                startTimeFrom: appointedTimeRangeStart,
                startTimeTo: appointedTimeRangeEnd,
                exchangeType: responseType,
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
                    ...item.invitation,
                }))
            );
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
        responseTypeRef.current = undefined;
        setResponseType();
        getList();
    };

    const handleSearch = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        getList();
    };

    const handleOperate = typeId => {
        const operates = {
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
        console.log( location?.search.split("=")[1]);
        getList();
        getSearchInitData();
    }, []);

    useEffect(() => {
        if (selectedRowKeys?.length === 0) {
            setCanDelete(true);
        }
    }, [selectedRowKeys]);

    return (
        <div>
            <Detail
                detailId={detailId}
                onClose={() => {
                    setDetailId();
                }}
            />
            <InvitationSplit
                invitationSplitId={invitationSplitId}
                onClose={() => {
                    setInvitationSplitId();
                    getList();
                }}
            />
            <Space className="search">
                <div>
                    <span>邀约发布时间：</span>
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
                    value={code}
                    onChange={value => {
                        codeRef.current = value;
                        setCode(value);
                    }}
                />
                <SearchInput
                    label="上游确认状态"
                    value={confirmStatus}
                    type="select"
                    options={confirmStatusList}
                    onChange={value => {
                        confirmStatusRef.current = value;
                        setConfirmStatus(value);
                    }}
                />
                <SearchInput
                    label="邀约拆分状态"
                    type="select"
                    value={splitStatus}
                    options={splitStatusList}
                    onChange={value => {
                        splitStatusRef.current = value;
                        setSplitStatus(value);
                    }}
                />
                <div>
                    <span>约定开始时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
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
                <Button type="primary" onClick={handleSearch}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                rowKey="invitationId"
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
                scroll={{
                    x: "100%",
                }}
                title={() => (
                    <Space className="table-title">
                        {hasPerm(user, "op:invitation_delete") && (
                            <Tooltip
                                placement="bottom"
                                title="只有拆分状态为【未拆分】的数据可以删除"
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
                    </Space>
                )}
            ></Table>
        </div>
    );
};

export default Account;
