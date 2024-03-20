import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Select, Table, Space, DatePicker } from "antd";
import { PlusOutlined, ExclamationCircleOutlined, AndroidOutlined } from "@ant-design/icons";
import {
    intellectSplitInvite as intellectSplitInviteServer,
    getSplitInviteInitData as getSplitInviteInitDataServer,
    saveSplitInvite as saveSplitInviteServer,
    getInviteDetail as getInviteDetailServer,
} from "@/services/invitation";
import AddTask from "./AddTask";
import "./index.less";

let dateValue = undefined;
let oldDeadline = undefined;
let oldTaskList = [];

const Company = ({ invitationSplitId, detailId, onClose }) => {
    const [modal, contextHolder] = Modal.useModal();
    const [addTaskOpen, setAddTaskOpen] = useState();
    const [isReSplit, setIsReSplit] = useState(false);
    const [editTask, setEditTask] = useState();
    const [inviteInfo, setInviteInfo] = useState();
    const [taskList, setTaskList] = useState([]);
    const [deadline, setDeadline] = useState();
    const [hasSplitCount, setHasSplitCount] = useState(0);
    const [remainCount, setRemainCount] = useState(0);

    const getDetail = async () => {
        const res = await getInviteDetailServer(invitationSplitId);
        if (res?.data?.status == "SUCCESS") {
            const invite = res?.data?.data;
            setInviteInfo(invite);
            setDeadline(invite?.fullTasks?.[0]?.confirmationDeadline);
            setTaskList(invite?.fullTasks);
        }
    };

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
            title: "任务确认状态",
            dataIndex: "statusZh",
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
    ];

    useEffect(() => {
        detailId && getDetail();
    }, [detailId]);

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
                title="邀约详情"
                width={1000}
                open={Boolean(invitationSplitId)}
                onOk={() => onClose()}
                onCancel={() => onClose()}
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
                <div className="title">任务列表</div>
                <Table
                    rowKey="companyCode"
                    dataSource={taskList}
                    columns={columns}
                    title={() => <Space className="table-title"></Space>}
                ></Table>
                {contextHolder}
            </Modal>
        </>
    );
};

export default Company;
