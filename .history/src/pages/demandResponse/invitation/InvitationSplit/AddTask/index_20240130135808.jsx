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

    
    useEffect(() => {
        invitationSplitId && getSplitInviteInitData();
    }, [invitationSplitId]);

     

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
