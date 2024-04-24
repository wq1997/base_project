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
    Dropdown,
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
import AddProject from "./AddProject";
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
    const [userList, setUserList] = useState([
        {
            time: 1,
            status: "xxxx",
            name: "12332",
            type: "2014-01-23",
            screen: "待实施阶段",
            schedule: "计划期",
            start: "是",
            projectType: "工商业",
            productType: "集装箱",
            implementationManager: "张三",
            operationsManager: "李四",
        },
 
    ]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addProjectOpen, setAddProjectOpen] = useState(false);
    const [invitationSplitId, setInvitationSplitId] = useState();
    const [detailId, setDetailId] = useState(false);

    const columns = [
        {
            title: "任务发布时间",
            dataIndex: "time",
        },
        {
            title: "处理状态",
            dataIndex: "status",
        },
        {
            title: "工单名称",
            dataIndex: "name",
        },
        {
            title: "工单类型",
            dataIndex: "type",
        },
        {
            title: "工单场景",
            dataIndex: "screen",
        },
        {
            title: "计划开始时间",
            dataIndex: "start",
        },
        {
            title: "计划结束时间",
            dataIndex: "end",
        },
        {
            title: "管理项目名称",
            dataIndex: "projectName",
        },
        {
            title: "任务接收人",
            dataIndex: "accept",
        },
        {
            title: "任务发起人",
            dataIndex: "launch",
        },
        {
            title: "当前处理人",
            dataIndex: "handle",
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, { id, supportSplit, supportReSplit }) => {
                return (
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: "1",
                                    label: <div>基础信息维护</div>,
                                    icon: <FileSearchOutlined />,
                                },
                                {
                                    key: "2",
                                    label: <div>详细信息维护</div>,
                                    icon: <FileProtectOutlined />,
                                },
                                {
                                    key: "3",
                                    label: <div>实施管理</div>,
                                    icon: <UnorderedListOutlined />,
                                },
                                {
                                    key: "4",
                                    label: <div>巡检管理</div>,
                                    icon: <UserOutlined />,
                                },
                                {
                                    key: "5",
                                    label: <div>删除项目</div>,
                                    icon: <DeleteOutlined />,
                                },
                            ],
                        }}
                    >
                        <a onClick={e => e.preventDefault()}>
                            <EllipsisOutlined style={{ color: "#FFF" }} />
                        </a>
                    </Dropdown>
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
        // getInviteList();
        // getSearchInitData();
    }, []);
    2;

    return (
        <div className="electronic-archives">
            <AddProject
                open={addProjectOpen}
                onClose={resFlag => {
                    setAddProjectOpen(false);
                }}
            />
            <Space className="search">
                <div>
                    <span style={{ color: "#FFF" }}>任务发布时间：</span>
                    <DatePicker />
                </div>
                <SearchInput
                    label="处理进度"
                    value={confirmStatus}
                    type="select"
                    options={[
                        { name: "全部", code: 1 },
                        { name: "已完成", code: 2 },
                        { name: "进行中", code: 3 },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        confirmStatusRef.current = value;
                        setConfirmStatus(value);
                    }}
                />
                <SearchInput
                    label="工单名称"
                    value={code}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
                    }}
                />
                <SearchInput
                    label="工单类型"
                    type="select"
                    value={splitStatus}
                    options={[
                        { name: "系统工单", code: 1 },
                        { name: "实施工单", code: 2 },
                        { name: "手工工单", code: 3 },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        splitStatusRef.current = value;
                        setSplitStatus(value);
                    }}
                />
                <SearchInput
                    label="工单场景"
                    type="select"
                    options={[
                        { name: "巡检工单", code: 1 },
                        { name: "维修工单", code: 1 },
                    ]}
                    value={responseType}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTypeRef.current = value;
                        setResponseType(value);
                    }}
                />
                <div>
                    <span style={{ color: "#FFF" }}>计划开始时间：</span>
                    <DatePicker />
                </div>{" "}
                <div>
                    <span style={{ color: "#FFF" }}>计划结束时间：</span>
                    <DatePicker />
                </div>
                <SearchInput
                    label="管理项目名称"
                    value={code}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
                    }}
                />
                <SearchInput
                    label="任务接收人"
                    type="select"
                    options={[
                        { name: "张三", code: 1 },
                        { name: "李四", code: 1 },
                    ]}
                    value={responseTimeType}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTimeTypeRef.current = value;
                        setResponseTimeType(value);
                    }}
                />
                <SearchInput
                    label="任务发起人"
                    type="select"
                    options={[{ name: "张三", code: 1 }]}
                    value={responseTimeType}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTimeTypeRef.current = value;
                        setResponseTimeType(value);
                    }}
                />
                <SearchInput
                    label="当前处理人"
                    type="select"
                    options={[{ name: "张三", code: 1 }]}
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
                            icon={<PlusCircleFilled style={{ fontSize: 13 }} />}
                            onClick={() => setAddProjectOpen(true)}
                        >
                            手工新增工单
                        </Button>
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
                                删除项目
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
