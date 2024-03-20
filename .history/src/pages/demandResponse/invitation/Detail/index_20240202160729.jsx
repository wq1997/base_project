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
