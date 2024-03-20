import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Select, Space, InputNumber } from "antd";
import "./index.less";

const Company = ({ open, inviteId, editTask, remainCount, disabledCompanyCodes, onClose }) => {
    const [form] = Form.useForm();
  

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
