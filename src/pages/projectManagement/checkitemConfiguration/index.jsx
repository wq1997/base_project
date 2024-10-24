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
import { ExclamationCircleOutlined, PlusCircleFilled } from "@ant-design/icons";
import { history, useLocation } from "umi";
import { SearchInput } from "@/components";
import AddProject from "./AddProject";
import Detail from "./Detail";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";
import {
    getBasInspectionItem as getBasInspectionItemServe,
    basInspectionItemDelete as basInspectionItemDeleteServe,
} from "@/services";

let invalidReason = undefined;

const Account = () => {
    const [name, setName] = useState();
    const nameRef = useRef();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [editData, setEditData] = useState({});
    const [userList, setUserList] = useState([
        // {
        //     id: 1,
        //     name: "储能电池及电池管理系统（BMS）",
        //     desc: [
        //         "储能电池及电池管理系统（BMS）",
        //         "电池模组，电池架结构，铭牌，螺钉.连接线等；（目测）",
        //         "汇流柜铭牌，内部通信供电接线，开关等（目测）",
        //         "BMS高压箱外观，显控屏外观显示等（目测）",
        //         "BMS历史告警数据，运行数据等（拍照）",
        //         "汇流柜汇流排连接处；（拍照）",
        //     ],
        //     needPic: "是",
        //     needDesc: "否",
        // },
        // {
        //     id: 2,
        //     name: "储能变流器（PCS）",
        //     desc: [
        //         "直流侧电缆连接处；（拍照）",
        //         "运行或热备用时状态检查；（拍照）",
        //         "散热风机；（拍照）",
        //         "显示屏，显示灯，历史告警数据；（拍照）",
        //         "整体外观（拍照）",
        //     ],
        //     needPic: "是",
        //     needDesc: "否",
        // },
        // {
        //     id: 3,
        //     name: "电池室或电池仓",
        //     desc: [
        //         "防爆灯（目测）",
        //         "配电箱（目测）",
        //         "电池仓整体外观，贴纸，标识，外罩；（拍照）",
        //         "集装箱所有门；（目测）",
        //     ],
        //     needPic: "是",
        //     needDesc: "否",
        // },
        // {
        //     id: 4,
        //     name: "液冷系统",
        //     desc: [
        //         "三级液冷管道（目测）",
        //         "液冷机界面（拍照）",
        //         "备液箱（拍照）",
        //         "液冷机仓内外外观（目测）",
        //     ],
        //     needPic: "是",
        //     needDesc: "是",
        // },
        // {
        //     id: 5,
        //     name: "EMS系统",
        //     desc: ["通信连接（拍照）", "信息显示（拍照）", "历史告警记录（拍照）"],
        //     needPic: "是",
        //     needDesc: "否",
        // },
        // {
        //     id: 6,
        //     name: "消防系统",
        //     desc: [
        //         "消防罐外观，压力，备用电；（拍照）",
        //         "消防主机（拍照）",
        //         "集装箱外侧消防组件（目测）",
        //     ],
        //     needPic: "是",
        //     needDesc: "是",
        // },
        // {
        //     id: 7,
        //     name: "空调系统",
        //     desc: ["外观（目测）", "运行状态（拍照）", "历史告警信息（拍照）"],
        //     needPic: "是",
        //     needDesc: "否",
        // },
    ]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addProjectOpen, setAddProjectOpen] = useState(false);
    const [detailRow, setDetailRow] = useState(false);

    const columns = [
        {
            title: "巡检项名称",
            dataIndex: "name",
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
            title: "巡检项类型",
            dataIndex: "typeZh",
            width: 350,
            render(value) {
                return (
                    <Tooltip title={value}>
                        <div
                            style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                width: 250,
                            }}
                        >
                            {value}
                        </div>
                    </Tooltip>
                );
            },
        },
        {
            title: "巡检项内容",
            dataIndex: "description",
            width: 800,
            render: (_, { description }) => {
                return description;
            },
        },
        {
            title: "是否需要上传拍照信息",
            dataIndex: "needPhotoUpload",
            width: 200,
            render: (_, { needPhotoUpload }) => {
                return (
                    <span style={{ color: needPhotoUpload ? "#1BE72B" : "#F50101" }}>
                        {needPhotoUpload ? "是" : "否"}
                    </span>
                );
            },
        },
        {
            title: "是否需要上传备注",
            width: 200,
            dataIndex: "needDesc",
            render: (_, { needRemark }) => {
                return (
                    <span style={{ color: needRemark ? "#1BE72B" : "#F50101" }}>
                        {needRemark ? "是" : "否"}
                    </span>
                );
            },
        },
        {
            title: "操作",
            dataIndex: "operate",
            fixed: "right",
            width: 100,
            render: (_, row) => {
                return (
                    <Space>
                        <Button
                            type="link"
                            danger
                            onClick={() => {
                                setEditData(row);
                                setAddProjectOpen(true);
                            }}
                        >
                            编辑
                        </Button>
                    </Space>
                );
            },
        },
    ];

    const onSelectChange = newSelectedRowKeys => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getInviteList = async () => {
        const { current, pageSize } = paginationRef.current;
        const name = nameRef.current;
        const res = await getBasInspectionItemServe({
            pageNum: current,
            pageSize,
            queryCmd: {
                nameLike: name,
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

    useEffect(() => {
        getInviteList();
    }, []);

    return (
        <div className="electronic-archives">
            <AddProject
                editData={editData}
                open={addProjectOpen}
                onClose={resFlag => {
                    setEditData(null);
                    setAddProjectOpen(false);
                    getInviteList();
                }}
            />
            <Detail
                detailRow={detailRow}
                onClose={resFlag => {
                    setEditData({});
                    setDetailRow(null);
                }}
            />
            <Space className="search">
                <SearchInput
                    label="巡检项名称"
                    value={name}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <Button type="primary" onClick={getInviteList}>
                    搜索
                </Button>
                <Button
                    type="primary"
                    danger
                    onClick={() => {
                        nameRef.current = "";
                        paginationRef.current = pagination;
                        getInviteList();
                        setName("");
                    }}
                >
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
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getInviteList();
                }}
                scroll={{
                    x: 1500,
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
                        <Button
                            type="primary"
                            danger
                            onClick={async () => {
                                if (selectedRowKeys?.length > 0) {
                                    Modal.confirm({
                                        title: "系统提示",
                                        content: "删除此条记录不可恢复，请确认后再删除！",
                                        onOk: async () => {
                                            const res = await basInspectionItemDeleteServe({
                                                ids: selectedRowKeys,
                                            });
                                            if (res?.data?.status == "SUCCESS") {
                                                const { current } = paginationRef?.current;
                                                if (
                                                    current != 1 &&
                                                    userList?.length == selectedRowKeys?.length
                                                ) {
                                                    paginationRef.current.current = current - 1;
                                                    setPagination({
                                                        current: current - 1,
                                                    });
                                                }
                                                getInviteList();
                                                setSelectedRowKeys([]);
                                                message.success("删除成功");
                                            }
                                        },
                                    });
                                } else {
                                    message.error("请选择需要删除的巡检项配置");
                                }
                            }}
                        >
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
