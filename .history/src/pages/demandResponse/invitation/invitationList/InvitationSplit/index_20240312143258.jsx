import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Select, Space, InputNumber } from "antd";
import { getSplitInviteInitData as getSplitInviteInitDataServer } from "@/services/invitation";
import "./index.less";

const Company = ({ open, inviteId, editTask, remainCount, disabledCompanyCodes, onClose }) => {
    const [form] = Form.useForm();
    const [companies, setCompanies] = useState();
    const [contractedResponsePower, setContractedResponsePower] = useState();
    const getSplitInviteInitData = async () => {
        const res = await getSplitInviteInitDataServer(inviteId);
        if (res?.data?.status == "SUCCESS") {
            const { companies } = res?.data?.data;
            setCompanies(
                companies?.map(item => ({
                    ...item.company,
                    ...item,
                    disabled: disabledCompanyCodes.includes(item.company.code),
                }))
            );
        }
    };

 
 

    return (
        <Modal
            title="手工录入"
            width={700}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
             
        </Modal>
    );
};

export default Company;
