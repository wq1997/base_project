import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Select, Table, Space, DatePicker } from "antd";
import { PlusOutlined, ExclamationCircleOutlined, AndroidOutlined } from "@ant-design/icons";
import {
    intellectSplitInvite as intellectSplitInviteServer,
    getSplitInviteInitData as getSplitInviteInitDataServer,
    saveSplitInvite as saveSplitInviteServer,
} from "@/services/invitation";
import AddTask from "./AddTask";
import "./index.less";

let dateValue = undefined;
let oldDeadline = undefined;
let oldTaskList = [];

const Company = ({ invitationSplitId, onClose }) => {
    const [modal, contextHolder] = Modal.useModal();
    const [addTaskOpen, setAddTaskOpen] = useState();
    const [isReSplit, setIsReSplit] = useState(false);
    const [editTask, setEditTask] = useState();
    const [inviteInfo, setInviteInfo] = useState();
    const [taskList, setTaskList] = useState([]);
    const [deadline, setDeadline] = useState();
    const [hasSplitCount, setHasSplitCount] = useState(0);
    const [remainCount, setRemainCount] = useState(0);

    const getSplitInviteInitData = async () => {
        const res = await getSplitInviteInitDataServer(invitationSplitId);
        if (res?.data?.status == "SUCCESS") {
            const { companies, invite } = res?.data?.data;
            const confirmationDeadline = invite?.tasks?.[0]?.confirmationDeadline;
            setIsReSplit(invite?.splitStatus == "SPLIT");
            setInviteInfo(invite);
            setDeadline(confirmationDeadline);
            oldDeadline = confirmationDeadline;
            oldTaskList = invite?.tasks;
            setTaskList(
                invite?.tasks?.map(item => ({
                    ...item,
                    projectedMaxAdjustableLoad: companies?.find(
                        uu => uu?.company?.code == item.companyCode
                    )?.projectedMaxAdjustableLoad,
                }))
            );
        }
    };

    const columns = [
        {
            title: "公司名称",
            dataIndex: "companyName",
        },
        {
            title: "签约响应功率(kW)",
            dataIndex: "projectedMaxAdjustableLoad",
        },
        {
            title: "分配任务功率(kW)",
            dataIndex: "responsePower",
        },
        {
            title: "确认截止时间",
            dataIndex: "confirmationDeadline",
            render: () => <span>{deadline}</span>,
        },
        {
            title: "任务备注",
            dataIndex: "remark",
        },
        {
            title: "操作",
            dataIndex: "operate",
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
                        <a type="primary">查看</a>
                        <a type="primary">基线</a>
                    </Space>
                );
            },
        },
    ];

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
                    setTaskList(res?.data?.data?.suggestItems);
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

    const sureDeadline = () => {
        modal.confirm({
            title: `请选择截止时间`,
            icon: <ExclamationCircleOutlined />,
            content: (
                <DatePicker
                    showTime={{
                        format: "HH:mm",
                    }}
                    format="YYYY-MM-DD HH:mm"
                    style={{ width: "100%" }}
                    onChange={(_, dateStr) => (dateValue = dateStr)}
                />
            ),
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
                if (!dateValue) {
                    message.info(`请选择截止时间`);
                    return Promise.reject();
                } else {
                    setDeadline(dateValue);
                }
            },
            onCancel: () => {
                setDeadline(deadline);
            },
        });
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
            const newItem = taskList.find(newItem => newItem.companyCode == oldItem.companyCode);
            if (!newItem) {
                return flag;
            } else {
                if (item?.responsePower != newItem?.responsePower) return flag;
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
                title: `请选择截止时间`,
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
            <Modal
                title={isReSplit ? "重新拆分" : "邀约拆分"}
                width={1000}
                open={Boolean(invitationSplitId)}
                onOk={handleOk}
                onCancel={() => onClose(false)}
            >
                <div className="title">邀约信息</div>
                <div className="info">
                    <div className="item">
                        <span>响应类型：</span>
                        <span>{inviteInfo?.responseTypeZh}</span>
                    </div>
                    <div className="item">
                        <span>响应要求：</span>
                        <span>{inviteInfo?.responseTimeTypeZh}</span>
                    </div>
                    <div className="item">
                        <span>度电报价(元)：</span>
                        <span>{inviteInfo?.whPrice}</span>
                    </div>
                    <div className="item">
                        <span>响应功率(kW)：</span>
                        <span>{inviteInfo?.responsePower}</span>
                    </div>
                    <div className="item">
                        <span>约定开始时间：</span>
                        <span>{inviteInfo?.appointedTimeFrom}</span>
                    </div>
                    <div className="item">
                        <span>约定结束时间：</span>
                        <span>{inviteInfo?.appointedTimeTo}</span>
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
                    <Button type="primary" icon={<AndroidOutlined />} onClick={() => handleUseAI()}>
                        AI智能拆解
                    </Button>
                    <Button type="primary" onClick={() => sureDeadline()}>
                        确认截止时间
                    </Button>
                    <div>
                        已拆分任务：{hasSplitCount}KW 剩余任务：
                        {remainCount}KW 任务派发比例：
                        {((hasSplitCount / +inviteInfo?.responsePower) * 100)?.toFixed(2)}%
                    </div>
                </Space>
                <Table
                    rowKey="companyCode"
                    dataSource={taskList}
                    columns={
                        isReSplit
                            ? (() => {
                                  columns.splice(1, 0, {
                                      title: "任务确认状态",
                                      dataIndex: "statusZh",
                                  });
                                  return columns;
                              })()
                            : columns
                    }
                    title={() => <Space className="table-title"></Space>}
                    pagination={false}
                ></Table>
                {contextHolder}
            </Modal>
        </>
    );
};

export default Company;
