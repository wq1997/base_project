import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Select, Space, InputNumber } from "antd";
import "./index.less";

const BaseLine = ({ baseLineArgs, onClose }) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(baseLineArgs ? true : false);
    }, [baseLineArgs]);

    return (
        <Modal
            title="基线"
            width={700}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        ></Modal>
    );
};

export default BaseLine;
