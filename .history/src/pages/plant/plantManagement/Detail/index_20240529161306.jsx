import React, { useState, useEffect } from "react";
import { Modal, Table, Space, Descriptions } from "antd";
import { getPlantInfoById as getPlantInfoByIdServer } from "@/services/plant";
import "./index.less";

const baseItems = [
    {
        label: "电站名称",
        key: "name",
    },
    {
        label: "所属公司",
        key: "company",
    },
    {
        label: "电站类型",
        key: "plantType",
    },
    {
        label: "电站组串总容量(kWp)",
        key: "totalCapacity",
    },
    {
        label: "电站地址",
        key: "address",
    },
    {
        label: "联系人",
        key: "contact",
    },
    {
        label: "联系方式",
        key: "contactWay",
    },
    {
        label: "并网时间",
        key: "gridTime",
    },
    {
        label: "经度",
        key: "longitude",
    },
    {
        label: "纬度",
        key: "latitude",
    },
    {
        label: "电站logo",
        key: "logo",
    },
    {
        label: "电站图片",
        key: "photo	",
    },
];

const Company = ({ detailId, onClose }) => {
    const [items, setList] = useState();
    const [detail, setDetail] = useState();

    const getDetail = async () => {
        const res = await getPlantInfoByIdServer(detailId);
        if (res?.data?.code == 200) {
            setDetail(res?.data?.data);
        }
    };

    useEffect(() => {
        detailId && getDetail();
    }, [detailId]);

    return (
        <Modal
            title=""
            width={1000}
            open={Boolean(detailId)}
            onOk={() => onClose()}
            onCancel={() => onClose()}
        >
            <Descriptions title="电站详情" items={items} />;
        </Modal>
    );
};

export default Company;
