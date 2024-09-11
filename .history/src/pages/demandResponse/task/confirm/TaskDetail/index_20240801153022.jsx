import React, { useState, useEffect } from "react";
import { Modal, Table } from "antd";

const BaseLine = ({ data }) => {
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
            title: "度电报价(kWh/元)",
            dataIndex: "priceKWh",
        },
    ];

    useEffect(() => {
        const { resourcePlan, responsePlan } = data;
        setDataSource(
            data?.resourcePlan?.details?.map((item, index) => ({
                ...item,
                priceKWh: resourcePlan?.priceKWh,
                realRegulatedPower: responsePlan[index]?.regulatedPower,
            }))
        );
    }, [data]);

    return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

export default BaseLine;
