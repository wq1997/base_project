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
import Detail from "./Detail";
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
            name: "储能电池及电池管理系统（BMS）",
            desc: [
                "储能电池及电池管理系统（BMS）",
                "电池模组，电池架结构，铭牌，螺钉.连接线等；（目测）",
                "汇流柜铭牌，内部通信供电接线，开关等（目测）",
                "BMS高压箱外观，显控屏外观显示等（目测）",
                "BMS历史告警数据，运行数据等（拍照）",
                "汇流柜汇流排连接处；（拍照）",
            ],
        },
        {
            id: 2,
            name: "储能变流器（PCS）",
            desc: [
                "直流侧电缆连接处；（拍照）",
                "运行或热备用时状态检查；（拍照）",
                "散热风机；（拍照）",
                "显示屏，显示灯，历史告警数据；（拍照）",
                "整体外观（拍照）"
            ],
        },
        {
            id: 3,
            name: "电池室或电池仓",
            desc: [
                "防爆灯（目测）",
                "配电箱（目测）",
                "电池仓整体外观，贴纸，标识，外罩；（拍照）",
                "集装箱所有门；（目测）",
            ],
        },{
            id: 4,
            name: "液冷系统",
            desc: [
                "三级液冷管道（目测）",
                "液冷机界面（拍照）",
                "备液箱（拍照）",
                "液冷机仓内外外观（目测）",
            ],
        },{
            id: 5,
            name: "EMS系统",
            desc: [
                "通信连接（拍照）",
                "信息显示（拍照）",
                "历史告警记录（拍照）",
            ],
        },
    ]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addProjectOpen, setAddProjectOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [invitationSplitId, setInvitationSplitId] = useState();
    const [detailRow, setDetailRow] = useState(false);

    const columns = [
        {
            title: "巡检项名称",
            dataIndex: "name",
        },

        {
            title: "巡检项内容",
            dataIndex: "desc",
            render: (_, { desc }) => {
                return desc?.map((item, index) => (
                    <div>
                        {index + 1}. {item}
                    </div>
                ));
            },
        },
        // {
        //     title: "是否需要上传拍照信息",
        //     dataIndex: "needPic",
        //     render: (_, { needPic }) => {
        //         return (
        //             <span style={{ color: needPic == "是" ? "#1BE72B" : "#F50101" }}>
        //                 {needPic}
        //             </span>
        //         );
        //     },
        // },
        // {
        //     title: "是否需要上传备注",
        //     dataIndex: "needDesc",
        //     render: (_, { needDesc }) => {
        //         return (
        //             <span style={{ color: needDesc == "是" ? "#1BE72B" : "#F50101" }}>
        //                 {needDesc}
        //             </span>
        //         );
        //     },
        // },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, row) => {
                return (
                    <Space>
                        <Button type="link" danger>
                            编辑
                        </Button>
                        <Button type="link">删除</Button>
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
            <Detail
                detailRow={detailRow}
                onClose={resFlag => {
                    setDetailRow(null);
                }}
            />
            <Space className="search">
                <SearchInput
                    label="巡检项名称"
                    value={code}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
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
                            新增
                        </Button>
                        <Button type="primary" danger>
                            批量删除
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
