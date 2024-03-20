import React, { useState, useEffect } from "react";
import { Tabs, Modal, Select, Space, InputNumber } from "antd";
import "./index.less";

const BaseLine = ({ baseLineArgs, onClose }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(baseLineArgs ? true : false);
    }, [baseLineArgs]);

    const items = [
        {
            key: "1",
            label: "汇总基线",
            children: "Content of Tab Pane 1",
        },
        {
            key: "2",
            label: "Tab 2",
            children: "Content of Tab Pane 2",
        },
    ];

    return (
        <Modal
            title="基线"
            width={700}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <Tabs defaultActiveKey="1" items={items}   />;
        </Modal>
    );
};

export default BaseLine;
