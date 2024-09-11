import React, { useState, useEffect } from "react";
import { Modal, Table } from "antd";
import dayjs from "dayjs";
import "./index.less";

const BaseLine = ({ taskDetailData, onClose }) => {
    const [open, setOpen] = useState(false);

    const dataSource = [
        {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address: "西湖区湖底公园1号",
        },
        {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address: "西湖区湖底公园1号",
        },
    ];

    const columns = [
        {
            title: "响应时段",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "响应基线（KW)",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "住址",
            dataIndex: "address",
            key: "address",
        },
    ];

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
        >
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Modal>
    );
};

export default BaseLine;
