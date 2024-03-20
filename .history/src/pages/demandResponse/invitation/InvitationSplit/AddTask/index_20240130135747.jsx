import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Select, Table, Space, DatePicker } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
    intellectSplitInvite as intellectSplitInviteServer,
    getSplitInviteInitData as getSplitInviteInitDataServer,
} from "@/services/invitation";
import dayjs from "dayjs";
import "./index.less";

let dateValue = undefined;

const Company = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [modal, contextHolder] = Modal.useModal();
    const [companies, setCompanies] = useState();
    const [inviteInfo, setInviteInfo] = useState();
    const [taskList, setTaskList] = useState([]);
    const [deadline, setDeadline] = useState();

    const getSplitInviteInitData = async () => {
        const res = await getSplitInviteInitDataServer(invitationSplitId);
        if (res?.data?.status == "SUCCESS") {
            const { invite, companies } = res?.data?.data;
            setInviteInfo(invite);
            setCompanies(
                companies?.map(item => ({
                    ...item.company,
                    ...item,
                }))
            );
        }
    };

    const columns = [
        {
            title: "公司名称",
            dataIndex: "companyCode",
            render: (_, record) => (
                <Select
                    placeholder="请选择所属公司"
                    fieldNames={{
                        label: "name",
                        value: "code",
                    }}
                    options={companies}
                />
            ),
        },
        {
            title: "签约响应功率(kW)",
            dataIndex: "SignResponsePower",
            render: (_, record) =>
                companies?.find(item => item.code == record.companyCode)
                    ?.projectedMaxAdjustableLoad,
        },
        {
            title: "分配任务功率(kW)",
            dataIndex: "responsePower",
            render: (_, record) => <Input onChange={e => (record.responsePower = e.target)} />,
        },
        {
            title: "确认截止时间",
            dataIndex: "confirmationDeadline",
            render: () => <span>{dateValue}</span>,
        },
        {
            title: "任务备注",
            dataIndex: "remark",
            render: (_, record) => <Input onChange={e => (record.remark = e.target)} />,
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, record) => {
                return (
                    <Space>
                        <a type="primary" onClick={() => handleDelete(record.id)}>
                            删除
                        </a>
                        <a type="primary" onClick={() => setEnterRecordOpen(true)}>
                            查看
                        </a>
                        <a type="primary" onClick={() => setEnterRecordOpen(true)}>
                            基线
                        </a>
                    </Space>
                );
            },
        },
    ];

    useEffect(() => {
        invitationSplitId && getSplitInviteInitData();
    }, [invitationSplitId]);

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

    const handleAddTask = () => {};

    const handleDelete = id => {};

    const sureDeadline = () => {
        modal.confirm({
            title: `请选择截止时间`,
            icon: <ExclamationCircleOutlined />,
            content: (
                <DatePicker
                    showTime={{
                        format: "HH:mm:ss",
                    }}
                    format="YYYY-MM-DD HH:mm:ss"
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
            onCancel: async () => {
                setDeadline(dateValue);
            },
        });
    };

    return (
        <Modal
            title="邀约拆分"
            width={900}
            confirmLoading={true}
            open={Boolean(invitationSplitId)}
            footer={null}
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
                    <span>度电报价：</span>
                    <span>{inviteInfo?.whPrice}</span>
                </div>
                <div className="item">
                    <span>响应功率：</span>
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
                <Button type="primary" icon={<PlusOutlined />} onClick={() => handleAddTask()}>
                    手工添加
                </Button>
                <Button type="primary" onClick={() => handleUseAI()}>
                    AI智能拆解
                </Button>
                <Button type="primary" onClick={() => sureDeadline()}>
                    确认截止时间
                </Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={taskList}
                columns={columns}
                title={() => <Space className="table-title"></Space>}
            ></Table>
            {contextHolder}
        </Modal>
    );
};

export default Company;
