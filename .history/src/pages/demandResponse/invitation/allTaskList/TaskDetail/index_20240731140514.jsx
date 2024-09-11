import React, { useState, useEffect } from "react";
import { Modal, Table } from "antd";
import dayjs from "dayjs";
import "./index.less";

const BaseLine = ({ taskDetailData, onClose }) => {
    const [open, setOpen] = useState(false);
    const [dataSource , setdataSource] = useState([])
    

    const columns = [
        {
            title: "响应时段",
            dataIndex: "timeRange",
        },
        {
            title: "响应基线(kW)",
            dataIndex: "basePower",
        },
        {
            title: "计划申报量(kW)",
            dataIndex: "planCapacityKWh",
        },
        {
            title: "实际下发量(kW)",
            dataIndex: "realCapacityKWh",
        },
        {
            title: "度电报价(kWh/元)",
            dataIndex: "priceKWh",
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
