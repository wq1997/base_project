import React, { useState, useEffect } from "react";
import { message, Button, Tooltip, Input, Modal, Select, Table, Space, DatePicker } from "antd";
import { PlusOutlined, ExclamationCircleOutlined, AndroidOutlined } from "@ant-design/icons";
import {
    intellectSplitInvite as intellectSplitInviteServer,
    getSplitInviteInitData as getSplitInviteInitDataServer,
    saveSplitInvite as saveSplitInviteServer,
} from "@/services/invitation";
import { Title } from "@/components";
import AddTask from "./AddTask";
import BaseLine from "./BaseLine";
import dayjs from "dayjs";
import "./index.less";

let dateValue = undefined;
let oldDeadline = undefined;
let oldTaskList = [];

const Company = ({ invitationSplitId, onClose }) => {
    const baseColumns = [
        {
            title: "场站名称",
            dataIndex: "companyName",
            key: "companyName",
            width: 300,
            render(value) {
                return (
                    <Tooltip title={value}>
                        <div
                            style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                width: 300,
                            }}
                        >
                            {value}
                        </div>
                    </Tooltip>
                );
            },
        },
        {
            title: "最大上升功率(kW)",
            dataIndex: "increaseRate",
            width: 200,
        },
        {
            title: "设备容量(kWh)",
            dataIndex: "deviceMaximumCapacity",
            width: 200,
        },
        {
            title: "操作",
            dataIndex: "operate",
            fixed: "right",
            width: 150,
            render: (_, record, index) => {
                return (
                    <Space>
                        <a
                            type="primary"
                            onClick={() => {
                                setAddTaskOpen(true);
                                setEditTask({
                                    ...record,
                                    index,
                                });
                            }}
                        >
                            编辑
                        </a>
                        <a type="primary" onClick={() => handleDelete(index)}>
                            删除
                        </a>
                        <a
                            type="primary"
                            onClick={() =>
                                setBaseLineArgs({
                                    id: invitationSplitId,
                                    companyCode: taskList[index]?.companyCode,
                                    responsePeriod: [
                                        dayjs(inviteInfo?.appointedTimeFrom).format("HH:mm"),
                                        dayjs(inviteInfo?.appointedTimeTo).format("HH:mm"),
                                    ],
                                })
                            }
                        >
                            基线
                        </a>
                    </Space>
                );
            },
        },
    ];

    const [modal, contextHolder] = Modal.useModal();
    const [whPrice, setWhPrice] = useState();
    const [addTaskOpen, setAddTaskOpen] = useState();
    const [isReSplit, setIsReSplit] = useState(false);
    const [editTask, setEditTask] = useState();
    const [inviteInfo, setInviteInfo] = useState();
    const [taskList, setTaskList] = useState([]);
    const [deadline, setDeadline] = useState();
    const [hasSplitCount, setHasSplitCount] = useState(0);
    const [remainCount, setRemainCount] = useState(0);
    const [baseLineArgs, setBaseLineArgs] = useState(0);
    const [columns, setColumns] = useState(baseColumns);

    const getSplitInviteInitData = async () => {
        const res = await getSplitInviteInitDataServer(invitationSplitId);
        if (res?.data?.status == "SUCCESS") {
            const data = res?.data?.data;
            setInviteInfo(data);
            setTaskList(
                data?.resources4split?.map(item => ({
                    ...item,
                    ...item?.baseLineFullInfo.map(uu => ({
                        [uu.time]: uu.baseLinePower,
                    })),
                }))
            );
            console.log(data?.resources4split?.map(item => ({
                ...item,
                ...item?.baseLineFullInfo.map(uu => ({
                    [uu.time]: uu.baseLinePower,
                })),
            })))
            const timeSolt = data?.resources4split[0]?.baseLineFullInfo?.map(item => ({
                title: item.time,
                dataIndex: item.time,
                width: 200,
            }));
            const _columns = [...baseColumns];
            _columns.splice(3, 0, ...timeSolt);
            setColumns(_columns);
        }
    };

    useEffect(() => {
        invitationSplitId && getSplitInviteInitData();
    }, [invitationSplitId]);

    useEffect(() => {
        const powers = eval(taskList?.map(item => item.responsePower)?.join("+"))?.toFixed(2) || 0;
        setHasSplitCount(powers);
        setRemainCount(+(+inviteInfo?.responsePower - powers)?.toFixed(2));
    }, [taskList, inviteInfo]);

    const handleUseAI = () => {
        modal.confirm({
            title: "AI智能拆解",
            icon: <ExclamationCircleOutlined />,
            content:
                "是否采用AI智能方案？（若采用AI方案，会根据公司用电及履约情况自动匹配任务。启用AI方案会将已手工录入任务删除）",
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
                const res = await intellectSplitInviteServer(invitationSplitId);
                if (res?.data?.status == "SUCCESS") {
                    message.success(`拆解成功`);
                    setTaskList(
                        res?.data?.data?.suggestItems?.map(item => ({
                            ...item,
                            statusZh: "待确认",
                        }))
                    );
                }
            },
        });
    };

    const AddTaskColse = data => {
        if (data) {
            const index = data?.index;
            if (index == undefined) {
                setTaskList([...taskList, data]);
            } else {
                const _taskList = [...taskList];
                _taskList[index] = data;
                setTaskList([..._taskList]);
            }
        }
        setAddTaskOpen(false);
        setEditTask();
    };

    const handleDelete = index => {
        const _taskList = [...taskList];
        _taskList.splice(index, 1);
        setTaskList(_taskList);
    };

    const getDisabledCompanyCodes = () => {
        let codes = taskList?.map(item => item.companyCode);
        if (editTask) {
            codes = codes?.filter(item => item != editTask?.companyCode);
        }
        return codes;
    };

    const isEqual = () => {
        let flag = false;
        if (oldDeadline != deadline || oldTaskList?.length != taskList?.length) return flag;
        for (let oldItem of oldTaskList) {
            const newItem = taskList?.find(newItem => newItem.companyCode == oldItem.companyCode);
            if (!newItem) {
                return flag;
            } else {
                if (oldItem?.responsePower != newItem?.responsePower) return flag;
            }
        }
        return true;
    };

    const save = async () => {
        const res = await saveSplitInviteServer({
            inviteId: invitationSplitId,
            confirmationDeadline: deadline,
            splitItems: taskList,
        });
        if (res?.data?.status == "SUCCESS") {
            message.success(`拆解成功`);
            onClose(true);
        }
    };

    const handleOk = async () => {
        if (!deadline) return message.info(`请选择截止时间`);
        if (!taskList?.length) return message.info(`请拆解任务`);
        if (isReSplit && !isEqual()) {
            await modal.confirm({
                title: "系统提示",
                icon: <ExclamationCircleOutlined />,
                content:
                    "当前任务已修改，点击确认，将在【重新拆分】提交后，作废已派发任务，并进行重新派发。",
                okText: "确认",
                cancelText: "取消",
                onOk: () => {
                    save();
                },
            });
        } else {
            save();
        }
    };

    return (
        <>
            <AddTask
                open={addTaskOpen}
                inviteId={invitationSplitId}
                editTask={editTask}
                remainCount={remainCount}
                disabledCompanyCodes={getDisabledCompanyCodes()}
                onClose={AddTaskColse}
            />
            <BaseLine baseLineArgs={baseLineArgs} onClose={() => setBaseLineArgs(null)} />
            <Modal
                title={<Title>{isReSplit ? "重新拆分" : "邀约拆分"}</Title>}
                width={1000}
                open={Boolean(invitationSplitId)}
                onOk={handleOk}
                onCancel={() => onClose(false)}
            >
                <div style={{ padding: "10px 0" }}>
                    <div className="title">邀约信息</div>
                    <div className="info">
                        <div className="item">
                            <span>响应类型：</span>
                            <span>{inviteInfo?.responseTypeZh}</span>
                        </div>
                        <div className="item">
                            <span>度电报价(元)：</span>
                            <span>
                                <Input
                                    value={whPrice}
                                    style={{ width: 200 }}
                                    placeholder="请输入度电报价"
                                    onChange={e => setWhPrice(e.target.value)}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="title">任务拆解</div>
                    <Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setAddTaskOpen(true)}
                        >
                            手工添加
                        </Button>
                        <Button
                            type="primary"
                            icon={<AndroidOutlined />}
                            onClick={() => handleUseAI()}
                        >
                            AI智能拆解
                        </Button>
                        <div>
                            已拆分任务：{hasSplitCount}KW 剩余任务：
                            {remainCount}KW 任务派发比例：
                            {((hasSplitCount / +inviteInfo?.responsePower) * 100)?.toFixed(2)}%
                        </div>
                    </Space>
                    <Table
                        rowKey="id"
                        dataSource={taskList}
                        columns={columns}
                        title={() => <Space className="table-title"></Space>}
                        pagination={false}
                        scroll={{
                            x: 800,
                        }}
                    ></Table>
                    {contextHolder}
                </div>
            </Modal>
        </>
    );
};

export default Company;
