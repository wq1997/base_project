import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Select, Table, Space, DatePicker } from "antd";
import { PlusOutlined, ExclamationCircleOutlined, AndroidOutlined } from "@ant-design/icons";
import { getInviteDetail as getInviteDetailServer } from "@/services/invitation";
import AddTask from "./AddTask";
import "./index.less";

const Company = ({ invitationSplitId, detailId, onClose }) => {
    const [modal, contextHolder] = Modal.useModal();
    const [addTaskOpen, setAddTaskOpen] = useState();
    const [editTask, setEditTask] = useState();
    const [inviteInfo, setInviteInfo] = useState();
    const [taskList, setTaskList] = useState([]);
    const [deadline, setDeadline] = useState();
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

    return (
        <>
            
        </>
    );
};

export default Company;
