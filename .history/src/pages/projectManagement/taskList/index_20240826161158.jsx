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
} from "@/services/workOrder";
import "./index.less";
import dayjs from "dayjs";
import img1 from "./imgs/1.png";
import img2 from "./imgs/2.png";
import img3 from "./imgs/3.png";
import img4 from "./imgs/4.png";
import img5 from "./imgs/5.png";
import img6 from "./imgs/6.png";
import img7 from "./imgs/7.png";
import img8 from "./imgs/8.png";
import img9 from "./imgs/9.png";
import img10 from "./imgs/10.png";
import img11 from "./imgs/11.png";
import img12 from "./imgs/12.png";
import img13 from "./imgs/13.png";

let invalidReason = undefined;

const Account = () => {
    const { token } = theme.useToken();
    const location = useLocation();
    const initCode = location?.search.split("=")[1];
    const [canSure, setCanSure] = useState(true);
    const [canDelete, setCanDelete] = useState(true);
    const [canInvalid, setCanInvalid] = useState(true);

    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([
        {
            id: 1,
            time: "2024-02-01",
            status: "已完成",
            name: "基础实施工单",
            type: "实施工单",
            start: "2024-02-05",
            end: "2024-02-08",
            projectName: "浙江**能源科技有限公司100KW/215KWh储能项目",
            accept: "张**",
            launch: "李**",
            handle: "王**",
            groupName: "浙江**能源科技有限公司户外柜巡检",
            checkInfo: [
                { item: "户外柜巡检显示屏", img: img8 },
                { item: "户外柜检查电池模块", img: img10 },
                { item: "户外柜检查电池模组间动力线束", img: img11 },
                { item: "户外柜检查电池模组间通信线束", img: img12 },
                { item: "户外柜检查电池模组液冷管道接口", img: img13 },
            ],
        },
        {
            id: 2,
            time: "2024-02-11",
            status: "已完成",
            name: "基础巡检工单",
            type: "巡检工单",
            start: "2024-02-13",
            end: "2024-02-17",
            projectName: "宁储**100MW/200MWh共享储能电站",
            accept: "张**",
            launch: "许**",
            handle: "张**",
            groupName: "宁储源网侧集装箱项目巡检",
            checkInfo: [
                { item: "源网侧集装箱项目检查BMS运行数据", img: img1 },
                { item: "源网侧集装箱项目检查消防气体罐管道", img: img2 },
                { item: "源网侧集装箱项目检查消防主机模块", img: img3 },
                { item: "源网侧集装箱项目检查液冷机", img: img4 },
            ],
        },
        {
            id: 3,
            time: "2024-02-25",
            status: "已完成",
            name: "日常巡检工单",
            type: "巡检工单",
            start: "2024-03-11",
            end: "2024-03-18",
            projectName: "宁储**100MW/200MWh共享储能电站",
            accept: "刘**",
            launch: "田**",
            handle: "王**",
            groupName: "宁储源网侧集装箱项目巡检",
            checkInfo: [
                { item: "源网侧集装箱项目检查BMS运行数据", img: img1 },
                { item: "源网侧集装箱项目检查消防气体罐管道", img: img2 },
                { item: "源网侧集装箱项目检查消防主机模块", img: img3 },
                { item: "源网侧集装箱项目检查液冷机", img: img4 },
            ],
        },
        {
            id: 4,
            time: "2024-03-01",
            status: "已完成",
            name: "日常巡检工单",
            type: "巡检工单",
            start: "2024-03-18",
            end: "2024-03-22",
            projectName: "上海**有限公司7.5MW/22.5MWh用户储能项目",
            accept: "孙**",
            launch: "李**",
            handle: "李**",
            groupName: "上海**有限公司工商业集装箱项目巡检",
            checkInfo: [
                { item: "工商业集装箱项目储能电表巡检", img: img5 },
                { item: "工商业集装箱项目消防主机模块巡检", img: img6 },
                { item: "工商业集装箱项目液冷机巡检", img: img7 },
            ],
        },
    ]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addProjectOpen, setAddProjectOpen] = useState(false);
    const [detailRow, setDetailRow] = useState(false);

    const publishedTimeRef = useRef();
    const [publishedTime, setPublishedTime] = useState();

    const dealStatusRef = useRef();
    const [dealStatus, setDealStatus] = useState();
    const [dealStatusOptions, setDealStatusOptions] = useState();

    const workOrderNameRef = useRef();
    const [workOrderName, setWorkOrderName] = useState();

    const workOrderTypeRef = useRef();
    const [workOrderType, setWorkOrderType] = useState();
    const [workOrderTypeOptions, setWorkOrderTypeOptions] = useState();

    const planDateRef = useRef();
    const [planDate, setPlanDate] = useState();

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
            title: "工单发布时间",
            dataIndex: "publishedTime",
        },
        {
            title: "处理状态",
            dataIndex: "statusZh",
            // render: (_, { status }) => {
            //     return (
            //         <span style={{ color: status == "已完成" ? "#1BE72B" : "#F50101" }}>
            //             {status}
            //         </span>
            //     );
            // },
        },
        {
            title: "工单名称",
            dataIndex: "title",
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
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, row) => {
                return (
                    <Space>
                        <Button type="link">去处理</Button>
                        <Button
                            type="link"
                            style={{ color: token.colorPrimary }}
                            onClick={() => setDetailRow(row)}
                        >
                            查看详情
                        </Button>
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
        const type = workOrderTypeRef.current;
        const [planDateFrom, planDateTo] = planDateRef.current || [];
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
                type,
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
        setWorkOrderType();
        planDateRef.current = [];
        setPlanDate([]);
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
                onClose={resFlag => {
                    setAddProjectOpen(false);
                }}
            />
            <Detail
                detailRow={detailRow}
                onClose={resFlag => {
                    setDetailRow(null);
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
                    label="工单类型"
                    value={workOrderType}
                    type="select"
                    options={workOrderTypeOptions}
                    onChange={value => {
                        workOrderTypeRef.current = value;
                        setWorkOrderType(value);
                    }}
                />
                <div>
                    <span style={{ color: "#FFF" }}>计划开始/结束时间：</span>
                    onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            timeRef.current = dateStr;
                            setTime(dateStr);
                        }}
                        value={time ? dayjs(time) : null}
                </div>
                <div>
                    <span style={{ color: "#FFF" }}>计划开始/结束时间：</span>
                    <DatePicker.RangePicker
                         onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            timeRef.current = dateStr;
                            setTime(dateStr);
                        }}
                        value={time ? dayjs(time) : null}
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
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
                }}
                title={() => (
                    <Space className="table-title">
                        <Button type="primary" onClick={() => setAddProjectOpen(true)}>
                            手工新增工单
                        </Button>
                        <Button type="primary" danger>
                            删除工单
                        </Button>
                    </Space>
                )}
            ></Table>
        </div>
    );
};

export default Account;
