import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import EnterRecord from "./EnterRecord";
import InvitationSplit from "./InvitationSplit";
import Detail from "./Detail";
import {
    getTaskist as getTaskistServer,
    getSearchInitData as getSearchInitDataServer,
} from "@/services/task";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { history, useLocation } from "umi";
import "./index.less";

const Account = () => {
    const endTimeRef = useRef();
    const executeTimeRef = useRef();
    const codeRef = useRef();
    const statusRef = useRef();

    const responseTypeRef = useRef();
    const responseTimeTypeRef = useRef();
    const [code, setCode] = useState();
    const [releaseTime, setEndTime] = useState();
    const [executeTime, setExecuteTime] = useState();
    const [status, setStatus] = useState();
    const [statusList, setStatusList] = useState();
    const [responseType, setResponseType] = useState();
    const [responseTypeList, setResponseTypeList] = useState();
    const [responseTimeType, setResponseTimeType] = useState();
    const [responseTimeTypeList, setResponseTimeTypeList] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([]);
    const [enterRecordOpen, setEnterRecordOpen] = useState(false);
    const [invitationSplitId, setInvitationSplitId] = useState();
    const [detailId, setDetailId] = useState(false);

    const columns = [
        {
            title: "任务编号",
            dataIndex: "code",
            width: 150,
        },
        {
            title: "状态",
            dataIndex: "statusZh",
            key: "statusZh",
            width: 150,
        },
        {
            title: "确认截止时间",
            dataIndex: "confirmationDeadline",
            width: 200,
        },
        {
            title: "响应类型",
            dataIndex: "responseTypeZh",
            width: 150,
        },
        {
            title: "响应要求",
            dataIndex: "responseTimeTypeZh",
            width: 150,
        },
        {
            title: "度电报价(元)",
            dataIndex: "whPrice",
            width: 150,
        },
        {
            title: "约定响应功率(kW)",
            dataIndex: "responsePower",
            width: 150,
        },
        {
            title: "实际执行功率(kW)",
            dataIndex: "actualAveragePower",
            width: 150,
        },
        {
            title: "实际完成比例",
            dataIndex: "actualCompletionRatio",
            render: (_, { actualCompletionRatio }) => actualCompletionRatio + "%",
            width: 150,
        },
        {
            title: "约定开始时间",
            dataIndex: "appointedTimeFrom",
            width: 150,
        },
        {
            title: "约定结束时间",
            dataIndex: "appointedTimeTo",
            width: 150,
        },
        {
            title: "任务响应公司",
            dataIndex: "companyName",
            key: "companyName",
            ellipsis: true,
            width: 400,
            render(value) {
                return (
                    <Tooltip title={value}>
                        <div
                            style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                width: 400,
                            }}
                        >
                            {value}
                        </div>
                    </Tooltip>
                );
            },
        },
        {
            title: "任务备注",
            dataIndex: "remark",
            key: "remark",
            ellipsis: true,
            width: 400,
            render(value) {
                return (
                    <Tooltip title={value}>
                        <div
                            style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                width: 400,
                            }}
                        >
                            {value}
                        </div>
                    </Tooltip>
                );
            },
        },
        {
            title: "失败原因",
            dataIndex: "executeResult",
            width: 400,
            render(value) {
                if (!value?.success) {
                    return value?.resultDetail
                        ?.filter(item => !item?._1)
                        ?.map((item, index) => {
                            return (
                                <div>
                                    {index + 1}. {item?._2}
                                </div>
                            );
                        });
                }
            },
        },
        {
            title: "操作",
            dataIndex: "operate",
            fixed: "right",
            width: 200,
            render: (_, { id, supportConfirm }) => {
                return supportConfirm ? (
                    <a
                        onClick={() => {
                            history.push(`/vpp/demandResponse/task/confirm`);
                        }}
                    >
                        前往确认
                    </a>
                ) : (
                    <a onClick={() => setDetailId(id)}>查询执行情况</a>
                );
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
        const { current, pageSize } = paginationRef.current;
        const [confirmationDeadlineFrom, confirmationDeadlineTo] = endTimeRef.current || [];
        const [appointedTimeRangeStart, appointedTimeRangeEnd] = executeTimeRef.current || [];
        const code = codeRef.current;
        const status = statusRef.current;
        const responseType = responseTypeRef.current;
        const responseTimeType = responseTimeTypeRef?.current;
        const res = await getTaskistServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                confirmationDeadlineFrom,
                confirmationDeadlineTo,
                appointedTimeRangeStart,
                appointedTimeRangeEnd,
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
        confirmStatusRef.current = undefined;
        setConfirmStatus();
        responseTypeRef.current = undefined;
        setResponseType();
        responseTimeTypeRef.current = undefined;
        setResponseTimeType();
        getInviteList();
    };

    const handleOperate = typeId => {
        Modal.confirm({
            title: `确定${type}？`,
            content: tip,
            onOk: async () => {
                const res = await fn();
                if (res?.data?.status == "SUCCESS") {
                    message.success(`${type}成功`);
                    setPagination({
                        current: 1,
                    });
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
                    <span>确认截止时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            endTimeRef.current = dateStr;
                            setEndTime(dateStr);
                        }}
                    />
                </div>
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
                    label="任务状态"
                    value={status}
                    type="select"
                    options={statusList}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        statusRef.current = value;
                        setStatus(value);
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
