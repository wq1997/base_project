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
import { history, useLocation, useSelector } from "umi";
import { SearchInput } from "@/components";
import AddProject from "./AddProject";
import Detail from "./Detail";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { getUrlParams, hasPerm } from "@/utils/utils";
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
    const params = getUrlParams(location?.search);
    const { user } = useSelector(state => state.user);
    const [canDelete, setCanDelete] = useState(true);
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addProjectOpen, setAddProjectOpen] = useState(false);
    const [detailId, setDetailId] = useState();
    const [processId, setProcessId] = useState();

    const workOrderCodeRef = useRef(params?.code);
    const [workOrderCode, setWorkOrderCode] = useState(params?.code);

    const publishedTimeRef = useRef();
    const [publishedTime, setPublishedTime] = useState();

    const dealStatusRef = useRef(params?.statusIn);
    const [dealStatus, setDealStatus] = useState(params?.statusIn);
    const [dealStatusOptions, setDealStatusOptions] = useState();

    const workOrderNameRef = useRef();
    const [workOrderName, setWorkOrderName] = useState();

    const workOrderTypeRef = useRef(
        params?.typeIn ? decodeURIComponent(params?.typeIn).split(",") : []
    );
    const [workOrderType, setWorkOrderType] = useState(
        params?.typeIn ? decodeURIComponent(params?.typeIn).split(",") : []
    );
    const [workOrderTypeOptions, setWorkOrderTypeOptions] = useState();

    const planStartDateRef = useRef();
    const [planStartDate, setPlanStartDate] = useState();

    const planEndDateRef = useRef();
    const [planEndDate, setPlanEndDate] = useState();

    const associatedProjectRef = useRef();
    const [associatedProject, setAssociatedProject] = useState();
    const [projectOptions, setProjectOptions] = useState();

    const [userOptions, setUserOptions] = useState();

    const areaRef = useRef();
    const [area, setArea] = useState();
    const [areaOptions, setAreaOptions] = useState();

    const ownerRef = useRef();
    const [owner, setOwner] = useState();

    const initiatorRef = useRef(params?.initiatorAccount);
    const [initiator, setInitiator] = useState(params?.initiatorAccount);

    const currentProcessorRef = useRef();
    const [currentProcessor, setCurrentProcessor] = useState();

    const columns = [
        {
            title: "工单编号",
            dataIndex: "code",
            width: 200,
        },
        {
            title: "工单名称",
            dataIndex: "title",
            width: 300,
        },
        {
            title: "处理状态",
            dataIndex: "statusZh",
            width: 100,
            render: (_, { status, statusZh }) => {
                return (
                    <span style={{ color: status == "COMPLETED" ? "#1BE72B" : "" }}>
                        {statusZh}
                    </span>
                );
            },
        },
        {
            title: "发布时间",
            dataIndex: "publishedTime",
            width: 200,
        },
        {
            title: "关联项目",
            dataIndex: "project",
            width: 300,
            render: (_, { project }) => {
                return project?.name;
            },
        },
        {
            title: "工单类型",
            dataIndex: "typeZh",
            width: 180,
        },
        {
            title: "所属区域",
            dataIndex: "regionZh",
            width: 150,
        },
        {
            title: "计划开始时间",
            dataIndex: "planStartDate",
            width: 200,
        },
        {
            title: "计划结束时间",
            dataIndex: "planEndDate",
            width: 200,
        },
        {
            title: "工单发起人",
            dataIndex: "initiatorName",
            width: 150,
        },
        {
            title: "工单接收人",
            dataIndex: "ownerName",
            width: 150,
        },
        {
            title: "当前处理人",
            dataIndex: "currentProcessorName",
            width: 150,
            render: (_, { status, currentProcessorName }) => {
                return status == "COMPLETED" ? "" : currentProcessorName;
            },
        },
        {
            title: "实际处理人",
            dataIndex: "currentProcessorName",
            width: 150,
            render: (_, { status, currentProcessorName }) => {
                return status == "COMPLETED" ? currentProcessorName : "";
            },
        },
        {
            title: "操作",
            dataIndex: "operate",
            fixed: "right",
            width: 100,
            render: (_, { id }) => {
                return (
                    <>
                        <a style={{ color: token.colorPrimary }} onClick={() => setDetailId(id)}>
                            详情
                        </a>
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
            const { regions, statuses, types, projects, users } = res?.data?.data;
            setDealStatusOptions(statuses);
            setWorkOrderTypeOptions(types);
            setProjectOptions(
                projects?.map(item => ({
                    ...item,
                    code: item.id,
                }))
            );
            setUserOptions(users);
            setAreaOptions(regions);
        }
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const [publishedTimeFrom, publishedTimeTo] = publishedTimeRef.current || [];
        const statusIn = dealStatusRef.current ? [dealStatusRef.current] : null;
        const code = workOrderCodeRef.current;
        const title = workOrderNameRef.current;
        const type = workOrderTypeRef.current || [];
        const planDateFrom = planStartDateRef.current;
        const planDateTo = planEndDateRef.current;
        const projectId = associatedProjectRef.current;
        const ownerAccount = ownerRef.current;
        const region = areaRef.current;
        const initiatorAccount = initiatorRef.current;
        const currentProcessorAccount = currentProcessorRef.current;
        const res = await workOrderListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                code,
                publishedTimeFrom,
                publishedTimeTo,
                statusIn,
                title,
                typeIn: type,
                planDateFrom,
                planDateTo,
                projectId,
                ownerAccount,
                region,
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
        history.push("/task-management/task-list");
        paginationRef.current = DEFAULT_PAGINATION;
        workOrderCodeRef.current = undefined;
        setWorkOrderCode();
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
        areaRef.current = undefined;
        setArea();
        initiatorRef.current = undefined;
        setInitiator();
        currentProcessorRef.current = undefined;
        setCurrentProcessor();
        getList();
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
                    const { current } = paginationRef?.current;
                    if (current != 1 && userList?.length == selectedRowKeys?.length) {
                        paginationRef.current.current = current - 1;
                        setPagination({
                            current: current - 1,
                        });
                    }
                    setSelectedRowKeys([]);
                    getList();
                    message.success(`删除成功`);
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
                    <span style={{ color: "#FFF" }}>发布时间：</span>
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
                    label="工单编号"
                    value={workOrderCode}
                    onChange={value => {
                        workOrderCodeRef.current = value;
                        setWorkOrderCode(value);
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
                    label="工单所属区域"
                    value={area}
                    type="select"
                    options={areaOptions}
                    onChange={value => {
                        areaRef.current = value;
                        setArea(value);
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
                <Button type="primary" danger onClick={handleReset}>
                    重置
                </Button>
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
                        {hasPerm(user, "op:work_order_add") && (
                            <Button type="primary" onClick={() => setAddProjectOpen(true)}>
                                手工新增工单
                            </Button>
                        )}
                        {hasPerm(user, "op:work_order_m_remove_edit") && (
                            <Button
                                type="primary"
                                danger
                                disabled={!canDelete}
                                onClick={handleDelete}
                            >
                                删除工单
                                {selectedRowKeys?.length ? (
                                    <span>({selectedRowKeys?.length})</span>
                                ) : (
                                    ""
                                )}
                            </Button>
                        )}
                    </Space>
                )}
            ></Table>
        </div>
    );
};

export default Account;
