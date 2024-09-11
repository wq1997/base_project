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
    ];

    useEffect(() => {
        if (taskDetailData) {
            setOpen(true);
            const { resourcePlan, responsePlan } = taskDetailData;
            setDataSource(
                resourcePlan?.details?.map((item, index) => ({
                    ...item,
                    priceKWh: resourcePlan?.priceKWh,
                    realRegulatedPower: responsePlan[index]?.regulatedPower,
                }))
            );
        } else {
            setOpen(false);
        }
    }, [taskDetailData]);

    return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

export default BaseLine;
