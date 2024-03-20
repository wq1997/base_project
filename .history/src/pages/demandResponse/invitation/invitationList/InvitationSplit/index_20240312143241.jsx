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

    const onFinish = async values => {
        const { name } = companies?.find(item => item.code == values?.companyCode);
        onClose({
            ...values,
            index: editTask?.index,
            companyName: name,
            contractedResponsePower,
            statusZh: "待确认",
        });
    };

    useEffect(() => {
        open && getSplitInviteInitData();
        if (editTask) {
            form?.setFieldsValue(editTask);
            setContractedResponsePower(editTask?.contractedResponsePower);
        } else {
            form.resetFields();
            setContractedResponsePower();
        }
    }, [open]);

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
