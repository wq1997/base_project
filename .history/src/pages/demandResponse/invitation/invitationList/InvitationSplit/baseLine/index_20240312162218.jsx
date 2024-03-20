import React, { useState, useEffect } from "react";
import {Tabs , Modal, Select, Space, InputNumber } from "antd";
import "./index.less";

const BaseLine = ({ baseLineArgs, onClose }) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(baseLineArgs ? true : false);
    }, [baseLineArgs]);

    const items = [
        {
          key: '1',
          label: 'Tab 1',
          children: 'Content of Tab Pane 1',
        },
        {
          key: '2',
          label: 'Tab 2',
          children: 'Content of Tab Pane 2',
        },
        {
          key: '3',
          label: 'Tab 3',
          children: 'Content of Tab Pane 3',
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
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
        </Modal>
    );
};

export default BaseLine;
