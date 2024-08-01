import React, { useState, useEffect } from "react";
import { Modal, Table } from "antd";

const BaseLine = ({ taskDetailData, onClose }) => {
    const [open, setOpen] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    const columns = [
        {
            title: "响应时段",
            dataIndex: "timeRange",
        },
        {
            title: "基线功率(kW)",
            dataIndex: "basePower",
        },
        {
            title: "执行功率(kW)",
            dataIndex: "targetPower",
        },
        {
            title: "申报报价(kWh/元)",
            dataIndex: "priceKWh",
        },
        {
            title: "申报量(kW)",
            dataIndex: "regulatedPower",
        },
        {
            title: "实际报价(kWh/元)",
            dataIndex: "realPriceKWh",
        },
        {
            title: "实际下发量(kW)",
            dataIndex: "realRegulatedPower",
        },
    ];

    useEffect(() => {
        if (taskDetailData) {
            setOpen(true);
            setDataSource(
                taskDetailData?.resourcePlan?.details?.map((item, index) => ({
                    ...item,
                    priceKWh: taskDetailData?.resourcePlan?.priceKWh,
                    realPriceKWh: taskDetailData?.dayaheadResourcePlan?.priceKWh,
                    realRegulatedPower:
                        taskDetailData?.dayaheadResourcePlan?.details[index]?.regulatedPower,
                }))
            );
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
