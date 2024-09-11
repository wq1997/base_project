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
    theme,
    Tabs,
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
import Detail from "./Detail";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import {
    workOrderList as workOrderListServer,
    workOrderListInitData as workOrderListInitDataServer,
    deleteWorkOrder as deleteWorkOrderServer,
} from "@/services/workOrder";
import "./index.less";
import dayjs from "dayjs";

let invalidReason = undefined;

const Account = () => {
    const { token } = theme.useToken();
    const location = useLocation();
    const initCode = location?.search.split("=")[1];
    const [canDelete, setCanDelete] = useState(true);

    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addProjectOpen, setAddProjectOpen] = useState(false);
    const [detailId, setDetailId] = useState();
    const [processId, setProcessId] = useState();

    const publishedTimeRef = useRef();
    const [publishedTime, setPublishedTime] = useState();

    const dealStatusRef = useRef();
    const [dealStatus, setDealStatus] = useState();
    const [dealStatusOptions, setDealStatusOptions] = useState();

    const workOrderNameRef = useRef();
    const [workOrderName, setWorkOrderName] = useState();

    const workOrderTypeRef = useRef();
    const [workOrderType, setWorkOrderType] = useState([]);
    const [workOrderTypeOptions, setWorkOrderTypeOptions] = useState();

    const planStartDateRef = useRef();
    const [planStartDate, setPlanStartDate] = useState();

    const planEndDateRef = useRef();
    const [planEndDate, setPlanEndDate] = useState();

    const associatedProjectRef = useRef();
    const [associatedProject, setAssociatedProject] = useState();
    const [projectOptions, setProjectOptions] = useState();

    const [userOptions, setUserOptions] = useState();

    const ownerRef = useRef();
    const [owner, setOwner] = useState();

    const initiatorRef = useRef();
    const [initiator, setInitiator] = useState();

    const currentProcessorRef = useRef();
    const [currentProcessor, setCurrentProcessor] = useState();

    const columns = [
        {
            title: "工单编号",
            dataIndex: "code",
        },
        {
            title: "处理状态",
            dataIndex: "statusZh",
            render: (_, { status, statusZh }) => {
                return (
                    <span style={{ color: status == "COMPLETED" ? "#1BE72B" : "" }}>
                        {statusZh}
                    </span>
                );
            },
        },
        {
            title: "工单发布时间",
            dataIndex: "publishedTime",
        },
        {
            title: "工单类型",
            dataIndex: "typeZh",
        },
        {
            title: "计划开始时间",
            dataIndex: "planStartDate",
        },
        {
            title: "计划结束时间",
            dataIndex: "planEndDate",
        },
        {
            title: "关联项目名称",
            dataIndex: "project",
            render: (_, { project }) => {
                return project?.name;
            },
        },
        {
            title: "工单接收人",
            dataIndex: "ownerName",
        },
        {
            title: "工单发起人",
            dataIndex: "initiatorName",
        },
        {
            title: "当前处理人",
            dataIndex: "currentProcessorName",
            render: (_, { status, currentProcessorName }) => {
                return status == "COMPLETED" ? "" : currentProcessorName;
            },
        },
        {
            title: "实际处理人",
            dataIndex: "currentProcessorName",
            render: (_, { status, currentProcessorName }) => {
                return status == "COMPLETED" ? currentProcessorName : "";
            },
        },
        {
            title: "操作",
            dataIndex: "operate",
            fixed: "right",
            render: (_, { id, supportProcessing }) => {
                return (
                    <>
                        <Button
                            type="link"
                            disabled={Boolean(!supportProcessing)}
                            onClick={() => setProcessId(id)}
                        >
                            去处理
                        </Button>
                        <Button
                            type="link"
                            style={{ color: token.colorPrimary }}
                            onClick={() => setDetailId(id)}
                        >
                            详情
                        </Button>
                    </>
                );
            },
        },
    ];

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        const hasNoDelete = Boolean(newSelectedRows?.some(item => item.supportRemove == false));
        setCanDelete(!hasNoDelete);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getInitData = async () => {
        const res = await workOrderListInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { statuses, types, projects, users } = res?.data?.data;
            setDealStatusOptions(statuses);
            setWorkOrderTypeOptions(types);
            setProjectOptions(
                projects?.map(item => ({
                    ...item,
                    code: item.id,
                }))
            );
            setUserOptions(users);
        }
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const [publishedTimeFrom, publishedTimeTo] = publishedTimeRef.current || [];
        const statusIn = dealStatusRef.current ? [dealStatusRef.current] : null;
        const title = workOrderNameRef.current;
        const type = workOrderTypeRef.current || [];
        const planDateFrom = planStartDateRef.current;
        const planDateTo = planEndDateRef.current;
        const projectId = associatedProjectRef.current;
        const ownerAccount = ownerRef.current;
        const initiatorAccount = initiatorRef.current;
        const currentProcessorAccount = currentProcessorRef.current;
        const res = await workOrderListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                publishedTimeFrom,
                publishedTimeTo,
                statusIn,
                title,
                typeIn: type,
                planDateFrom,
                planDateTo,
                projectId,
                ownerAccount,
                initiatorAccount,
                currentProcessorAccount,
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
        publishedTimeRef.current = [];
        setPublishedTime([]);
        dealStatusRef.current = undefined;
        setDealStatus();
        workOrderNameRef.current = undefined;
        setWorkOrderName();
        workOrderTypeRef.current = undefined;
        setWorkOrderType([]);
        planStartDateRef.current = undefined;
        setPlanStartDate();
        planEndDateRef.current = undefined;
        setPlanEndDate();
        associatedProjectRef.current = undefined;
        setAssociatedProject();
        ownerRef.current = undefined;
        setOwner();
        initiatorRef.current = undefined;
        setInitiator();
        currentProcessorRef.current = undefined;
        setCurrentProcessor();
        getList();
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
                    getList();
                    invalidReason = undefined;
                }
            },
            onCancel: () => {
                invalidReason = undefined;
            },
        });
    };

    const handleDelete = () => {
        if (selectedRowKeys?.length == 0) {
            return message.info(`请先勾选需要删除的数据`);
        }
        Modal.confirm({
            title: `确定删除？`,
            content: "删除后不可恢复",
            onOk: async () => {
                const res = await deleteWorkOrderServer(selectedRowKeys);
                if (res?.data?.status == "SUCCESS") {
                    message.success(`删除成功`);
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
        getList();
        getInitData();
    }, []);
    2;

    return (
        <div className="electronic-archives">
            <AddProject
                open={addProjectOpen}
                onClose={() => {
                    setAddProjectOpen(false);
                    getList();
                }}
            />
            <Detail
                detailId={detailId}
                processId={processId}
                onClose={() => {
                    setDetailId(null);
                    setProcessId(null);
                    getList();
                }}
            />
            <Space className="search">
                <div>
                    <span style={{ color: "#FFF" }}>工单发布时间：</span>
                    <DatePicker.RangePicker
                        value={
                            publishedTime &&
                            publishedTime.length > 0 &&
                            publishedTime[0] &&
                            publishedTime[1]
                                ? [dayjs(publishedTime[0]), dayjs(publishedTime[1])]
                                : []
                        }
                        onChange={(date, dateStr) => {
                            publishedTimeRef.current = dateStr;
                            setPublishedTime(dateStr);
                        }}
                    />
                </div>
                <SearchInput
                    label="处理状态"
                    value={dealStatus}
                    type="select"
                    options={dealStatusOptions}
                    onChange={value => {
                        dealStatusRef.current = value;
                        setDealStatus(value);
                    }}
                />
                <SearchInput
                    label="工单名称"
                    value={workOrderName}
                    onChange={value => {
                        workOrderNameRef.current = value;
                        setWorkOrderName(value);
                    }}
                />
                <SearchInput
                    mode="multiple"
                    label="工单类型"
                    value={workOrderType}
                    type="select"
                    options={workOrderTypeOptions}
                    onChange={value => {
                        workOrderTypeRef.current = value;
                        setWorkOrderType(value);
                    }}
                    style={{ width: 200 }}
                />
                <div>
                    <span style={{ color: "#FFF" }}>计划开始时间：</span>
                    <DatePicker
                        onChange={(date, dateStr) => {
                            planStartDateRef.current = dateStr;
                            setPlanStartDate(dateStr);
                        }}
                        value={planStartDate ? dayjs(planStartDate) : null}
                    />
                </div>
                <div>
                    <span style={{ color: "#FFF" }}>计划结束时间：</span>
                    <DatePicker
                        onChange={(date, dateStr) => {
                            planEndDateRef.current = dateStr;
                            setPlanEndDate(dateStr);
                        }}
                        value={planEndDate ? dayjs(planEndDate) : null}
                    />
                </div>
                <SearchInput
                    label="关联项目"
                    value={associatedProject}
                    type="select"
                    options={projectOptions}
                    onChange={value => {
                        associatedProjectRef.current = value;
                        setAssociatedProject(value);
                    }}
                />
                <SearchInput
                    label="工单接收人"
                    value={owner}
                    type="select"
                    options={userOptions}
                    onChange={value => {
                        ownerRef.current = value;
                        setOwner(value);
                    }}
                />
                <SearchInput
                    label="工单发起人"
                    value={initiator}
                    type="select"
                    options={userOptions}
                    onChange={value => {
                        initiatorRef.current = value;
                        setInitiator(value);
                    }}
                />
                <SearchInput
                    label="当前处理人"
                    value={currentProcessor}
                    type="select"
                    options={userOptions}
                    onChange={value => {
                        currentProcessorRef.current = value;
                        setCurrentProcessor(value);
                    }}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        getList();
                    }}
                >
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
                scroll={{
                    x: 1500,
                }}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
                }}
                title={() => (
                    <Space className="table-title">
                        <Button type="primary" onClick={() => setAddProjectOpen(true)}>
                            手工新增工单
                        </Button>

                        <Button type="primary" danger disabled={!canDelete} onClick={handleDelete}>
                            删除工单
                            {selectedRowKeys?.length ? (
                                <span>({selectedRowKeys?.length})</span>
                            ) : (
                                ""
                            )}
                        </Button>
                    </Space>
                )}
            ></Table>
        </div>
    );
};

export default Account;
