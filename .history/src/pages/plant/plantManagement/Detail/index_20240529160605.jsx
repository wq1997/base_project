import React, { useState, useEffect } from "react";
import { Modal, Table, Space, Descriptions } from "antd";
import { getPlantInfoById as getPlantInfoByIdServer } from "@/services/plant";
import "./index.less";

const items = [
    {
        label: "电站名称",
    },
    {
        label: "所属公司",
    },
    {
        label: "所属公司",
    },
    {
        label: "电站组串总容量(kWp)",
    },
    {
        label: "电站地址",
    },{
        label: "联系人",
    },{
        label: "联系方式",
    },{
        label: "并网时间",
    },{
        label: "电站logo",
    },
    {
        label: "电站图片",
    },
];

const Company = ({ detailId, onClose }) => {
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
