import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import {
    getTaskist as getTaskistServer,
    getSearchInitData as getSearchInitDataServer,
} from "@/services/task";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { history, useLocation, useSelector } from "umi";
import { hasPerm } from "@/utils/utils";
import dayjs from "dayjs";
import "./index.less";

const Account = () => {
    const location = useLocation();
    const { user } = useSelector(state => state.user);
    const releaseTimeRef = useRef();
    const [releaseTime, setReleaseTime] = useState();
    const invitationIdRef = useRef();
    const [invitationId, setInvitationId] = useState();
    const taskCodeRef = useRef();
    const [taskCode, setTaskCode] = useState();
    const stationNameRef = useRef();
    const [stationName, setStationName] = useState();
    const [stationNameList, setStationNameList] = useState();
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
                                    未满足“{item?._2}”
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
            render: (_, { id, status, supportConfirm }) => {
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
                if (status == "EXECUTED_FAIL" || status == "EXECUTED_SUCCESS") {
                    return (
                        <a
                            onClick={() => {
                                history.push(`/vpp/demandResponse/task/search?taskId=${id}`);
                            }}
                        >
                            查询执行情况
                        </a>
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
        const [confirmationDeadlineFrom, confirmationDeadlineTo] = endTimeRef.current || [];
        const [appointedTimeRangeStart, appointedTimeRangeEnd] = executeTimeRef.current || [];
        const code = taskCode || codeRef.current;
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
                        responseTypeRef.current = value;
                        setResponseType(value);
                    }}
                />
                <SearchInput
                    label="场站名称"
                    type="select"
                    options={stationNameList}
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
                <Button type="primary" onClick={handleSearch}>
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
