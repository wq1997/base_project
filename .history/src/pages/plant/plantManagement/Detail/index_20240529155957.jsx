import React, { useState, useEffect } from "react";
import { Modal, Table, Space, Tooltip } from "antd";
import { getPlantInfoById as getPlantInfoByIdServer } from "@/services/invitation";
import { Title } from "@/components";
import "./index.less";

const Company = ({ detailId, onClose }) => {
    const [inviteInfo, setInviteInfo] = useState();
    const [taskList, setTaskList] = useState([]);
    const [deadline, setDeadline] = useState();

    const getDetail = async () => {
        const res = await getPlantInfoByIdServer(detailId);
        if (res?.data?.code == 200) {
            const invite = res?.data?.data;
            setInviteInfo(invite);
            setDeadline(invite?.fullTasks?.[0]?.confirmationDeadline);
            setTaskList(invite?.fullTasks);
        }
    };

    useEffect(() => {
        detailId && getDetail();
    }, [detailId]);

    return (
        <Modal
            title={<Title>邀约详情</Title>}
            width={1000}
            open={Boolean(detailId)}
            onOk={() => onClose()}
            onCancel={() => onClose()}
        >
            <div style={{ padding: "20px" }}>
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
            </div>
        </Modal>
    );
};

export default Company;
