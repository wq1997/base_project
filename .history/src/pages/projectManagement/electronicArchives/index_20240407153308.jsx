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
            id: 1,
            number: 1,
            name: "宁储**100MW/200MWh共享储能电站",
            code: "CR20220412",
            time: "2022-04-12",
            stage: "售后阶段",
            schedule: "质保期",
            standard: "是",
            projectType: "源网侧",
            productType: "集装箱",
            implementationManager: "张**",
            operationsManager: "李**",
            area: "宁夏",
            owner:'有限公司',
            adress:'宁夏回族自治区吴忠市**',
            plantName:'第一储能电站',
            plantUser:'**',
            plantPhone:'**',
            unit:'中国电建集团**研究院有限公司',
            range:'储能电池舱，PCS一体机',
            start:'2022年**-2025年**',
            group:'2条汇集线，每条15组储能单元',
            detailAdress:'宁夏回族自治州吴忠市**',
            batteryCount:'30台',
            singleBattery:'6670KWh',
            PCSCount:'30台',
            cellMaterial:'磷酸铁锂',
            heapMethod:'9簇',
            singlePCS:'3450KW',
            clusterMethod:'8个',
            singleCell:'280AH',
            firefightingMedium:'全氟己酮',
            effect:'85%',
            multiplier:'0.5C',
            plantInfo:'无',
            BMSManufacturer:'杭州**股份有限公司',
            BMSManufacturerPhone:'**',
            PCSManufacturer:'**电气股份有限公司',
            PCSManufacturerPhone:'**',
            transformerManufacturer:'广东**股份有限公司',
            transformerManufacturerPhone:'**',
            liquidCoolingManufacturer:'深圳市**股份有限公司',
            liquidCoolingManufacturerPhone:'**',
            airManufacturer:'深圳市**股份有限公司',
            airManufacturerPhone:'**',
            PACKManufacturer:'苏州**科技股份有限公司',
            PACKManufacturerPhone:'**',
            cellManufacturer:'**能源股份有限公司 ',
            cellManufacturerPhone:'**',
            batteryManufacturer:'上海**有限公司',
            batteryManufacturerPhone:'**',
            fireManufacturerPhone:'',
            fireManufacturerPhone:'**',
        },
        {
            id: 2,
            number: 2,
            name: "上海**有限公司7.5MW/22.5MWh用户储能项目",
            code: "CR20230223",
            time: "2023-02-23",
            stage: "售后阶段",
            schedule: "质保期",
            standard: "是",
            projectType: "工商业",
            productType: "集装箱",
            implementationManager: "张**",
            operationsManager: "郑**",
            area: "上海",
        },
        {
            id: 3,
            number: 3,
            name: "浙江**能源科技有限公司100KW/215KWh储能项目",
            code: "CR20230605",
            time: "2023-06-05",
            stage: "售后阶段",
            schedule: "质保期",
            standard: "否",
            projectType: "工商业",
            productType: "户外柜",
            implementationManager: "孙**",
            operationsManager: "王**",
            area: "浙江",
        },
    ]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addProjectOpen, setAddProjectOpen] = useState(false);
    const [invitationSplitId, setInvitationSplitId] = useState();
    const [detailId, setDetailId] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [detailRow, setDetailRow] = useState(0);

    const columns = [
        {
            title: "项目名称",
            dataIndex: "name",
        },
        {
            title: "项目编号",
            dataIndex: "code",
        },
        {
            title: "立项时间",
            dataIndex: "time",
        },
        {
            title: "项目阶段",
            dataIndex: "stage",
        },
        {
            title: "项目进度",
            dataIndex: "schedule",
        },
        {
            title: "是否支持标准巡检",
            dataIndex: "standard",
            render: (_, { standard }) => {
                return (
                    <span style={{ color: standard == "是" ? "#1BE72B" : "#F50101" }}>
                        {standard}
                    </span>
                );
            },
        },
        {
            title: "项目类型",
            dataIndex: "projectType",
        },
        {
            title: "产品类型",
            dataIndex: "productType",
        },
        {
            title: "实施负责人",
            dataIndex: "implementationManager",
        },
        {
            title: "运维负责人",
            dataIndex: "operationsManager",
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, row) => {
                const edit = key => {
                    setCurrentStep(key);
                    setAddProjectOpen(true);
                    setDetailRow(row);
                };
                return (
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: "1",
                                    label: <div onClick={() => edit(0)}>基础信息维护</div>,
                                    icon: <FileSearchOutlined />,
                                },
                                {
                                    key: "2",
                                    label: <div onClick={() => edit(1)}>详细信息维护</div>,
                                    icon: <FileProtectOutlined />,
                                },
                                {
                                    key: "3",
                                    label: <div onClick={() => edit(2)}>实施管理</div>,
                                    icon: <UnorderedListOutlined />,
                                },
                                {
                                    key: "4",
                                    label: <div onClick={() => edit(3)}>巡检管理</div>,
                                    icon: <UserOutlined />,
                                },
                                {
                                    key: "5",
                                    label: (
                                        <div
                                            onClick={() => {
                                                Modal.confirm({
                                                    title: "系统提示",
                                                    content:
                                                        "删除此条记录不可恢复，请确认后再删除！",
                                                    onOk() {
                                                        message.success("删除成功！");
                                                    },
                                                });
                                            }}
                                        >
                                            删除项目
                                        </div>
                                    ),
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
                detailRow={detailRow}
                onClose={resFlag => {
                    setAddProjectOpen(false);
                    setDetailRow(null);
                }}
                editCurrentStep={currentStep}
            />
            <Space className="search">
                <div>
                    <span style={{ color: "#FFF" }}>立项时间：</span>
                    <DatePicker />
                </div>
                <SearchInput
                    label="项目名称"
                    value={code}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
                    }}
                />
                <SearchInput
                    label="项目阶段"
                    value={confirmStatus}
                    type="select"
                    options={[
                        { name: "待实施阶段", code: 1 },
                        { name: "实施阶段", code: 2 },
                        { name: "售后阶段", code: 3 },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        confirmStatusRef.current = value;
                        setConfirmStatus(value);
                    }}
                />
                <SearchInput
                    label="项目进度"
                    type="select"
                    value={splitStatus}
                    options={[
                        { name: "计划期", code: 1 },
                        { name: "试运行", code: 2 },
                        { name: "质保期", code: 3 },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        splitStatusRef.current = value;
                        setSplitStatus(value);
                    }}
                />

                <SearchInput
                    label="项目类型"
                    type="select"
                    options={[
                        { name: "工商业", code: 1 },
                        { name: "源网侧", code: 2 },
                    ]}
                    value={responseType}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTypeRef.current = value;
                        setResponseType(value);
                    }}
                />
                <SearchInput
                    label="产品类型"
                    type="select"
                    options={[
                        { name: "集装箱", code: 1 },
                        { name: "户外柜", code: 2 },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTimeTypeRef.current = value;
                        setResponseTimeType(value);
                    }}
                />
                <SearchInput
                    label="实施负责人"
                    type="select"
                    options={[{ name: "**", code: 1 }]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTimeTypeRef.current = value;
                        setResponseTimeType(value);
                    }}
                />
                <SearchInput
                    label="运维负责人"
                    type="select"
                    options={[{ name: "**", code: 1 }]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTimeTypeRef.current = value;
                        setResponseTimeType(value);
                    }}
                />
                <div>
                    <span style={{ color: "#FFF" }}>是否支持标准巡检：</span>
                    <Radio.Group>
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                    </Radio.Group>
                </div>

                <Button type="primary">搜索</Button>
                <Button>重置</Button>
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
                        <Button type="primary" onClick={() => setAddProjectOpen(true)}>
                            新增项目
                        </Button>
                        <Button type="primary" danger>
                            删除项目
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
