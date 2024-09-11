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
            title: "执行功率(kW)",
            dataIndex: "targetPower",
        },
        {
            title: "基线功率(kW)",
            dataIndex: "basePower",
        },
        {
            title: "计划申报量(kW)",
            dataIndex: "regulatedPower",
        },
        {
            title: "实际下发量(kW)",
            dataIndex: "realRegulatedPower",
        },
        {
            title: "度电报价(kWh/元)",
            dataIndex: "priceKWh",
        },
        {
            title: "实际度电报价(kWh/元)",
            dataIndex: "realPriceKWh",
        },
    ];

    useEffect(() => {
        if (taskDetailData) {
            setOpen(true);
            setDataSource(
                taskDetailData?.resourcePlan?.details?.map((item, index) => ({
                    ...item,
                    priceKWh: taskDetailData?.resourcePlan?.priceKWh,
                    realPriceKWh: data?.dayaheadResourcePlan?.priceKWh,
                    realRegulatedPower:
                        taskDetailData?.dayaheadResourcePlan?.details[index]?.regulatedPower,
                    realRegulatedPower: taskDetailData?.dayaheadResourcePlan?.details[index]?.regulatedPower,
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
