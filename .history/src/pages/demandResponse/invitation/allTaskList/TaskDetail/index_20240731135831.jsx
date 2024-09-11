import React, { useState, useEffect } from "react";
import {   Modal, Table } from "antd";
import dayjs from "dayjs";
import "./index.less";

const BaseLine = ({ taskDetailData, onClose }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("taskDetailData", taskDetailData);
        if (taskDetailData) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [taskDetailData]);

    return (
        <Modal
            title="任务要求"
            width={1000}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        ></Modal>
    );
};

export default BaseLine;
