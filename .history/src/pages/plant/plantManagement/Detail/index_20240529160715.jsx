import React, { useState, useEffect } from "react";
import { Modal, Table, Space, Descriptions } from "antd";
import { getPlantInfoById as getPlantInfoByIdServer } from "@/services/plant";
import "./index.less";

const items = [
    {
        label: "电站名称",
        key:'name',
    },
    {
        label: "所属公司",
        key:'company',
    },
    {
        label: "所属公司",
        key:'',
    },
    {
        label: "电站组串总容量(kWp)",
        key:'',
    },
    {
        label: "电站地址",
        key:'',
    },
    {
        label: "联系人",
        key:'',
    },
    {
        label: "联系方式",
        key:'',
    },
    {
        label: "并网时间",
        key:'',
    },
    {
        label: "电站logo",
        key:'',
    },
    {
        label: "电站图片",
        key:'',
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
