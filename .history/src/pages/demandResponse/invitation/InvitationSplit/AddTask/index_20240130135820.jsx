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
             
        </Modal>
    );
};

export default Company;
